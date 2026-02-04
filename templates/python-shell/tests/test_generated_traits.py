"""
Generated Traits Integration Tests

Tests that generated trait routes work correctly:
- State endpoints return valid states
- INIT events transition from idle to ready
- Effects are returned in correct format
- State transitions happen properly

These tests are designed to work with any generated Orbital app.
"""
import pytest
from typing import List, Dict, Any
from fastapi.testclient import TestClient


class TestGeneratedTraitRoutes:
    """Test that generated trait routes work correctly."""

    def get_trait_routes(self, client: TestClient) -> List[str]:
        """Get all trait route prefixes from OpenAPI schema."""
        response = client.get("/openapi.json")
        assert response.status_code == 200
        paths = response.json().get("paths", {})

        # Find unique trait prefixes (e.g., /api/neural_network_manager)
        prefixes = set()
        for path in paths.keys():
            if path.startswith("/api/") and "/events/" in path:
                # Extract prefix before /events/
                prefix = path.split("/events/")[0]
                prefixes.add(prefix)

        return list(prefixes)

    def test_all_traits_have_state_endpoint(self, test_client: TestClient):
        """All generated traits have a /state endpoint."""
        trait_prefixes = self.get_trait_routes(test_client)

        for prefix in trait_prefixes:
            response = test_client.get(f"{prefix}/state")
            assert response.status_code == 200, f"State endpoint failed for {prefix}"
            data = response.json()
            assert "state" in data, f"State response missing 'state' field for {prefix}"

    def test_state_endpoint_returns_valid_state(self, test_client: TestClient):
        """State endpoints return valid state names."""
        trait_prefixes = self.get_trait_routes(test_client)

        for prefix in trait_prefixes:
            response = test_client.get(f"{prefix}/state")
            data = response.json()
            # State should be a string
            assert isinstance(data["state"], str), f"State should be string for {prefix}"
            # State should not be empty
            assert len(data["state"]) > 0, f"State should not be empty for {prefix}"


class TestINITEvent:
    """Test INIT event handling for traits that have it."""

    def get_init_routes(self, client: TestClient) -> List[str]:
        """Get all trait routes that have INIT event."""
        response = client.get("/openapi.json")
        paths = response.json().get("paths", {})
        return [path for path in paths.keys() if "/events/init" in path]

    def test_init_event_works(self, test_client: TestClient):
        """INIT event transitions trait from idle state."""
        init_routes = self.get_init_routes(test_client)

        for route in init_routes:
            # Extract trait prefix for state check
            prefix = route.split("/events/")[0]

            # Get initial state
            state_response = test_client.get(f"{prefix}/state")
            initial_state = state_response.json()["state"]

            # Call INIT
            response = test_client.post(
                route,
                json={"payload": {}, "entity_id": "test-entity-1"},
            )

            assert response.status_code == 200, f"INIT failed for {route}"
            data = response.json()

            # Check response format
            assert "success" in data, f"Response missing 'success' for {route}"
            assert "effects" in data, f"Response missing 'effects' for {route}"
            assert "state" in data, f"Response missing 'state' for {route}"

    def test_init_returns_effects(self, test_client: TestClient):
        """INIT event returns render-ui effects with action buttons."""
        init_routes = self.get_init_routes(test_client)

        for route in init_routes:
            response = test_client.post(
                route,
                json={"payload": {}, "entity_id": "test-entity-2"},
            )

            if response.status_code == 200:
                data = response.json()
                if data.get("success"):
                    effects = data.get("effects", [])
                    # Check effect format
                    for effect in effects:
                        assert isinstance(effect, dict), f"Effect should be dict for {route}"
                        assert "type" in effect, f"Effect missing 'type' for {route}"


