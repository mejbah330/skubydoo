from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
import redis

from app.config import get_settings

settings = get_settings()

connect_args = {}
if "sqlite" in settings.DATABASE_URL:
    connect_args = {"check_same_thread": False}

engine = create_engine(settings.DATABASE_URL, pool_size=20, max_overflow=0, connect_args=connect_args)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

try:
    redis_client = redis.Redis.from_url(settings.REDIS_URL, decode_responses=True)
    redis_client.ping()
except Exception:
    redis_client = None


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
