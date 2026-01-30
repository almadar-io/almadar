"""
Repository Tests

Tests for core/repository.py - Database abstraction layer.
"""

import pytest
from orbital_app.core.repository import InMemoryRepository


class TestInMemoryRepository:
    """Tests for InMemoryRepository."""

    @pytest.fixture
    def repository(self):
        """Create a fresh repository for each test."""
        return InMemoryRepository()

    @pytest.mark.asyncio
    async def test_create_entity(self, repository):
        """Test creating an entity."""
        data = {"name": "Test Task", "status": "pending"}
        result = await repository.create("Task", data)

        assert "id" in result
        assert result["name"] == "Test Task"
        assert result["status"] == "pending"

    @pytest.mark.asyncio
    async def test_create_with_id(self, repository):
        """Test creating an entity with provided ID."""
        data = {"id": "custom-id", "name": "Test Task"}
        result = await repository.create("Task", data)

        assert result["id"] == "custom-id"

    @pytest.mark.asyncio
    async def test_get_entity(self, repository):
        """Test getting an entity by ID."""
        created = await repository.create("Task", {"name": "Test"})
        entity_id = created["id"]

        result = await repository.get("Task", entity_id)

        assert result is not None
        assert result["id"] == entity_id
        assert result["name"] == "Test"

    @pytest.mark.asyncio
    async def test_get_not_found(self, repository):
        """Test getting non-existent entity returns None."""
        result = await repository.get("Task", "non-existent-id")

        assert result is None

    @pytest.mark.asyncio
    async def test_list_entities(self, repository):
        """Test listing all entities of a type."""
        await repository.create("Task", {"name": "Task 1"})
        await repository.create("Task", {"name": "Task 2"})
        await repository.create("Task", {"name": "Task 3"})

        result = await repository.list("Task")

        assert len(result) == 3

    @pytest.mark.asyncio
    async def test_list_empty(self, repository):
        """Test listing when no entities exist."""
        result = await repository.list("Task")

        assert result == []

    @pytest.mark.asyncio
    async def test_update_entity(self, repository):
        """Test updating an entity."""
        created = await repository.create("Task", {"name": "Original", "status": "pending"})
        entity_id = created["id"]

        result = await repository.update("Task", entity_id, {"status": "completed"})

        assert result["status"] == "completed"
        assert result["name"] == "Original"  # Other fields preserved

    @pytest.mark.asyncio
    async def test_update_not_found(self, repository):
        """Test updating non-existent entity."""
        result = await repository.update("Task", "non-existent", {"status": "done"})

        # Returns the update data when entity not found
        assert result["status"] == "done"

    @pytest.mark.asyncio
    async def test_delete_entity(self, repository):
        """Test deleting an entity."""
        created = await repository.create("Task", {"name": "Test"})
        entity_id = created["id"]

        result = await repository.delete("Task", entity_id)

        assert result is True

        # Verify it's deleted
        deleted = await repository.get("Task", entity_id)
        assert deleted is None

    @pytest.mark.asyncio
    async def test_delete_not_found(self, repository):
        """Test deleting non-existent entity."""
        result = await repository.delete("Task", "non-existent")

        assert result is False

    @pytest.mark.asyncio
    async def test_list_with_filter(self, repository):
        """Test listing with S-expression filter."""
        await repository.create("Task", {"name": "Task 1", "status": "pending"})
        await repository.create("Task", {"name": "Task 2", "status": "completed"})
        await repository.create("Task", {"name": "Task 3", "status": "pending"})

        # Note: Filter requires non-empty context to be applied
        filter_expr = ["=", "@entity.status", "pending"]
        result = await repository.list("Task", filter_expr=filter_expr, context={"dummy": True})

        assert len(result) == 2
        assert all(t["status"] == "pending" for t in result)

    @pytest.mark.asyncio
    async def test_seed_data(self, repository):
        """Test seeding repository with test data."""
        test_data = [
            {"id": "1", "name": "Task 1"},
            {"id": "2", "name": "Task 2"},
        ]
        repository.seed("Task", test_data)

        result = await repository.list("Task")
        assert len(result) == 2

    @pytest.mark.asyncio
    async def test_multiple_entity_types(self, repository):
        """Test handling multiple entity types."""
        await repository.create("Task", {"name": "Task 1"})
        await repository.create("User", {"name": "User 1"})
        await repository.create("Task", {"name": "Task 2"})

        tasks = await repository.list("Task")
        users = await repository.list("User")

        assert len(tasks) == 2
        assert len(users) == 1
