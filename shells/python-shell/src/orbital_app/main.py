"""
Orbital Python Shell - FastAPI Server

Handles event processing for Orbital applications with PyTorch support.
Generated code goes in orbital_app/generated/
"""
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import uvicorn

from .core.settings import get_settings
from .core.firebase import initialize_firebase
from .core.websocket import connection_manager
from .generated.routes import register_routes

# Load settings
settings = get_settings()


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan handler."""
    print(f"Starting Orbital Python Server (env: {settings.environment})...")

    # Initialize Firebase Admin SDK
    try:
        initialize_firebase()
        if settings.is_emulator:
            print(f"Firebase Admin SDK initialized (emulator: {settings.firestore_emulator_host})")
        else:
            print("Firebase Admin SDK initialized")
    except Exception as e:
        print(f"Warning: Firebase initialization failed: {e}")
        print("Running without Firebase authentication")

    yield
    print("Shutting down...")


app = FastAPI(
    title="Orbital Python Shell",
    description="FastAPI server for Orbital applications with PyTorch support",
    version="0.1.0",
    lifespan=lifespan,
)

# CORS middleware for React client
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Health check endpoint
@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return {
        "status": "healthy",
        "version": "0.1.0",
        "environment": settings.environment,
    }


# WebSocket endpoint for real-time updates
@app.websocket("/ws")
async def websocket_global(websocket: WebSocket):
    """Global WebSocket connection for all updates."""
    await connection_manager.connect(websocket)
    try:
        while True:
            # Keep connection alive, handle incoming messages
            data = await websocket.receive_text()
            # Echo back for ping/pong
            if data == "ping":
                await websocket.send_text("pong")
    except WebSocketDisconnect:
        await connection_manager.disconnect(websocket)


@app.websocket("/ws/{entity_type}/{entity_id}")
async def websocket_entity(websocket: WebSocket, entity_type: str, entity_id: str):
    """Entity-specific WebSocket connection."""
    await connection_manager.connect(websocket, entity_type, entity_id)
    try:
        while True:
            data = await websocket.receive_text()
            if data == "ping":
                await websocket.send_text("pong")
    except WebSocketDisconnect:
        await connection_manager.disconnect(websocket, entity_type, entity_id)


# Register generated routes
register_routes(app)


if __name__ == "__main__":
    uvicorn.run(
        "orbital_app.main:app",
        host="0.0.0.0",
        port=settings.port,
        reload=settings.is_development,
    )
