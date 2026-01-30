"""
Repository - Database abstraction layer.

Supports multiple backends:
- In-memory (for testing/development)
- Firestore (Firebase)
- SQLite (planned)
- PostgreSQL (planned)
"""
from typing import Dict, Any, List, Optional
from abc import ABC, abstractmethod
import uuid

from .firebase import get_firestore


class Repository(ABC):
    """Abstract repository interface."""

    @abstractmethod
    async def get(self, entity_type: str, entity_id: str) -> Optional[Dict[str, Any]]:
        """Get a single entity by ID."""
        pass

    @abstractmethod
    async def list(
        self,
        entity_type: str,
        filter_expr: Any = None,
        context: Dict[str, Any] = None,
    ) -> List[Dict[str, Any]]:
        """List entities with optional filtering."""
        pass

    @abstractmethod
    async def create(self, entity_type: str, data: Dict[str, Any]) -> Dict[str, Any]:
        """Create a new entity."""
        pass

    @abstractmethod
    async def update(
        self, entity_type: str, entity_id: str, data: Dict[str, Any]
    ) -> Dict[str, Any]:
        """Update an existing entity."""
        pass

    @abstractmethod
    async def delete(self, entity_type: str, entity_id: str) -> bool:
        """Delete an entity."""
        pass


class InMemoryRepository(Repository):
    """In-memory repository for testing and development."""

    def __init__(self):
        self._store: Dict[str, Dict[str, Dict[str, Any]]] = {}

    async def get(self, entity_type: str, entity_id: str) -> Optional[Dict[str, Any]]:
        """Get a single entity by ID."""
        return self._store.get(entity_type, {}).get(entity_id)

    async def list(
        self,
        entity_type: str,
        filter_expr: Any = None,
        context: Dict[str, Any] = None,
    ) -> List[Dict[str, Any]]:
        """List entities with optional filtering."""
        entities = list(self._store.get(entity_type, {}).values())

        # Apply simple filter if provided
        if filter_expr and context:
            entities = self._apply_filter(entities, filter_expr, context)

        return entities

    async def create(self, entity_type: str, data: Dict[str, Any]) -> Dict[str, Any]:
        """Create a new entity."""
        entity_id = data.get("id") or str(uuid.uuid4())
        data = {**data, "id": entity_id}

        if entity_type not in self._store:
            self._store[entity_type] = {}
        self._store[entity_type][entity_id] = data

        return data

    async def update(
        self, entity_type: str, entity_id: str, data: Dict[str, Any]
    ) -> Dict[str, Any]:
        """Update an existing entity (upsert - creates if not exists)."""
        if entity_type not in self._store:
            self._store[entity_type] = {}

        if entity_id in self._store[entity_type]:
            # Update existing
            self._store[entity_type][entity_id].update(data)
        else:
            # Create new (upsert)
            self._store[entity_type][entity_id] = {**data, "id": entity_id}

        return self._store[entity_type][entity_id]

    async def delete(self, entity_type: str, entity_id: str) -> bool:
        """Delete an entity."""
        if entity_type in self._store and entity_id in self._store[entity_type]:
            del self._store[entity_type][entity_id]
            return True
        return False

    def _apply_filter(
        self,
        entities: List[Dict[str, Any]],
        filter_expr: Any,
        context: Dict[str, Any],
    ) -> List[Dict[str, Any]]:
        """Apply a simple S-expression filter."""
        if not filter_expr or not isinstance(filter_expr, list):
            return entities

        op = filter_expr[0]

        if op == "=":
            field_path = filter_expr[1]
            expected_value = filter_expr[2]

            # Resolve field path (e.g., "@entity.status")
            if isinstance(field_path, str) and field_path.startswith("@entity."):
                field_name = field_path.replace("@entity.", "")
                return [e for e in entities if e.get(field_name) == expected_value]

        return entities

    def seed(self, entity_type: str, entities: List[Dict[str, Any]]):
        """Seed the repository with test data."""
        if entity_type not in self._store:
            self._store[entity_type] = {}
        for entity in entities:
            entity_id = entity.get("id") or str(uuid.uuid4())
            entity["id"] = entity_id
            self._store[entity_type][entity_id] = entity


class FirestoreRepository(Repository):
    """
    Firestore repository for production use.

    Uses Firebase Admin SDK to interact with Cloud Firestore.
    Entity types map to Firestore collections.
    """

    def __init__(self):
        self._db = None

    @property
    def db(self):
        """Lazy-load Firestore client."""
        if self._db is None:
            self._db = get_firestore()
        return self._db

    async def get(self, entity_type: str, entity_id: str) -> Optional[Dict[str, Any]]:
        """Get a single entity by ID from Firestore."""
        doc_ref = self.db.collection(entity_type).document(entity_id)
        doc = doc_ref.get()

        if doc.exists:
            data = doc.to_dict()
            data["id"] = doc.id
            return data
        return None

    async def list(
        self,
        entity_type: str,
        filter_expr: Any = None,
        context: Dict[str, Any] = None,
    ) -> List[Dict[str, Any]]:
        """List entities from Firestore with optional filtering."""
        collection_ref = self.db.collection(entity_type)

        # Apply S-expression filter if provided
        if filter_expr and context:
            collection_ref = self._apply_filter(collection_ref, filter_expr, context)

        docs = collection_ref.stream()
        entities = []
        for doc in docs:
            data = doc.to_dict()
            data["id"] = doc.id
            entities.append(data)

        return entities

    async def create(self, entity_type: str, data: Dict[str, Any]) -> Dict[str, Any]:
        """Create a new entity in Firestore."""
        entity_id = data.get("id") or str(uuid.uuid4())

        # Remove id from data to avoid duplication (id is the document key)
        doc_data = {k: v for k, v in data.items() if k != "id"}

        doc_ref = self.db.collection(entity_type).document(entity_id)
        doc_ref.set(doc_data)

        return {**doc_data, "id": entity_id}

    async def update(
        self, entity_type: str, entity_id: str, data: Dict[str, Any]
    ) -> Dict[str, Any]:
        """Update an existing entity in Firestore."""
        # Remove id from update data
        update_data = {k: v for k, v in data.items() if k != "id"}

        doc_ref = self.db.collection(entity_type).document(entity_id)
        doc_ref.update(update_data)

        # Return the updated document
        updated_doc = doc_ref.get()
        if updated_doc.exists:
            result = updated_doc.to_dict()
            result["id"] = updated_doc.id
            return result
        return {**update_data, "id": entity_id}

    async def delete(self, entity_type: str, entity_id: str) -> bool:
        """Delete an entity from Firestore."""
        doc_ref = self.db.collection(entity_type).document(entity_id)

        # Check if document exists before deleting
        if doc_ref.get().exists:
            doc_ref.delete()
            return True
        return False

    def _apply_filter(self, collection_ref, filter_expr: Any, context: Dict[str, Any]):
        """
        Apply S-expression filter to Firestore query.

        Supports basic equality filters like:
        (= @entity.status "active")
        """
        if not filter_expr or not isinstance(filter_expr, list):
            return collection_ref

        op = filter_expr[0]

        if op == "=":
            field_path = filter_expr[1]
            expected_value = filter_expr[2]

            # Resolve field path (e.g., "@entity.status" -> "status")
            if isinstance(field_path, str) and field_path.startswith("@entity."):
                field_name = field_path.replace("@entity.", "")
                return collection_ref.where(field_name, "==", expected_value)

        return collection_ref
