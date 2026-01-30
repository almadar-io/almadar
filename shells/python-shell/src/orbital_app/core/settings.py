"""
Application Settings - Environment configuration using pydantic-settings.

Loads configuration from environment variables and .env files.
"""
from typing import List, Optional
from functools import lru_cache
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """
    Application settings loaded from environment variables.

    Environment variables take precedence over .env file values.
    """

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore",
    )

    # Server Configuration
    port: int = 8000
    environment: str = "development"

    # Firebase Configuration
    firebase_project_id: Optional[str] = None
    firebase_client_email: Optional[str] = None
    firebase_private_key: Optional[str] = None
    firebase_service_account_path: Optional[str] = None
    firestore_emulator_host: Optional[str] = None

    # CORS Configuration
    cors_origins: str = "http://localhost:3000,http://localhost:5173"

    # External Service API Keys
    openai_api_key: Optional[str] = None
    anthropic_api_key: Optional[str] = None
    gemini_api_key: Optional[str] = None
    youtube_api_key: Optional[str] = None
    stripe_secret_key: Optional[str] = None

    @property
    def cors_origins_list(self) -> List[str]:
        """Parse CORS origins from comma-separated string."""
        return [origin.strip() for origin in self.cors_origins.split(",")]

    @property
    def is_production(self) -> bool:
        """Check if running in production mode."""
        return self.environment.lower() == "production"

    @property
    def is_development(self) -> bool:
        """Check if running in development mode."""
        return self.environment.lower() == "development"

    @property
    def is_emulator(self) -> bool:
        """Check if using Firebase emulator."""
        return bool(self.firestore_emulator_host)


@lru_cache
def get_settings() -> Settings:
    """
    Get cached settings instance.

    Uses lru_cache to ensure settings are only loaded once.
    """
    return Settings()
