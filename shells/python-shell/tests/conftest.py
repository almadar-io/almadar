"""
Pytest Configuration and Fixtures

Common fixtures for shell framework tests.
"""

import pytest
import torch
from fastapi.testclient import TestClient

# Configure pytest-asyncio
pytest_plugins = ('pytest_asyncio',)


@pytest.fixture
def test_client():
    """Create a FastAPI test client for HTTP and WebSocket testing."""
    from orbital_app.main import app
    return TestClient(app)


@pytest.fixture
def in_memory_repository():
    """Create an in-memory repository for testing."""
    from orbital_app.core.repository import InMemoryRepository
    return InMemoryRepository()


@pytest.fixture
def effect_executor(in_memory_repository):
    """Create an effect executor for testing."""
    from orbital_app.core.effect_executor import EffectExecutor
    return EffectExecutor(in_memory_repository)


@pytest.fixture
def event_bus():
    """Create an event bus for testing."""
    from orbital_app.core.event_bus import EventBus
    return EventBus()


@pytest.fixture
def simple_network():
    """Create a simple test network."""
    from orbital_app.nn.builder import build_network
    return build_network([
        "nn/sequential",
        ["nn/linear", 4, 8],
        ["nn/relu"],
        ["nn/linear", 8, 2],
    ])


@pytest.fixture
def training_data():
    """Simple training data."""
    return [
        {"observation": [1.0, 0.0, 0.0, 0.0], "target": [1.0, 0.0]},
        {"observation": [0.0, 1.0, 0.0, 0.0], "target": [0.0, 1.0]},
        {"observation": [0.0, 0.0, 1.0, 0.0], "target": [1.0, 0.0]},
        {"observation": [0.0, 0.0, 0.0, 1.0], "target": [0.0, 1.0]},
    ]
