from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import Optional

from app.database import get_db
from models.all_models import World, Product
from schemas.all_schemas import WorldOut

router = APIRouter()


@router.get("", response_model=list[WorldOut])
def list_worlds(db: Session = Depends(get_db)):
    worlds = db.query(World).filter(World.is_active == True).order_by(World.sort_order).all()
    result = []
    for w in worlds:
        count = db.query(Product).filter(Product.world_id == w.id, Product.is_active == True).count()
        world_out = WorldOut(
            id=w.id,
            slug=w.slug,
            name=w.name,
            description=w.description,
            tagline=w.tagline,
            image_url=w.image_url,
            artwork_url=w.artwork_url,
            accent_color=w.accent_color,
            sort_order=w.sort_order,
            is_active=w.is_active,
            product_count=count,
            created_at=w.created_at,
            updated_at=w.updated_at,
        )
        result.append(world_out)
    return result


@router.get("/{slug}", response_model=WorldOut)
def get_world(slug: str, db: Session = Depends(get_db)):
    world = db.query(World).filter(World.slug == slug, World.is_active == True).first()
    if not world:
        raise HTTPException(status_code=404, detail="World not found")
    count = db.query(Product).filter(Product.world_id == world.id, Product.is_active == True).count()
    return WorldOut(
        id=world.id,
        slug=world.slug,
        name=world.name,
        description=world.description,
        tagline=world.tagline,
        image_url=world.image_url,
        artwork_url=world.artwork_url,
        accent_color=world.accent_color,
        sort_order=world.sort_order,
        is_active=world.is_active,
        product_count=count,
        created_at=world.created_at,
        updated_at=world.updated_at,
    )
