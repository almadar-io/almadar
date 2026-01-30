"""
Event Router - Request/Response models for event handling.

This follows the Orbital Execution Model:
1. Receive event from client
2. Evaluate guards
3. Execute server-side effects
4. Return { data, clientEffects }
"""
from typing import Dict, Any, List, Optional
from pydantic import BaseModel


class EventRequest(BaseModel):
    """Request body for event endpoints."""

    payload: Dict[str, Any] = {}
    entityId: Optional[str] = None


class EventResponse(BaseModel):
    """
    Standard response format per Orbital_Execution_Model.md.

    - success: Whether the event was handled successfully
    - newState: Updated trait state after transition
    - data: Fetched entities from server-side effects
    - clientEffects: Effects for React client to execute (render_ui, navigate, notify)
    - effectResults: Results from mutation effects (persist, call_service)
    - error: Error message if success is False
    """

    success: bool
    newState: str
    data: Dict[str, Any] = {}
    clientEffects: List[Any] = []
    effectResults: List[Dict[str, Any]] = []
    error: Optional[str] = None
