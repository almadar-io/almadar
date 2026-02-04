"""
Effect Executor Tests

Tests for core/effect_executor.py - Server-side effect execution.
"""

import pytest
from orbital_app.core.effect_executor import EffectExecutor
from orbital_app.core.repository import InMemoryRepository


class TestEffectExecutor:
    """Tests for EffectExecutor."""

    @pytest.fixture
    def repository(self):
        """Create a fresh repository."""
        return InMemoryRepository()

    @pytest.fixture
    def executor(self, repository):
        """Create an executor with the repository."""
        return EffectExecutor(repository)

    @pytest.mark.asyncio
    async def test_execute_fetch_single(self, executor, repository):
        """Test fetching a single entity by ID."""
        # Seed data
        await repository.create("Task", {"id": "task-1", "name": "Test Task"})

        effect = ["fetch", "Task", {"id": "task-1"}]
        context = {}

        result = await executor.execute(effect, context)

        assert result is not None
        assert result["id"] == "task-1"
        assert result["name"] == "Test Task"
        assert "Task" in executor.data

    @pytest.mark.asyncio
    async def test_execute_fetch_collection(self, executor, repository):
        """Test fetching all entities of a type."""
        await repository.create("Task", {"name": "Task 1"})
        await repository.create("Task", {"name": "Task 2"})

        effect = ["fetch", "Task"]
        context = {}

        result = await executor.execute(effect, context)

        assert isinstance(result, list)
        assert len(result) == 2

    @pytest.mark.asyncio
    async def test_execute_fetch_with_filter(self, executor, repository):
        """Test fetching with S-expression filter."""
        await repository.create("Task", {"name": "Task 1", "status": "pending"})
        await repository.create("Task", {"name": "Task 2", "status": "completed"})

        # Filter requires non-empty context to be applied by repository
        effect = ["fetch", "Task", {"filter": ["=", "@entity.status", "pending"]}]
        context = {"dummy": True}

        result = await executor.execute(effect, context)

        assert len(result) == 1
        assert result[0]["status"] == "pending"

    @pytest.mark.asyncio
    async def test_execute_persist_create(self, executor, repository):
        """Test persist create effect."""
        effect = ["persist", "create", "Task", {"name": "New Task", "status": "pending"}]
        context = {}

        result = await executor.execute(effect, context)

        assert result is not None
        assert "id" in result
        assert result["name"] == "New Task"
        assert len(executor.effect_results) == 1
        assert executor.effect_results[0]["action"] == "create"
        assert executor.effect_results[0]["success"] is True

    @pytest.mark.asyncio
    async def test_execute_persist_update(self, executor, repository):
        """Test persist update effect."""
        created = await repository.create("Task", {"name": "Original", "status": "pending"})
        entity_id = created["id"]

        effect = ["persist", "update", "Task", {"status": "completed"}]
        context = {"entityId": entity_id}

        result = await executor.execute(effect, context)

        assert result["status"] == "completed"
        assert executor.effect_results[0]["action"] == "update"

    @pytest.mark.asyncio
    async def test_execute_persist_delete(self, executor, repository):
        """Test persist delete effect."""
        created = await repository.create("Task", {"name": "To Delete"})
        entity_id = created["id"]

        effect = ["persist", "delete", "Task"]
        context = {"entityId": entity_id}

        result = await executor.execute(effect, context)

        assert result["deleted"] is True
        assert executor.effect_results[0]["action"] == "delete"

        # Verify deleted
        deleted = await repository.get("Task", entity_id)
        assert deleted is None

    @pytest.mark.asyncio
    async def test_execute_client_effects_collected(self, executor):
        """Test that client effects are collected."""
        context = {}

        # Execute various client effects
        await executor.execute(["render_ui", "main", {"type": "table"}], context)
        await executor.execute(["navigate", "/tasks"], context)
        await executor.execute(["notify", {"type": "success", "message": "Done"}], context)

        assert len(executor.client_effects) == 3
        assert executor.client_effects[0][0] == "render_ui"
        assert executor.client_effects[1][0] == "navigate"
        assert executor.client_effects[2][0] == "notify"

    @pytest.mark.asyncio
    async def test_execute_render_ui_variations(self, executor):
        """Test render_ui and render-ui both work."""
        context = {}

        await executor.execute(["render_ui", "slot1", {}], context)
        await executor.execute(["render-ui", "slot2", {}], context)

        assert len(executor.client_effects) == 2

    @pytest.mark.asyncio
    async def test_execute_emit_as_client_effect(self, executor):
        """Test emit is collected as client effect."""
        effect = ["emit", "TASK_CREATED", {"taskId": "123"}]
        context = {}

        await executor.execute(effect, context)

        assert len(executor.client_effects) == 1
        assert executor.client_effects[0][0] == "emit"

    @pytest.mark.asyncio
    async def test_execute_set_effect(self, executor):
        """Test set effect updates entity field."""
        context = {"entity": {"name": "Original", "status": "pending"}}

        effect = ["set", "@entity.status", "completed"]
        await executor.execute(effect, context)

        assert context["entity"]["status"] == "completed"
        assert len(executor.effect_results) == 1
        assert executor.effect_results[0]["effect"] == "set"

    @pytest.mark.asyncio
    async def test_execute_empty_effect(self, executor):
        """Test empty effect returns None."""
        result = await executor.execute([], {})
        assert result is None

    @pytest.mark.asyncio
    async def test_execute_unknown_effect(self, executor):
        """Test unknown effect returns None."""
        result = await executor.execute(["unknown_effect", "arg"], {})
        assert result is None

    @pytest.mark.asyncio
    async def test_resolve_bindings_in_context(self, executor, repository):
        """Test that @payload bindings are resolved."""
        effect = ["persist", "create", "Task", "@payload"]
        context = {"payload": {"name": "From Payload", "status": "new"}}

        result = await executor.execute(effect, context)

        assert result["name"] == "From Payload"
        assert result["status"] == "new"

    @pytest.mark.asyncio
    async def test_call_service_not_implemented(self, executor):
        """Test call_service returns not_implemented."""
        effect = ["call_service", "email", "send", {"to": "test@test.com"}]
        context = {}

        result = await executor.execute(effect, context)

        assert result["status"] == "not_implemented"
        assert executor.effect_results[0]["success"] is False