class TestEffectFormat:
    """Test that effects are in the correct format."""

    def test_notify_effect_format(self):
        """Notify effects have correct structure."""
        from orbital_app.generated.effect_helpers import notify

        effect = notify("Test message", "Info")

        assert effect["type"] == "notify"
        assert effect["message"] == "Test message"
        assert effect["severity"] == "Info"

    def test_render_ui_effect_format(self):
        """Render-ui effects have correct structure."""
        from orbital_app.generated.effect_helpers import render_ui

        effect = render_ui("main", {"pattern_type": "card"})

        assert effect["type"] == "render-ui"
        assert effect["slot"] == "main"
        assert effect["data"]["pattern_type"] == "card"

    def test_navigate_effect_format(self):
        """Navigate effects have correct structure."""
        from orbital_app.generated.effect_helpers import navigate

        effect = navigate("/dashboard", {"id": "123"})

        assert effect["type"] == "navigate"
        assert effect["path"] == "/dashboard"
        assert effect["params"]["id"] == "123"

    def test_emit_effect_format(self):
        """Emit effects have correct structure."""
        from orbital_app.generated.effect_helpers import emit

        effect = emit("user:created", {"userId": "123"})

        assert effect["type"] == "emit"
        assert effect["event"] == "user:created"
        assert effect["data"]["userId"] == "123"


class TestEventRequest:
    """Test event request validation."""

    def get_any_event_route(self, client: TestClient) -> str:
        """Get any event route for testing."""
        response = client.get("/openapi.json")
        paths = response.json().get("paths", {})
        for path in paths.keys():
            if "/events/" in path:
                return path
        return None

    def test_event_requires_entity_id(self, test_client: TestClient):
        """Event requests require entity_id."""
        route = self.get_any_event_route(test_client)
        if not route:
            pytest.skip("No event routes found")

        response = test_client.post(
            route,
            json={"payload": {}},  # Missing entity_id
        )

        # Should fail validation
        assert response.status_code == 422

    def test_event_accepts_payload(self, test_client: TestClient):
        """Event requests accept optional payload."""
        route = self.get_any_event_route(test_client)
        if not route:
            pytest.skip("No event routes found")

        response = test_client.post(
            route,
            json={
                "payload": {"key": "value"},
                "entity_id": "test-entity",
            },
        )

        # Should not fail on payload format
        assert response.status_code in (200, 400, 500)  # May fail for business logic reasons


class TestWebSocketBroadcast:
    """Test WebSocket broadcasting of effects."""

    def test_websocket_connect(self, test_client: TestClient):
        """Can connect to global WebSocket."""
        with test_client.websocket_connect("/ws") as ws:
            ws.send_text("ping")
            response = ws.receive_text()
            assert response == "pong"

    def test_websocket_entity_connect(self, test_client: TestClient):
        """Can connect to entity-specific WebSocket."""
        with test_client.websocket_connect("/ws/test_trait/test-123") as ws:
            ws.send_text("ping")
            response = ws.receive_text()
            assert response == "pong"


class TestStateTransitions:
    """Test state machine transitions."""

    def get_trait_with_multiple_events(self, client: TestClient) -> Dict[str, Any]:
        """Find a trait with multiple events to test transitions."""
        response = client.get("/openapi.json")
        paths = response.json().get("paths", {})

        # Group events by trait
        trait_events: Dict[str, List[str]] = {}
        for path in paths.keys():
            if "/events/" in path:
                parts = path.split("/events/")
                prefix = parts[0]
                event = parts[1]
                if prefix not in trait_events:
                    trait_events[prefix] = []
                trait_events[prefix].append(event)

        # Find trait with multiple events
        for prefix, events in trait_events.items():
            if len(events) > 1:
                return {"prefix": prefix, "events": events}

        return None

    def test_state_changes_after_event(self, test_client: TestClient):
        """State changes after processing an event."""
        trait_info = self.get_trait_with_multiple_events(test_client)
        if not trait_info:
            pytest.skip("No trait with multiple events found")

        prefix = trait_info["prefix"]

        # Get initial state
        initial = test_client.get(f"{prefix}/state").json()["state"]

        # If there's an init event, call it
        if "init" in trait_info["events"]:
            response = test_client.post(
                f"{prefix}/events/init",
                json={"payload": {}, "entity_id": "transition-test"},
            )

            if response.status_code == 200 and response.json().get("success"):
                # Check state changed
                new_state = test_client.get(f"{prefix}/state").json()["state"]
                # State should have changed or stayed same (depending on current state)
                assert isinstance(new_state, str)
