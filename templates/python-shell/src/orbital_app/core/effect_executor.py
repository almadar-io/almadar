"""
Effect Executor - Executes server-side effects.

Server-side effects (per Orbital_Execution_Model.md):
- fetch: Query database
- persist: Write to database
- call_service: Call external services
- PyTorch ops: Neural network inference/training

Client-side effects are collected and returned in response.clientEffects.
"""
from typing import Dict, Any, List, Optional
from .repository import Repository
from .bindings import resolve_binding


class EffectExecutor:
    """Executes server-side effects and collects client-side effects."""

    def __init__(self, repository: Repository):
        self.repository = repository
        self.data: Dict[str, Any] = {}
        self.client_effects: List[Any] = []
        self.effect_results: List[Dict[str, Any]] = []

    async def execute(self, effect: List[Any], context: Dict[str, Any]) -> Optional[Any]:
        """Execute a single effect."""
        if not effect:
            return None

        effect_type = effect[0]

        # Server-side effects
        if effect_type == "fetch":
            return await self._execute_fetch(effect, context)
        elif effect_type == "persist":
            return await self._execute_persist(effect, context)
        elif effect_type == "call_service":
            return await self._execute_call_service(effect, context)
        elif effect_type == "set":
            return await self._execute_set(effect, context)

        # Client-side effects - add to response
        elif effect_type in ("render_ui", "render-ui"):
            self.client_effects.append(effect)
        elif effect_type == "navigate":
            self.client_effects.append(effect)
        elif effect_type == "notify":
            self.client_effects.append(effect)
        elif effect_type == "emit":
            # emit can be both client and server side
            self.client_effects.append(effect)

        # PyTorch effects
        elif effect_type.startswith("nn/") or effect_type.startswith("train/"):
            return await self._execute_pytorch(effect, context)
        elif effect_type.startswith("tensor/"):
            return await self._execute_tensor(effect, context)

        return None

    async def _execute_fetch(
        self, effect: List[Any], context: Dict[str, Any]
    ) -> Optional[Any]:
        """Execute fetch effect - query database."""
        entity_type = effect[1]
        options = effect[2] if len(effect) > 2 else {}

        if "id" in options:
            # Single entity fetch
            entity_id = resolve_binding(options["id"], context)
            result = await self.repository.get(entity_type, entity_id)
            self.data[entity_type] = result
        else:
            # Collection fetch with optional filter
            filter_expr = options.get("filter")
            results = await self.repository.list(entity_type, filter_expr, context)
            self.data[entity_type] = results

        return self.data.get(entity_type)

    async def _execute_persist(
        self, effect: List[Any], context: Dict[str, Any]
    ) -> Optional[Dict[str, Any]]:
        """Execute persist effect - write to database."""
        action = effect[1]  # 'create', 'update', 'delete'
        entity_type = effect[2]
        data = resolve_binding(effect[3], context) if len(effect) > 3 else {}

        result = None
        if action == "create":
            result = await self.repository.create(entity_type, data)
        elif action == "update":
            entity_id = context.get("entityId") or (data.get("id") if isinstance(data, dict) else None)
            if entity_id:
                result = await self.repository.update(entity_type, entity_id, data)
        elif action == "delete":
            entity_id = context.get("entityId")
            if entity_id:
                await self.repository.delete(entity_type, entity_id)
                result = {"deleted": True, "id": entity_id}

        self.effect_results.append(
            {
                "effect": "persist",
                "action": action,
                "entityType": entity_type,
                "data": result,
                "success": result is not None,
            }
        )
        return result

    async def _execute_call_service(
        self, effect: List[Any], context: Dict[str, Any]
    ) -> Optional[Dict[str, Any]]:
        """Execute call_service effect - call external service."""
        service = effect[1]
        method = effect[2]
        args = resolve_binding(effect[3], context) if len(effect) > 3 else {}

        # TODO: Implement service registry and calling
        result = {"service": service, "method": method, "status": "not_implemented"}

        self.effect_results.append(
            {
                "effect": "call_service",
                "service": service,
                "method": method,
                "data": result,
                "success": False,
            }
        )
        return result

    async def _execute_set(
        self, effect: List[Any], context: Dict[str, Any]
    ) -> Optional[Any]:
        """Execute set effect - update entity field."""
        target = effect[1]  # e.g., "@entity.field"
        value = resolve_binding(effect[2], context) if len(effect) > 2 else None

        # Parse target binding
        if isinstance(target, str) and target.startswith("@"):
            parts = target[1:].split(".")
            root = parts[0]
            if root in context and len(parts) > 1:
                obj = context[root]
                for part in parts[1:-1]:
                    if isinstance(obj, dict):
                        obj = obj.get(part, {})
                    else:
                        obj = getattr(obj, part, {})
                # Set the final field
                final_field = parts[-1]
                if isinstance(obj, dict):
                    obj[final_field] = value
                else:
                    setattr(obj, final_field, value)

        self.effect_results.append(
            {"effect": "set", "target": target, "value": value, "success": True}
        )
        return value

    async def _execute_pytorch(
        self, effect: List[Any], context: Dict[str, Any]
    ) -> Optional[Any]:
        """Execute PyTorch neural network operations."""
        op = effect[0]

        try:
            from ..nn.forward import forward as nn_forward
            from ..nn.training import train_loop

            if op == "nn/forward":
                module = resolve_binding(effect[1], context)
                input_tensor = resolve_binding(effect[2], context)
                return nn_forward(module, input_tensor)
            elif op == "train/loop":
                module = resolve_binding(effect[1], context)
                data = resolve_binding(effect[2], context)
                config = resolve_binding(effect[3], context)
                return train_loop(module, data, config)
        except ImportError:
            # PyTorch not available
            pass

        return None

    async def _execute_tensor(
        self, effect: List[Any], context: Dict[str, Any]
    ) -> Optional[Any]:
        """Execute tensor operations."""
        # Tensor ops are typically used in expressions, not as standalone effects
        return None
