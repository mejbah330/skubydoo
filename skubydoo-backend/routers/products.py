from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import Optional

from app.database import get_db
from models.all_models import Product, ProductVariation, World
from schemas.all_schemas import ProductOut, VariationOut

router = APIRouter()


def build_product_out(product: Product, db: Session) -> ProductOut:
    total_sold = product.total_edition_size - sum(v.stock for v in product.variations if v.is_active)
    return ProductOut(
        id=product.id,
        world_id=product.world_id,
        name=product.name,
        slug=product.slug,
        edition_number=product.edition_number,
        description=product.description,
        story=product.story,
        price=product.price,
        compare_at_price=product.compare_at_price,
        category=product.category,
        tags=product.tags or [],
        images=product.images or [],
        video_url=product.video_url,
        model_360_url=product.model_360_url,
        fabric_details=product.fabric_details,
        is_drop=product.is_drop,
        is_limited=product.is_limited,
        is_secret=product.is_secret,
        secret_code=product.secret_code,
        total_edition_size=product.total_edition_size,
        is_active=product.is_active,
        total_sold=total_sold,
        remaining=product.total_edition_size - total_sold,
        variations=[VariationOut(
            id=v.id,
            product_id=v.product_id,
            color=v.color,
            color_hex=v.color_hex,
            size=v.size,
            stock=v.stock,
            sku=v.sku,
            is_active=v.is_active,
        ) for v in product.variations if v.is_active],
        world_name=product.world.name if product.world else None,
        world_slug=product.world.slug if product.world else None,
        created_at=product.created_at,
    )


@router.get("", response_model=list[ProductOut])
def list_products(
    world_slug: Optional[str] = Query(None),
    is_drop: Optional[bool] = Query(None),
    is_secret: Optional[bool] = Query(None),
    secret_code: Optional[str] = Query(None),
    search: Optional[str] = Query(None),
    limit: int = Query(20, le=100),
    offset: int = Query(0),
    db: Session = Depends(get_db),
):
    query = db.query(Product).filter(Product.is_active == True)

    if world_slug:
        world = db.query(World).filter(World.slug == world_slug).first()
        if world:
            query = query.filter(Product.world_id == world.id)
    if is_drop is not None:
        query = query.filter(Product.is_drop == is_drop)
    if is_secret is not None:
        query = query.filter(Product.is_secret == is_secret)
    if secret_code:
        query = query.filter(Product.secret_code == secret_code)
    if search:
        query = query.filter(Product.name.ilike(f"%{search}%"))

    products = query.order_by(Product.created_at.desc()).offset(offset).limit(limit).all()
    return [build_product_out(p, db) for p in products]


@router.get("/{slug}", response_model=ProductOut)
def get_product(slug: str, secret_code: Optional[str] = Query(None), db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.slug == slug, Product.is_active == True).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    if product.is_secret and product.secret_code and product.secret_code != secret_code:
        raise HTTPException(status_code=403, detail="Secret code required")
    return build_product_out(product, db)


@router.get("/edition/{edition_number}", response_model=ProductOut)
def get_by_edition(edition_number: str, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.edition_number == edition_number, Product.is_active == True).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return build_product_out(product, db)
