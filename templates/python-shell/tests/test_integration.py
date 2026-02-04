"""
Integration Tests for Orbital Python Shell

Tests the full request/response cycle including:
- HTTP API endpoints
- WebSocket connections
- Event processing and effects
- State management
"""
import pytest
import asyncio
from typing import List, Any, Dict
from fastapi.testclient import TestClient


class TestHealthCheck:
    """Test the health check endpoint."""

    def test_health_check_returns_200(self, test_client: TestClient):
        """Health endpoint returns 200 status."""
        response = test_client.get("/health")
        assert response.status_code == 200

    def test_health_check_returns_healthy_status(self, test_client: TestClient):
        """Health endpoint returns healthy status."""
        response = test_client.get("/health")
        data = response.json()
        assert data["status"] == "healthy"
        assert "version" in data
        assert "environment" in data


class TestEventAPIRoutes:
    """Test that event API routes are registered."""

    def test_openapi_schema_available(self, test_client: TestClient):
        """OpenAPI schema is available."""
        response = test_client.get("/openapi.json")
        assert response.status_code == 200
        data = response.json()
        assert "paths" in data

    def test_api_routes_registered(self, test_client: TestClient):
        """API routes are registered in OpenAPI schema."""
        response = test_client.get("/openapi.json")
        data = response.json()
        paths = list(data.get("paths", {}).keys())

        # Should have at least health and some API routes
        assert "/health" in paths
        # Check for example task routes (from shell template)
        api_routes = [p for p in paths if p.startswith("/api/")]
        assert len(api_routes) > 0, "Should have API routes registered"


class TestExampleTaskRoutes:
    """Test the example task routes from shell template (if present)."""

    def _has_task_routes(self, client: TestClient) -> bool:
        """Check if example task routes exist."""
        response = client.get("/openapi.json")
        paths = response.json().get("paths", {})
        return "/api/tasks/create" in paths

    def test_create_task_requires_auth(self, test_client: TestClient):
        """Create task endpoint requires authentication."""
        if not self._has_task_routes(test_client):
            pytest.skip("Example task routes not present in this app")

        response = test_client.post(
            "/api/tasks/create",
            json={"payload": {"name": "Test Task"}},
        )
        assert response.status_code == 401

    def test_complete_task_not_found(self, test_client: TestClient):
        """Complete task returns 404 for non-existent task."""
        if not self._has_task_routes(test_client):
            pytest.skip("Example task routes not present in this app")

        response = test_client.post(
            "/api/tasks/non-existent-id/complete",
            json={"payload": {"timestamp": "2024-01-01T00:00:00Z"}},
        )
        assert response.status_code == 404


class TestWebSocket:
    """Test WebSocket connections."""

    def test_websocket_global_connect(self, test_client: TestClient):
        """Can connect to global WebSocket endpoint."""
        with test_client.websocket_connect("/ws") as websocket:
            websocket.send_text("ping")
            data = websocket.receive_text()
            assert data == "pong"

    def test_websocket_entity_connect(self, test_client: TestClient):
        """Can connect to entity-specific WebSocket endpoint."""
        with test_client.websocket_connect("/ws/tasks/123") as websocket:
            websocket.send_text("ping")
            data = websocket.receive_text()
            assert data == "pong"

    def test_websocket_multiple_pings(self, test_client: TestClient):
        """WebSocket handles multiple ping/pong exchanges."""
        with test_client.websocket_connect("/ws") as websocket:
            for _ in range(3):
                websocket.send_text("ping")
                data = websocket.receive_text()
                assert data == "pong"


class TestConnectionManager:
    """Test WebSocket connection manager directly."""

    @pytest.mark.asyncio
    async def test_connection_manager_init(self):
        """Connection manager initializes correctly."""
        from orbital_app.core.websocket import ConnectionManager
        manager = ConnectionManager()
        assert manager.active_connections == {}
        assert manager.global_connections == []

    @pytest.mark.asyncio
    async def test_broadcast_without_connections(self):
        """Broadcast doesn't fail without connections."""
        from orbital_app.core.websocket import ConnectionManager
        manager = ConnectionManager()

        # Should not raise
        await manager.broadcast_client_effects(
            entity_type="tasks",
            entity_id="123",
            event="complete",
            client_effects=[["notify", {"message": "Test"}]],
            data={"tasks": {"id": "123"}},
        )

    @pytest.mark.asyncio
    async def test_broadcast_global(self):
        """Global broadcast doesn't fail."""
        from orbital_app.core.websocket import ConnectionManager
        manager = ConnectionManager()

        await manager.broadcast_global({"type": "test", "data": {}})


class TestEventResponse:
    """Test event response format."""

    def test_event_response_model(self):
        """EventResponse model has correct fields."""
        from orbital_app.core.event_router import EventResponse

        response = EventResponse(
            success=True,
            newState="completed",
            data={"test": "data"},
            clientEffects=[["notify", {"message": "Done"}]],
        )

        assert response.success is True
        assert response.newState == "completed"
        assert response.data == {"test": "data"}
        assert len(response.clientEffects) == 1


