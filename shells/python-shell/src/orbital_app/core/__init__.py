"""
Core utilities for Orbital Python Shell.

- settings: Application configuration
- event_router: Event dispatch and response models
- effect_executor: Server-side effect execution
- repository: Database abstraction layer
- bindings: @entity, @payload binding resolution
- firebase: Firebase Admin SDK initialization
- websocket: Real-time WebSocket connection management
"""
from .settings import Settings, get_settings
from .event_router import EventRequest, EventResponse
from .effect_executor import EffectExecutor
from .repository import Repository, InMemoryRepository, FirestoreRepository
from .bindings import resolve_binding, resolve_bindings_in_dict
from .firebase import initialize_firebase, get_auth, get_firestore, verify_id_token
from .event_bus import EventBus, get_event_bus
from .websocket import ConnectionManager, connection_manager

__all__ = [
    "Settings",
    "get_settings",
    "EventRequest",
    "EventResponse",
    "EffectExecutor",
    "Repository",
    "InMemoryRepository",
    "FirestoreRepository",
    "resolve_binding",
    "resolve_bindings_in_dict",
    "initialize_firebase",
    "get_auth",
    "get_firestore",
    "verify_id_token",
    "EventBus",
    "get_event_bus",
    "ConnectionManager",
    "connection_manager",
]
