"""
Event Bus

Provides event publishing and subscription for Orbital traits.
"""

from typing import Dict, Any, Callable, List, Optional
from dataclasses import dataclass, field
import asyncio


@dataclass
class EventSubscription:
    """Represents an event subscription."""
    event: str
    handler: Callable
    once: bool = False


class EventBus:
    """
    Event bus for trait communication.

    Allows traits to emit and subscribe to events.
    """

    def __init__(self):
        self._subscriptions: Dict[str, List[EventSubscription]] = {}
        self._pending_events: List[tuple] = []

    def subscribe(
        self,
        event: str,
        handler: Callable,
        once: bool = False,
    ) -> Callable:
        """
        Subscribe to an event.

        Args:
            event: The event name to subscribe to
            handler: The callback function
            once: If True, unsubscribe after first call

        Returns:
            A function to unsubscribe
        """
        if event not in self._subscriptions:
            self._subscriptions[event] = []

        sub = EventSubscription(event=event, handler=handler, once=once)
        self._subscriptions[event].append(sub)

        def unsubscribe():
            if event in self._subscriptions:
                self._subscriptions[event] = [
                    s for s in self._subscriptions[event] if s != sub
                ]

        return unsubscribe

    async def emit(self, event: str, payload: Optional[Dict[str, Any]] = None) -> None:
        """
        Emit an event to all subscribers.

        Args:
            event: The event name
            payload: Optional event payload
        """
        if event not in self._subscriptions:
            return

        to_remove = []
        for sub in self._subscriptions[event]:
            try:
                if asyncio.iscoroutinefunction(sub.handler):
                    await sub.handler(payload or {})
                else:
                    sub.handler(payload or {})

                if sub.once:
                    to_remove.append(sub)
            except Exception as e:
                # Log error but continue processing
                print(f"Error in event handler for {event}: {e}")

        # Remove one-time subscriptions
        for sub in to_remove:
            self._subscriptions[event].remove(sub)

    def clear(self, event: Optional[str] = None) -> None:
        """
        Clear subscriptions.

        Args:
            event: If provided, only clear subscriptions for this event.
                   If None, clear all subscriptions.
        """
        if event:
            self._subscriptions.pop(event, None)
        else:
            self._subscriptions.clear()


# Default global event bus instance
_default_event_bus: Optional[EventBus] = None


def get_event_bus() -> EventBus:
    """Get the default event bus instance."""
    global _default_event_bus
    if _default_event_bus is None:
        _default_event_bus = EventBus()
    return _default_event_bus


def EventBusDependency() -> EventBus:
    """FastAPI dependency for EventBus."""
    return get_event_bus()
