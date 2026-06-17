from sqlalchemy.orm import Session
from fastapi import HTTPException
from models.all_models import ProductVariation


def deduct_stock(db: Session, variation_id: str, quantity: int) -> None:
    var = db.query(ProductVariation).filter(ProductVariation.id == variation_id).first()
    if not var:
        raise HTTPException(status_code=400, detail="Variation not found")
    if var.stock < quantity:
        raise HTTPException(status_code=400, detail=f"Insufficient stock for {var.color} {var.size}")
    var.stock -= quantity


def restore_stock(db: Session, variation_id: str, quantity: int) -> None:
    var = db.query(ProductVariation).filter(ProductVariation.id == variation_id).first()
    if var:
        var.stock += quantity
