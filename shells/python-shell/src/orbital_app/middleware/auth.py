"""
Firebase Authentication Middleware

Provides FastAPI dependencies for authenticating requests using Firebase ID tokens.
The decoded token provides the @user context for guard evaluation.
"""
from typing import Optional, Annotated
from fastapi import Depends, HTTPException, Header, status
from pydantic import BaseModel

from ..core.firebase import verify_id_token


class FirebaseUser(BaseModel):
    """
    Decoded Firebase user from ID token.

    This becomes the @user context in guard expressions.
    """

    uid: str
    email: Optional[str] = None
    email_verified: bool = False
    name: Optional[str] = None
    picture: Optional[str] = None
    # Custom claims (e.g., role, permissions)
    role: Optional[str] = None
    # Raw claims for accessing any custom data
    claims: dict = {}

    @classmethod
    def from_decoded_token(cls, decoded: dict) -> "FirebaseUser":
        """Create FirebaseUser from decoded Firebase token."""
        return cls(
            uid=decoded.get("uid", ""),
            email=decoded.get("email"),
            email_verified=decoded.get("email_verified", False),
            name=decoded.get("name"),
            picture=decoded.get("picture"),
            role=decoded.get("role"),  # Custom claim
            claims=decoded,
        )


async def get_current_user(
    authorization: Annotated[str | None, Header()] = None
) -> FirebaseUser:
    """
    FastAPI dependency to get the current authenticated user.

    Extracts Bearer token from Authorization header and verifies it.

    Usage:
        @router.post("/events/{event}")
        async def handle_event(user: FirebaseUser = Depends(get_current_user)):
            # user is now available for @user bindings
            pass

    Raises:
        HTTPException 401: If no token or invalid token
    """
    if not authorization:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authorization header missing",
            headers={"WWW-Authenticate": "Bearer"},
        )

    if not authorization.startswith("Bearer "):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authorization header must start with 'Bearer '",
            headers={"WWW-Authenticate": "Bearer"},
        )

    token = authorization[7:]  # Remove "Bearer " prefix

    try:
        decoded = verify_id_token(token)
        return FirebaseUser.from_decoded_token(decoded)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Invalid or expired token: {str(e)}",
            headers={"WWW-Authenticate": "Bearer"},
        )


async def get_optional_user(
    authorization: Annotated[str | None, Header()] = None
) -> Optional[FirebaseUser]:
    """
    FastAPI dependency to get the current user if authenticated.

    Returns None if no token provided (for public endpoints).

    Usage:
        @router.post("/events/{event}")
        async def handle_event(user: Optional[FirebaseUser] = Depends(get_optional_user)):
            if user:
                # Authenticated user
            else:
                # Anonymous access
    """
    if not authorization or not authorization.startswith("Bearer "):
        return None

    token = authorization[7:]

    try:
        decoded = verify_id_token(token)
        return FirebaseUser.from_decoded_token(decoded)
    except Exception:
        return None


def require_auth(user: FirebaseUser = Depends(get_current_user)) -> FirebaseUser:
    """
    Alias for get_current_user for clearer intent.

    Usage:
        @router.post("/admin/action")
        async def admin_action(user: FirebaseUser = Depends(require_auth)):
            pass
    """
    return user
