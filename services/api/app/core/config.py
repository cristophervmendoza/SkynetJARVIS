from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    app_name: str = "Nexa AI Workspace API"
    app_version: str = "0.1.0"
    debug: bool = True

    database_url: str = "postgresql+asyncpg://postgres:postgres@localhost:5432/nexa"
    redis_url: str = "redis://localhost:6379/0"

    secret_key: str = "change-this-in-production"
    access_token_expire_minutes: int = 60 * 24
    algorithm: str = "HS256"

    openai_api_key: str = ""
    anthropic_api_key: str = ""
    google_api_key: str = ""
    grok_api_key: str = ""

    stripe_secret_key: str = ""
    stripe_webhook_secret: str = ""

    sentry_dsn: str = ""

    cors_origins: list[str] = ["http://localhost:3000"]

    class Config:
        env_file = ".env"
        case_sensitive = False


settings = Settings()
