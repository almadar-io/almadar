"""
Firebase Admin SDK Configuration

Supports multiple initialization modes:
- Emulator mode (FIRESTORE_EMULATOR_HOST)
- Service account file (FIREBASE_SERVICE_ACCOUNT_PATH)
- Inline credentials (FIREBASE_PROJECT_ID + CLIENT_EMAIL + PRIVATE_KEY)
- Application default credentials (Cloud Run, etc.)
"""
import os
from typing import Optional
import firebase_admin
from firebase_admin import credentials, auth, firestore


_app: Optional[firebase_admin.App] = None


def _get_env(key: str, default: str = "") -> str:
    """Get environment variable with default."""
    return os.environ.get(key, default)


def initialize_firebase() -> firebase_admin.App:
    """
    Initialize Firebase Admin SDK.

    Returns the Firebase app instance, initializing if needed.
    """
    global _app

    if _app is not None:
        return _app

    # Check if already initialized
    if firebase_admin._apps:
        _app = firebase_admin.get_app()
        return _app

    project_id = _get_env("FIREBASE_PROJECT_ID", "demo-project")
    emulator_host = _get_env("FIRESTORE_EMULATOR_HOST")
    service_account_path = _get_env("FIREBASE_SERVICE_ACCOUNT_PATH")
    client_email = _get_env("FIREBASE_CLIENT_EMAIL")
    private_key = _get_env("FIREBASE_PRIVATE_KEY")

    # Check for emulator mode FIRST (no credentials needed)
    if emulator_host:
        _app = firebase_admin.initialize_app(options={"projectId": project_id})
        print(f"Firebase Admin initialized for emulator: {emulator_host}")
        return _app

    # Production mode - need credentials
    if service_account_path:
        # Use service account file
        cred = credentials.Certificate(service_account_path)
        _app = firebase_admin.initialize_app(cred, {"projectId": project_id})
    elif project_id and client_email and private_key:
        # Use inline service account credentials
        cred = credentials.Certificate(
            {
                "type": "service_account",
                "project_id": project_id,
                "client_email": client_email,
                "private_key": private_key.replace("\\n", "\n"),
                # These are required but can be empty for auth verification
                "private_key_id": "",
                "client_id": "",
                "auth_uri": "https://accounts.google.com/o/oauth2/auth",
                "token_uri": "https://oauth2.googleapis.com/token",
            }
        )
        _app = firebase_admin.initialize_app(cred, {"projectId": project_id})
    elif project_id:
        # Use application default credentials (for Cloud Run, etc.)
        _app = firebase_admin.initialize_app(
            credentials.ApplicationDefault(), {"projectId": project_id}
        )
    else:
        # Fallback to demo project (emulator-like mode)
        _app = firebase_admin.initialize_app(options={"projectId": "demo-project"})

    return _app


def get_auth() -> auth.Client:
    """Get Firebase Auth client."""
    initialize_firebase()
    return auth


def get_firestore() -> firestore.Client:
    """Get Firestore client."""
    initialize_firebase()
    return firestore.client()


def verify_id_token(token: str) -> dict:
    """
    Verify a Firebase ID token.

    Args:
        token: The Firebase ID token to verify

    Returns:
        Decoded token claims including uid, email, etc.

    Raises:
        firebase_admin.auth.InvalidIdTokenError: If token is invalid
        firebase_admin.auth.ExpiredIdTokenError: If token is expired
    """
    initialize_firebase()
    return auth.verify_id_token(token)
