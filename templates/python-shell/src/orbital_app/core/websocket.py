"""
WebSocket Connection Manager

Manages WebSocket connections for real-time updates across the application.
Supports broadcasting client effects to connected frontends.
"""
from fastapi import WebSocket
from typing import Dict, List, Any, Optional
import json
import asyncio


def make_json_serializable(obj: Any) -> Any:
    """Convert PyTorch tensors and other non-serializable types to JSON-serializable Python types."""
    # Handle PyTorch types
    try:
        import torch
        import torch.nn as nn
        # Handle nn.Module (neural network modules) - convert to string representation
        if isinstance(obj, nn.Module):
            return f"<{obj.__class__.__name__}>"
        # Handle tensors
        if isinstance(obj, torch.Tensor):
            # Convert tensor to Python list or scalar
            if obj.dim() == 0:
                return obj.item()
            return obj.tolist()
    except ImportError:
        pass

    # Handle numpy arrays
    try:
        import numpy as np
        if isinstance(obj, np.ndarray):
            return obj.tolist()
        if isinstance(obj, (np.int64, np.int32, np.float64, np.float32)):
            return obj.item()
    except ImportError:
        pass

    # Handle dictionaries recursively
    if isinstance(obj, dict):
        return {k: make_json_serializable(v) for k, v in obj.items()}

    # Handle lists recursively
    if isinstance(obj, list):
        return [make_json_serializable(item) for item in obj]

    # Handle tuples
    if isinstance(obj, tuple):
        return [make_json_serializable(item) for item in obj]

    # Return as-is for other types
    return obj


class ConnectionManager:
    """Manages WebSocket connections and message broadcasting."""

    def __init__(self):
        # Map of entity_type -> entity_id -> list of connections
        self.active_connections: Dict[str, Dict[str, List[WebSocket]]] = {}
        # Global connections (receive all updates)
        self.global_connections: List[WebSocket] = []
        # Lock for thread-safe operations
        self._lock = asyncio.Lock()

    async def connect(
        self,
        websocket: WebSocket,
        entity_type: Optional[str] = None,
        entity_id: Optional[str] = None,
    ):
        """Accept a new WebSocket connection.

        Args:
            websocket: The WebSocket connection
            entity_type: Optional entity type to subscribe to
            entity_id: Optional entity ID to subscribe to
        """
        await websocket.accept()

        async with self._lock:
            if entity_type and entity_id:
                # Subscribe to specific entity
                if entity_type not in self.active_connections:
                    self.active_connections[entity_type] = {}
                if entity_id not in self.active_connections[entity_type]:
                    self.active_connections[entity_type][entity_id] = []
                self.active_connections[entity_type][entity_id].append(websocket)
            else:
                # Global subscription
                self.global_connections.append(websocket)

    async def disconnect(
        self,
        websocket: WebSocket,
        entity_type: Optional[str] = None,
        entity_id: Optional[str] = None,
    ):
        """Remove a WebSocket connection."""
        async with self._lock:
            if entity_type and entity_id:
                if (
                    entity_type in self.active_connections
                    and entity_id in self.active_connections[entity_type]
                ):
                    connections = self.active_connections[entity_type][entity_id]
                    if websocket in connections:
                        connections.remove(websocket)
                    # Clean up empty lists
                    if not connections:
                        del self.active_connections[entity_type][entity_id]
                    if not self.active_connections[entity_type]:
                        del self.active_connections[entity_type]
            else:
                if websocket in self.global_connections:
                    self.global_connections.remove(websocket)

    async def broadcast_to_entity(
        self,
        entity_type: str,
        entity_id: str,
        message: Dict[str, Any],
    ):
        """Broadcast a message to all connections subscribed to an entity."""
        connections_to_notify: List[WebSocket] = []

        async with self._lock:
            # Get entity-specific connections
            if (
                entity_type in self.active_connections
                and entity_id in self.active_connections[entity_type]
            ):
                connections_to_notify.extend(
                    self.active_connections[entity_type][entity_id]
                )
            # Also notify global connections
            connections_to_notify.extend(self.global_connections)

        # Send to all connections outside the lock
        await self._send_to_connections(connections_to_notify, message)

    async def broadcast_global(self, message: Dict[str, Any]):
        """Broadcast a message to all global connections."""
        async with self._lock:
            connections = list(self.global_connections)

        await self._send_to_connections(connections, message)

    async def broadcast_client_effects(
        self,
        entity_type: str,
        entity_id: str,
        event: str,
        client_effects: List[Any],
        data: Optional[Dict[str, Any]] = None,
    ):
        """Broadcast client effects from an event to relevant connections.

        This is the main method called after processing an event.
        """
        message = {
            "type": "client_effects",
            "entityType": entity_type,
            "entityId": entity_id,
            "event": event,
            "effects": client_effects,
            "data": data or {},
        }
        await self.broadcast_to_entity(entity_type, entity_id, message)

    async def _send_to_connections(
        self, connections: List[WebSocket], message: Dict[str, Any]
    ):
        """Send a message to multiple connections, handling failures."""
        # Convert any PyTorch tensors or numpy arrays to JSON-serializable types
        serializable_message = make_json_serializable(message)
        json_message = json.dumps(serializable_message)
        disconnected: List[WebSocket] = []

        for connection in connections:
            try:
                await connection.send_text(json_message)
            except Exception:
                disconnected.append(connection)

        # Remove disconnected websockets
        if disconnected:
            async with self._lock:
                for ws in disconnected:
                    if ws in self.global_connections:
                        self.global_connections.remove(ws)
                    for entity_type in self.active_connections:
                        for entity_id in self.active_connections[entity_type]:
                            connections = self.active_connections[entity_type][entity_id]
                            if ws in connections:
                                connections.remove(ws)


# Global connection manager instance
connection_manager = ConnectionManager()
