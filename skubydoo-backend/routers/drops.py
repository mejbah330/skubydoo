from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from datetime import datetime
from typing import Optional

from app.database import get_db
from models.all_models import Drop, WaitlistEntry, Product
from schemas.all_schemas import DropOut, WaitlistIn

router = APIRouter()


@router.get("/upcoming", response_model=list[DropOut])
def upcoming_drops(db: Session = Depends(get_db)):
    now = datetime.utcnow()
    drops = db.query(Drop).filter(Drop.drop_date > now, Drop.is_active == True).order_by(Drop.drop_date).all()
    return drops


@router.get("/{drop_id}", response_model=DropOut)
def get_drop(drop_id: str, db: Session = Depends(get_db)):
    drop = db.query(Drop).filter(Drop.id == drop_id).first()
    if not drop:
        raise HTTPException(status_code=404, detail="Drop not found")
    return drop


@router.post("/notify", status_code=201)
def notify_me(payload: WaitlistIn, db: Session = Depends(get_db)):
    drop = db.query(Drop).filter(Drop.id == payload.drop_id).first()
    if not drop:
        raise HTTPException(status_code=404, detail="Drop not found")

    existing = db.query(WaitlistEntry).filter(
        WaitlistEntry.drop_id == payload.drop_id,
        WaitlistEntry.email == payload.email,
    ).first()
    if existing:
        return {"message": "Already on waitlist"}

    entry = WaitlistEntry(drop_id=payload.drop_id, email=payload.email)
    db.add(entry)
    drop.notify_count += 1
    db.commit()
    return {"message": "Added to waitlist"}
