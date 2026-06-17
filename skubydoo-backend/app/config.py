from pydantic_settings import BaseSettings
from functools import lru_cache


class Settings(BaseSettings):
    PROJECT_NAME: str = "ShubyDoo API"
    VERSION: str = "1.0.0"
    DEBUG: bool = True

    DATABASE_URL: str = "sqlite:///./skubydoo.db"
    REDIS_URL: str = "redis://localhost:6379/0"

    SECRET_KEY: str = "skubydoo-jwt-secret-change-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60

    S3_ENDPOINT: str = "http://localhost:9000"
    S3_ACCESS_KEY: str = "minioadmin"
    S3_SECRET_KEY: str = "minioadmin"
    S3_BUCKET: str = "skubydoo"
    S3_REGION: str = "us-east-1"

    OPENAI_API_KEY: str = ""

    ALLOWED_ORIGINS: list[str] = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ]

    model_config = {"env_file": ".env", "extra": "allow"}


@lru_cache()
def get_settings() -> Settings:
    return Settings()
