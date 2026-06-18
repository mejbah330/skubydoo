from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import get_settings
from app.database import engine, Base

settings = get_settings()

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    docs_url="/api/docs",
    redoc_url="/api/redoc",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/health")
def health():
    return {"status": "ok", "brand": "SKUBYDOO"}


from routers import auth, worlds, products, orders, admin, vault, community, drops, analytics  # noqa: E402

app.include_router(auth.router, prefix="/api/auth", tags=["Auth"])
app.include_router(worlds.router, prefix="/api/worlds", tags=["Worlds"])
app.include_router(products.router, prefix="/api/products", tags=["Products"])
app.include_router(orders.router, prefix="/api/orders", tags=["Orders"])
app.include_router(admin.router, prefix="/api/admin", tags=["Admin"])
app.include_router(vault.router, prefix="/api/vault", tags=["Vault"])
app.include_router(community.router, prefix="/api/community", tags=["Community"])
app.include_router(drops.router, prefix="/api/drops", tags=["Drops"])
app.include_router(analytics.router, prefix="/api/analytics", tags=["Analytics"])
