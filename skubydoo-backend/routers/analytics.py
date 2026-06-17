from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import datetime, timedelta

from app.database import get_db
from models.all_models import Order, OrderItem, Product, ProductVariation, SiteVisit
from schemas.all_schemas import AnalyticsOverview

router = APIRouter()


@router.get("/overview", response_model=AnalyticsOverview)
def overview(db: Session = Depends(get_db)):
    now = datetime.utcnow()
    thirty_days_ago = now - timedelta(days=30)

    total_revenue = db.query(func.coalesce(func.sum(Order.total), 0)).filter(
        Order.status.in_(["confirmed", "printing", "packed", "shipped", "delivered"])
    ).scalar() or 0.0

    total_orders = db.query(func.count(Order.id)).scalar() or 0

    total_visitors = db.query(func.count(SiteVisit.id)).scalar() or 0

    visitors_30d = db.query(func.count(SiteVisit.id)).filter(
        SiteVisit.created_at >= thirty_days_ago
    ).scalar() or 0
    orders_30d = db.query(func.count(Order.id)).filter(
        Order.created_at >= thirty_days_ago
    ).scalar() or 0
    conversion_rate = round((orders_30d / max(visitors_30d, 1)) * 100, 2)

    top_products_raw = db.query(
        OrderItem.product_name,
        func.sum(OrderItem.quantity).label("total_qty"),
        func.sum(OrderItem.total_price).label("total_rev"),
    ).join(Order).filter(Order.status.in_(["confirmed", "printing", "packed", "shipped", "delivered"])).group_by(
        OrderItem.product_name
    ).order_by(func.sum(OrderItem.total_price).desc()).limit(5).all()

    top_products = [
        {"name": p[0], "quantity": int(p[1]), "revenue": float(p[2])}
        for p in top_products_raw
    ]

    top_sizes_raw = db.query(
        OrderItem.size,
        func.sum(OrderItem.quantity).label("total_qty"),
    ).join(Order).filter(Order.status.in_(["confirmed", "printing", "packed", "shipped", "delivered"])).group_by(
        OrderItem.size
    ).order_by(func.sum(OrderItem.quantity).desc()).all()

    top_sizes = [
        {"size": s[0], "quantity": int(s[1])}
        for s in top_sizes_raw
    ]

    monthly_trend = []
    for i in range(6):
        month_start = now.replace(day=1) - timedelta(days=30 * i)
        month_label = month_start.strftime("%Y-%m")
        revenue = db.query(func.coalesce(func.sum(Order.total), 0)).filter(
            func.date_trunc("month", Order.created_at) == func.date_trunc("month", month_start),
            Order.status.in_(["confirmed", "printing", "packed", "shipped", "delivered"]),
        ).scalar() or 0
        orders_count = db.query(func.count(Order.id)).filter(
            func.date_trunc("month", Order.created_at) == func.date_trunc("month", month_start),
        ).scalar() or 0
        monthly_trend.append({"month": month_label, "revenue": float(revenue), "orders": orders_count})

    monthly_trend.reverse()

    variations = db.query(ProductVariation).filter(ProductVariation.is_active == True).all()
    inventory_value = sum(v.stock * (v.product.price if v.product else 0) for v in variations)

    return AnalyticsOverview(
        total_revenue=float(total_revenue),
        total_orders=total_orders,
        total_visitors=total_visitors,
        conversion_rate=conversion_rate,
        top_products=top_products,
        top_sizes=top_sizes,
        monthly_trend=monthly_trend,
        inventory_value=float(inventory_value),
    )
