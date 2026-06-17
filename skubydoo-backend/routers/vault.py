from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import Optional

from app.database import get_db
from models.all_models import VaultItem, Product
from schemas.all_schemas import VaultItemOut

router = APIRouter()


@router.get("", response_model=list[VaultItemOut])
def list_vault(db: Session = Depends(get_db)):
    items = db.query(VaultItem).order_by(VaultItem.release_date.desc()).all()
    result = []
    for v in items:
        product = db.query(Product).filter(Product.id == v.product_id).first()
        result.append(VaultItemOut(
            id=v.id,
            product_id=v.product_id,
            release_date=v.release_date,
            edition_size=v.edition_size,
            sold_out_date=v.sold_out_date,
            designer_notes=v.designer_notes,
            highlight=v.highlight,
            product_name=product.name if product else None,
            product_image=(product.images[0] if product and product.images else None),
            created_at=v.created_at,
        ))
    return result
