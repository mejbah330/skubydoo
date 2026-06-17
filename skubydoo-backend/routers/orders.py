from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import Optional
from datetime import datetime

from app.database import get_db
from models.all_models import Order, OrderItem, OrderTimeline, Product, ProductVariation, Certificate
from schemas.all_schemas import OrderIn, OrderOut, OrderItemOut, CertificateOut
from services.certificate_service import generate_certificate_number
from services.inventory_service import deduct_stock, restore_stock

router = APIRouter()


@router.post("", response_model=OrderOut, status_code=201)
def create_order(payload: OrderIn, db: Session = Depends(get_db)):
    subtotal = sum(item.total_price for item in payload.items)
    shipping_cost = 199.0 if subtotal < 2999 else 0.0
    total = subtotal + shipping_cost

    order_number = f"SD-{datetime.utcnow().strftime('%Y%m%d')}-{datetime.utcnow().strftime('%H%M%S')}"

    order = Order(
        order_number=order_number,
        customer_name=payload.customer_name,
        customer_email=payload.customer_email,
        customer_phone=payload.customer_phone,
        shipping_address=payload.shipping_address,
        payment_method=payload.payment_method,
        subtotal=subtotal,
        shipping_cost=shipping_cost,
        total=total,
    )
    db.add(order)
    db.flush()

    for item_data in payload.items:
        variation = db.query(ProductVariation).filter(ProductVariation.id == item_data.variation_id).first()
        if not variation:
            raise HTTPException(status_code=400, detail=f"Variation {item_data.variation_id} not found")
        if variation.stock < item_data.quantity:
            raise HTTPException(status_code=400, detail=f"Insufficient stock for {variation.color} {variation.size}")

        order_item = OrderItem(
            order_id=order.id,
            product_id=item_data.product_id,
            variation_id=item_data.variation_id,
            product_name=item_data.product_name,
            color=item_data.color,
            size=item_data.size,
            quantity=item_data.quantity,
            unit_price=item_data.unit_price,
            total_price=item_data.total_price,
        )
        db.add(order_item)
        deduct_stock(db, item_data.variation_id, item_data.quantity)

    db.add(OrderTimeline(order_id=order.id, status="pending", note="Order placed"))

    cert_number = generate_certificate_number(db)
    order.certificate_number = cert_number
    order.status = "confirmed"

    if order.items:
        first_item = order.items[0]
        cert = Certificate(
            certificate_number=cert_number,
            order_id=order.id,
            product_id=first_item.product_id,
            edition_number=None,
        )
        db.add(cert)

    db.add(OrderTimeline(order_id=order.id, status="confirmed", note=f"Certificate {cert_number} issued"))
    db.commit()
    db.refresh(order)

    return OrderOut(
        id=order.id,
        order_number=order.order_number,
        status=order.status,
        customer_name=order.customer_name,
        customer_email=order.customer_email,
        customer_phone=order.customer_phone,
        shipping_address=order.shipping_address,
        payment_method=order.payment_method,
        subtotal=order.subtotal,
        shipping_cost=order.shipping_cost,
        tax=order.tax,
        total=order.total,
        certificate_number=order.certificate_number,
        notes=order.notes,
        items=[OrderItemOut(
            id=oi.id,
            product_id=oi.product_id,
            variation_id=oi.variation_id,
            product_name=oi.product_name,
            color=oi.color,
            size=oi.size,
            quantity=oi.quantity,
            unit_price=oi.unit_price,
            total_price=oi.total_price,
        ) for oi in order.items],
        created_at=order.created_at,
        updated_at=order.updated_at,
    )


@router.get("", response_model=list[OrderOut])
def list_orders(
    email: Optional[str] = Query(None),
    status: Optional[str] = Query(None),
    limit: int = Query(20, le=100),
    offset: int = Query(0),
    db: Session = Depends(get_db),
):
    query = db.query(Order)
    if email:
        query = query.filter(Order.customer_email == email)
    if status:
        query = query.filter(Order.status == status)
    orders = query.order_by(Order.created_at.desc()).offset(offset).limit(limit).all()

    result = []
    for o in orders:
        result.append(OrderOut(
            id=o.id,
            order_number=o.order_number,
            status=o.status,
            customer_name=o.customer_name,
            customer_email=o.customer_email,
            customer_phone=o.customer_phone,
            shipping_address=o.shipping_address,
            payment_method=o.payment_method,
            subtotal=o.subtotal,
            shipping_cost=o.shipping_cost,
            tax=o.tax,
            total=o.total,
            certificate_number=o.certificate_number,
            notes=o.notes,
            items=[OrderItemOut(
                id=oi.id,
                product_id=oi.product_id,
                variation_id=oi.variation_id,
                product_name=oi.product_name,
                color=oi.color,
                size=oi.size,
                quantity=oi.quantity,
                unit_price=oi.unit_price,
                total_price=oi.total_price,
            ) for oi in o.items],
            created_at=o.created_at,
            updated_at=o.updated_at,
        ))
    return result


@router.get("/{order_number}", response_model=OrderOut)
def get_order(order_number: str, db: Session = Depends(get_db)):
    o = db.query(Order).filter(Order.order_number == order_number).first()
    if not o:
        raise HTTPException(status_code=404, detail="Order not found")
    return OrderOut(
        id=o.id,
        order_number=o.order_number,
        status=o.status,
        customer_name=o.customer_name,
        customer_email=o.customer_email,
        customer_phone=o.customer_phone,
        shipping_address=o.shipping_address,
        payment_method=o.payment_method,
        subtotal=o.subtotal,
        shipping_cost=o.shipping_cost,
        tax=o.tax,
        total=o.total,
        certificate_number=o.certificate_number,
        notes=o.notes,
        items=[OrderItemOut(
            id=oi.id,
            product_id=oi.product_id,
            variation_id=oi.variation_id,
            product_name=oi.product_name,
            color=oi.color,
            size=oi.size,
            quantity=oi.quantity,
            unit_price=oi.unit_price,
            total_price=oi.total_price,
        ) for oi in o.items],
        created_at=o.created_at,
        updated_at=o.updated_at,
    )


@router.get("/certificate/{cert_number}", response_model=CertificateOut)
def verify_certificate(cert_number: str, db: Session = Depends(get_db)):
    cert = db.query(Certificate).filter(Certificate.certificate_number == cert_number).first()
    if not cert:
        raise HTTPException(status_code=404, detail="Certificate not found")
    product = db.query(Product).filter(Product.id == cert.product_id).first()
    return CertificateOut(
        certificate_number=cert.certificate_number,
        product_name=product.name if product else None,
        edition_number=product.edition_number if product else None,
        issued_at=cert.issued_at,
    )
