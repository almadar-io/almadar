"""
Middleware for Orbital Python Shell.

- auth: Firebase authentication middleware
"""
from .auth import (
    FirebaseUser,
    get_current_user,
    get_optional_user,
    require_auth,
)

__all__ = [
    "FirebaseUser",
    "get_current_user",
    "get_optional_user",
    "require_auth",
]
