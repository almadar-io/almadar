"""
Bindings - Resolve @entity, @payload, @user bindings.

Bindings are references to values in the execution context:
- @payload.field - Value from the event payload
- @entity.field - Value from the current entity
- @user.field - Value from the authenticated user
"""
from typing import Any, Dict


def resolve_binding(value: Any, context: Dict[str, Any]) -> Any:
    """
    Resolve a binding reference to its actual value.

    Args:
        value: The value to resolve (may be a binding string or literal)
        context: The execution context containing payload, entity, user, etc.

    Returns:
        The resolved value
    """
    if not isinstance(value, str):
        return value

    if not value.startswith("@"):
        return value

    # Parse binding: @root.path.to.field
    parts = value[1:].split(".")
    root = parts[0]

    if root not in context:
        return None

    result = context[root]

    for part in parts[1:]:
        if result is None:
            return None
        if isinstance(result, dict):
            result = result.get(part)
        else:
            result = getattr(result, part, None)

    return result


def resolve_bindings_in_dict(data: Dict[str, Any], context: Dict[str, Any]) -> Dict[str, Any]:
    """
    Recursively resolve all bindings in a dictionary.

    Args:
        data: Dictionary that may contain binding references
        context: The execution context

    Returns:
        Dictionary with all bindings resolved
    """
    result = {}
    for key, value in data.items():
        if isinstance(value, str):
            result[key] = resolve_binding(value, context)
        elif isinstance(value, dict):
            result[key] = resolve_bindings_in_dict(value, context)
        elif isinstance(value, list):
            result[key] = [
                resolve_bindings_in_dict(item, context) if isinstance(item, dict)
                else resolve_binding(item, context) if isinstance(item, str)
                else item
                for item in value
            ]
        else:
            result[key] = value
    return result