class TestClientEffectsFormat:
    """Test that client effects are properly formatted."""

    def test_client_effects_json_serializable(self):
        """All client effects must be JSON serializable."""
        import json

        effects: List[Any] = [
            ["render-ui", "main", {"type": "entity-detail", "entity": "Task"}],
            ["navigate", "/tasks/123"],
            ["notify", {"type": "success", "message": "Done!"}],
            ["emit", "task:completed", {"taskId": "123"}],
        ]

        # Should not raise
        serialized = json.dumps(effects)
        deserialized = json.loads(serialized)
        assert deserialized == effects

    def test_nested_effects_serializable(self):
        """Nested effect data is JSON serializable."""
        import json

        effect = [
            "render-ui",
            "main",
            {
                "pattern_type": "stats",
                "config": {
                    "items": [
                        {"label": "Status", "value": "ready"},
                        {"label": "Count", "value": 42},
                    ]
                }
            }
        ]

        serialized = json.dumps(effect)
        deserialized = json.loads(serialized)
        assert deserialized == effect


class TestCORSConfiguration:
    """Test CORS is properly configured."""

    def test_cors_preflight(self, test_client: TestClient):
        """CORS preflight request is handled."""
        response = test_client.options(
            "/api/tasks/create",
            headers={
                "Origin": "http://localhost:3000",
                "Access-Control-Request-Method": "POST",
            },
        )
        # Should not be 404 - either 200/204 (allowed) or 405 (method not allowed for OPTIONS)
        assert response.status_code in (200, 204, 405)


class TestEffectExecutor:
    """Test the effect executor."""

    @pytest.mark.asyncio
    async def test_effect_executor_init(self):
        """Effect executor initializes correctly."""
        from orbital_app.core.effect_executor import EffectExecutor
        from orbital_app.core.repository import InMemoryRepository

        repo = InMemoryRepository()
        executor = EffectExecutor(repo)

        assert executor.data == {}
        assert executor.client_effects == []
        assert executor.effect_results == []

    @pytest.mark.asyncio
    async def test_effect_executor_client_effects(self):
        """Effect executor collects client effects."""
        from orbital_app.core.effect_executor import EffectExecutor
        from orbital_app.core.repository import InMemoryRepository

        repo = InMemoryRepository()
        executor = EffectExecutor(repo)

        context = {"entity": {}, "payload": {}}

        # Execute client-side effects
        await executor.execute(["notify", {"message": "Test"}], context)
        await executor.execute(["render-ui", "main", {"type": "card"}], context)
        await executor.execute(["navigate", "/home"], context)

        assert len(executor.client_effects) == 3


class TestRepository:
    """Test the repository layer."""

    @pytest.mark.asyncio
    async def test_in_memory_repository_crud(self):
        """In-memory repository supports CRUD operations."""
        from orbital_app.core.repository import InMemoryRepository

        repo = InMemoryRepository()

        # Create
        entity = await repo.create("tasks", {"name": "Test Task", "status": "active"})
        assert "id" in entity
        assert entity["name"] == "Test Task"

        # Read
        fetched = await repo.get("tasks", entity["id"])
        assert fetched is not None
        assert fetched["name"] == "Test Task"

        # Update
        updated = await repo.update("tasks", entity["id"], {"status": "completed"})
        assert updated["status"] == "completed"

        # Delete
        deleted = await repo.delete("tasks", entity["id"])
        assert deleted is True

        # Verify deleted
        gone = await repo.get("tasks", entity["id"])
        assert gone is None

    @pytest.mark.asyncio
    async def test_in_memory_repository_list(self):
        """In-memory repository supports listing entities."""
        from orbital_app.core.repository import InMemoryRepository

        repo = InMemoryRepository()

        # Create multiple
        await repo.create("tasks", {"name": "Task 1"})
        await repo.create("tasks", {"name": "Task 2"})
        await repo.create("tasks", {"name": "Task 3"})

        # List all
        tasks = await repo.list("tasks")
        assert len(tasks) == 3


class TestEventBus:
    """Test the event bus."""

    @pytest.mark.asyncio
    async def test_event_bus_subscribe_emit(self):
        """Event bus handles subscribe and emit."""
        from orbital_app.core.event_bus import EventBus

        bus = EventBus()
        received = []

        def handler(payload):
            received.append(payload)

        bus.subscribe("test:event", handler)
        await bus.emit("test:event", {"data": "test"})

        assert len(received) == 1
        assert received[0]["data"] == "test"

    @pytest.mark.asyncio
    async def test_event_bus_once(self):
        """Event bus once subscription only fires once."""
        from orbital_app.core.event_bus import EventBus

        bus = EventBus()
        received = []

        def handler(payload):
            received.append(payload)

        bus.subscribe("test:event", handler, once=True)
        await bus.emit("test:event", {"n": 1})
        await bus.emit("test:event", {"n": 2})

        assert len(received) == 1
        assert received[0]["n"] == 1
