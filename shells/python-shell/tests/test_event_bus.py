"""
Event Bus Tests

Tests for core/event_bus.py - Event publishing and subscription.
"""

import pytest
from orbital_app.core.event_bus import EventBus, get_event_bus


class TestEventBus:
    """Tests for EventBus."""

    @pytest.fixture
    def event_bus(self):
        """Create a fresh event bus for each test."""
        return EventBus()

    @pytest.mark.asyncio
    async def test_subscribe_and_emit(self, event_bus):
        """Test subscribing to event and receiving it."""
        received = []

        def handler(payload):
            received.append(payload)

        event_bus.subscribe("TEST_EVENT", handler)
        await event_bus.emit("TEST_EVENT", {"data": "test"})

        assert len(received) == 1
        assert received[0]["data"] == "test"

    @pytest.mark.asyncio
    async def test_emit_with_payload(self, event_bus):
        """Test emitting event with data payload."""
        received_payload = None

        def handler(payload):
            nonlocal received_payload
            received_payload = payload

        event_bus.subscribe("DATA_EVENT", handler)
        await event_bus.emit("DATA_EVENT", {"id": "123", "name": "Test"})

        assert received_payload == {"id": "123", "name": "Test"}

    @pytest.mark.asyncio
    async def test_emit_without_payload(self, event_bus):
        """Test emitting event without payload."""
        received_payload = None

        def handler(payload):
            nonlocal received_payload
            received_payload = payload

        event_bus.subscribe("SIMPLE_EVENT", handler)
        await event_bus.emit("SIMPLE_EVENT")

        assert received_payload == {}

    @pytest.mark.asyncio
    async def test_multiple_subscribers(self, event_bus):
        """Test multiple handlers receive event."""
        received_by_1 = []
        received_by_2 = []

        def handler1(payload):
            received_by_1.append(payload)

        def handler2(payload):
            received_by_2.append(payload)

        event_bus.subscribe("MULTI_EVENT", handler1)
        event_bus.subscribe("MULTI_EVENT", handler2)
        await event_bus.emit("MULTI_EVENT", {"value": 42})

        assert len(received_by_1) == 1
        assert len(received_by_2) == 1
        assert received_by_1[0]["value"] == 42
        assert received_by_2[0]["value"] == 42

    @pytest.mark.asyncio
    async def test_unsubscribe(self, event_bus):
        """Test unsubscribing stops receiving events."""
        received = []

        def handler(payload):
            received.append(payload)

        unsubscribe = event_bus.subscribe("UNSUB_EVENT", handler)

        await event_bus.emit("UNSUB_EVENT", {"first": True})
        unsubscribe()
        await event_bus.emit("UNSUB_EVENT", {"second": True})

        assert len(received) == 1
        assert received[0]["first"] is True

    @pytest.mark.asyncio
    async def test_once_subscription(self, event_bus):
        """Test once=True subscription only fires once."""
        received = []

        def handler(payload):
            received.append(payload)

        event_bus.subscribe("ONCE_EVENT", handler, once=True)

        await event_bus.emit("ONCE_EVENT", {"call": 1})
        await event_bus.emit("ONCE_EVENT", {"call": 2})
        await event_bus.emit("ONCE_EVENT", {"call": 3})

        assert len(received) == 1
        assert received[0]["call"] == 1

    @pytest.mark.asyncio
    async def test_async_handler(self, event_bus):
        """Test async handler is awaited properly."""
        received = []

        async def async_handler(payload):
            received.append(payload)

        event_bus.subscribe("ASYNC_EVENT", async_handler)
        await event_bus.emit("ASYNC_EVENT", {"async": True})

        assert len(received) == 1
        assert received[0]["async"] is True

    @pytest.mark.asyncio
    async def test_emit_to_nonexistent_event(self, event_bus):
        """Test emitting to event with no subscribers."""
        # Should not raise
        await event_bus.emit("NOBODY_LISTENING", {"data": "ignored"})

    @pytest.mark.asyncio
    async def test_clear_specific_event(self, event_bus):
        """Test clearing subscriptions for specific event."""
        received_a = []
        received_b = []

        event_bus.subscribe("EVENT_A", lambda p: received_a.append(p))
        event_bus.subscribe("EVENT_B", lambda p: received_b.append(p))

        event_bus.clear("EVENT_A")

        await event_bus.emit("EVENT_A", {"cleared": True})
        await event_bus.emit("EVENT_B", {"not_cleared": True})

        assert len(received_a) == 0
        assert len(received_b) == 1

    @pytest.mark.asyncio
    async def test_clear_all_events(self, event_bus):
        """Test clearing all subscriptions."""
        received_a = []
        received_b = []

        event_bus.subscribe("EVENT_A", lambda p: received_a.append(p))
        event_bus.subscribe("EVENT_B", lambda p: received_b.append(p))

        event_bus.clear()

        await event_bus.emit("EVENT_A", {})
        await event_bus.emit("EVENT_B", {})

        assert len(received_a) == 0
        assert len(received_b) == 0

    @pytest.mark.asyncio
    async def test_handler_error_doesnt_break_others(self, event_bus):
        """Test that error in one handler doesn't stop others."""
        received = []

        def bad_handler(payload):
            raise ValueError("Handler error")

        def good_handler(payload):
            received.append(payload)

        event_bus.subscribe("ERROR_EVENT", bad_handler)
        event_bus.subscribe("ERROR_EVENT", good_handler)

        # Should not raise, good_handler should still receive
        await event_bus.emit("ERROR_EVENT", {"data": "test"})

        assert len(received) == 1

    def test_get_event_bus_singleton(self):
        """Test get_event_bus returns same instance."""
        bus1 = get_event_bus()
        bus2 = get_event_bus()

        assert bus1 is bus2
