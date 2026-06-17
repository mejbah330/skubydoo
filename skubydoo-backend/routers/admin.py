from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import Optional
from datetime import datetime
from uuid import UUID

from app.database import get_db
from routers.auth import require_admin
from models.all_models import (
    World, Product, ProductVariation, Order, OrderItem, OrderTimeline,
    User, Certificate, VaultItem, Drop, CommunityPost, DesignVote,
)
from schemas.all_schemas import (
    WorldBase, ProductBase, VariationBase, VaultItemBase, DropBase,
    DesignVoteOut,
)

router = APIRouter()

# --- Worlds CRUD ---
@router.post("/worlds", status_code=201)
def create_world(payload: WorldBase, db: Session = Depends(get_db), _=Depends(require_admin)):
    world = World(**payload.model_dump())
    db.add(world)
    db.commit()
    db.refresh(world)
    return {"id": str(world.id), "slug": world.slug}


@router.put("/worlds/{world_id}")
def update_world(world_id: UUID, payload: WorldBase, db: Session = Depends(get_db), _=Depends(require_admin)):
    world = db.query(World).filter(World.id == world_id).first()
    if not world:
        raise HTTPException(status_code=404, detail="World not found")
    for k, v in payload.model_dump().items():
        setattr(world, k, v)
    db.commit()
    return {"updated": True}


@router.delete("/worlds/{world_id}")
def delete_world(world_id: UUID, db: Session = Depends(get_db), _=Depends(require_admin)):
    world = db.query(World).filter(World.id == world_id).first()
    if not world:
        raise HTTPException(status_code=404)
    world.is_active = False
    db.commit()
    return {"deleted": True}


# --- Products CRUD ---
@router.post("/products", status_code=201)
def create_product(payload: ProductBase, db: Session = Depends(get_db), _=Depends(require_admin)):
    product = Product(**payload.model_dump())
    db.add(product)
    db.commit()
    db.refresh(product)
    return {"id": str(product.id), "slug": product.slug}


@router.put("/products/{product_id}")
def update_product(product_id: UUID, payload: ProductBase, db: Session = Depends(get_db), _=Depends(require_admin)):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404)
    for k, v in payload.model_dump().items():
        setattr(product, k, v)
    db.commit()
    return {"updated": True}


@router.delete("/products/{product_id}")
def delete_product(product_id: UUID, db: Session = Depends(get_db), _=Depends(require_admin)):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404)
    product.is_active = False
    db.commit()
    return {"deleted": True}


# --- Variations ---
@router.post("/products/{product_id}/variations", status_code=201)
def add_variation(product_id: UUID, payload: VariationBase, db: Session = Depends(get_db), _=Depends(require_admin)):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404)
    var = ProductVariation(product_id=product_id, **payload.model_dump())
    db.add(var)
    db.commit()
    return {"id": str(var.id)}


@router.put("/variations/{variation_id}")
def update_variation(variation_id: UUID, stock: int = Query(...), db: Session = Depends(get_db), _=Depends(require_admin)):
    var = db.query(ProductVariation).filter(ProductVariation.id == variation_id).first()
    if not var:
        raise HTTPException(status_code=404)
    var.stock = stock
    db.commit()
    return {"stock": var.stock}


# --- Orders ---
@router.get("/orders", response_model=list)
def admin_list_orders(
    status: Optional[str] = None,
    limit: int = Query(50, le=200),
    offset: int = Query(0),
    db: Session = Depends(get_db),
    _=Depends(require_admin),
):
    query = db.query(Order)
    if status:
        query = query.filter(Order.status == status)
    orders = query.order_by(Order.created_at.desc()).offset(offset).limit(limit).all()
    return [
        {
            "id": str(o.id),
            "order_number": o.order_number,
            "status": o.status,
            "customer_name": o.customer_name,
            "total": o.total,
            "created_at": o.created_at.isoformat(),
        }
        for o in orders
    ]


@router.put("/orders/{order_id}/status")
def update_order_status(
    order_id: UUID,
    status: str = Query(...),
    note: Optional[str] = None,
    db: Session = Depends(get_db),
    _=Depends(require_admin),
):
    valid = ["pending", "confirmed", "printing", "packed", "shipped", "delivered", "returned", "cancelled"]
    if status not in valid:
        raise HTTPException(status_code=400, detail=f"Invalid status. Must be one of: {valid}")
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404)
    order.status = status
    db.add(OrderTimeline(order_id=order_id, status=status, note=note))
    db.commit()
    return {"status": order.status}


# --- Vault ---
@router.post("/vault", status_code=201)
def add_to_vault(payload: VaultItemBase, db: Session = Depends(get_db), _=Depends(require_admin)):
    item = VaultItem(**payload.model_dump())
    db.add(item)
    db.commit()
    return {"id": str(item.id)}


# --- Drops ---
@router.post("/drops", status_code=201)
def create_drop(payload: DropBase, db: Session = Depends(get_db), _=Depends(require_admin)):
    drop = Drop(**payload.model_dump())
    db.add(drop)
    db.commit()
    return {"id": str(drop.id)}


# --- Community Moderation ---
@router.put("/community/posts/{post_id}/approve")
def approve_post(post_id: UUID, db: Session = Depends(get_db), _=Depends(require_admin)):
    post = db.query(CommunityPost).filter(CommunityPost.id == post_id).first()
    if not post:
        raise HTTPException(status_code=404)
    post.is_approved = True
    db.commit()
    return {"approved": True}


@router.delete("/community/posts/{post_id}")
def delete_post(post_id: UUID, db: Session = Depends(get_db), _=Depends(require_admin)):
    post = db.query(CommunityPost).filter(CommunityPost.id == post_id).first()
    if not post:
        raise HTTPException(status_code=404)
    db.delete(post)
    db.commit()
    return {"deleted": True}


# --- Design Votes ---
@router.get("/design-votes", response_model=list[DesignVoteOut])
def admin_design_votes(db: Session = Depends(get_db), _=Depends(require_admin)):
    return db.query(DesignVote).order_by(DesignVote.votes.desc()).all()


# --- Users ---
@router.get("/users")
def list_users(db: Session = Depends(get_db), _=Depends(require_admin)):
    users = db.query(User).all()
    return [{"id": str(u.id), "email": u.email, "username": u.username, "role": u.role, "is_active": u.is_active} for u in users]
