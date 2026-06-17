import uuid
from datetime import datetime
from sqlalchemy import Column, String, Integer, Float, Boolean, DateTime, ForeignKey, Text, Enum as SAEnum, JSON
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

from app.database import Base


class World(Base):
    __tablename__ = "worlds"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    slug = Column(String(50), unique=True, nullable=False, index=True)
    name = Column(String(100), nullable=False)
    description = Column(Text, nullable=True)
    tagline = Column(String(200), nullable=True)
    image_url = Column(String(500), nullable=True)
    artwork_url = Column(String(500), nullable=True)
    accent_color = Column(String(7), default="#D4AF37")
    sort_order = Column(Integer, default=0)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    products = relationship("Product", back_populates="world", lazy="selectin")


class Product(Base):
    __tablename__ = "products"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    world_id = Column(UUID(as_uuid=True), ForeignKey("worlds.id"), nullable=False)
    name = Column(String(200), nullable=False)
    slug = Column(String(200), unique=True, nullable=False, index=True)
    edition_number = Column(String(20), unique=True, nullable=True)
    description = Column(Text, nullable=True)
    story = Column(Text, nullable=True)
    price = Column(Float, nullable=False)
    compare_at_price = Column(Float, nullable=True)
    category = Column(String(50), default="t-shirt")
    tags = Column(JSON, default=list)
    images = Column(JSON, default=list)
    video_url = Column(String(500), nullable=True)
    model_360_url = Column(String(500), nullable=True)
    fabric_details = Column(Text, nullable=True)
    is_drop = Column(Boolean, default=False)
    is_limited = Column(Boolean, default=False)
    is_secret = Column(Boolean, default=False)
    secret_code = Column(String(50), nullable=True)
    is_active = Column(Boolean, default=True)
    total_edition_size = Column(Integer, default=100)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    world = relationship("World", back_populates="products")
    variations = relationship("ProductVariation", back_populates="product", cascade="all, delete-orphan", lazy="selectin")
    vault_items = relationship("VaultItem", back_populates="product", lazy="selectin")


class ProductVariation(Base):
    __tablename__ = "product_variations"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    product_id = Column(UUID(as_uuid=True), ForeignKey("products.id"), nullable=False, index=True)
    color = Column(String(50), nullable=False)
    color_hex = Column(String(7), nullable=True)
    size = Column(String(10), nullable=False)
    stock = Column(Integer, default=0)
    sku = Column(String(100), unique=True, nullable=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    product = relationship("Product", back_populates="variations")


class Order(Base):
    __tablename__ = "orders"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    order_number = Column(String(20), unique=True, nullable=False, index=True)
    status = Column(String(20), default="pending", index=True)  # pending, confirmed, printing, packed, shipped, delivered, returned, cancelled
    customer_name = Column(String(200), nullable=False)
    customer_email = Column(String(200), nullable=False)
    customer_phone = Column(String(50), nullable=True)
    shipping_address = Column(JSON, nullable=False)
    payment_method = Column(String(20), default="cash_on_delivery")
    subtotal = Column(Float, nullable=False)
    shipping_cost = Column(Float, default=0.0)
    tax = Column(Float, default=0.0)
    total = Column(Float, nullable=False)
    certificate_number = Column(String(30), unique=True, nullable=True)
    notes = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    items = relationship("OrderItem", back_populates="order", cascade="all, delete-orphan", lazy="selectin")
    timeline = relationship("OrderTimeline", back_populates="order", cascade="all, delete-orphan", lazy="selectin")


class OrderItem(Base):
    __tablename__ = "order_items"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    order_id = Column(UUID(as_uuid=True), ForeignKey("orders.id"), nullable=False, index=True)
    product_id = Column(UUID(as_uuid=True), ForeignKey("products.id"), nullable=False)
    variation_id = Column(UUID(as_uuid=True), ForeignKey("product_variations.id"), nullable=False)
    product_name = Column(String(200), nullable=False)
    color = Column(String(50), nullable=False)
    size = Column(String(10), nullable=False)
    quantity = Column(Integer, default=1)
    unit_price = Column(Float, nullable=False)
    total_price = Column(Float, nullable=False)

    order = relationship("Order", back_populates="items")


class OrderTimeline(Base):
    __tablename__ = "order_timeline"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    order_id = Column(UUID(as_uuid=True), ForeignKey("orders.id"), nullable=False, index=True)
    status = Column(String(20), nullable=False)
    note = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    order = relationship("Order", back_populates="timeline")


class User(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email = Column(String(200), unique=True, nullable=False, index=True)
    username = Column(String(100), unique=True, nullable=False)
    hashed_password = Column(String(200), nullable=False)
    full_name = Column(String(200), nullable=True)
    role = Column(String(20), default="customer")  # customer, admin
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


class Certificate(Base):
    __tablename__ = "certificates"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    certificate_number = Column(String(30), unique=True, nullable=False, index=True)
    order_id = Column(UUID(as_uuid=True), ForeignKey("orders.id"), nullable=True)
    product_id = Column(UUID(as_uuid=True), ForeignKey("products.id"), nullable=False)
    edition_number = Column(String(20), nullable=True)
    issued_at = Column(DateTime, default=datetime.utcnow)


class VaultItem(Base):
    __tablename__ = "vault_items"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    product_id = Column(UUID(as_uuid=True), ForeignKey("products.id"), nullable=False)
    release_date = Column(DateTime, nullable=False)
    edition_size = Column(Integer, nullable=False)
    sold_out_date = Column(DateTime, nullable=True)
    designer_notes = Column(Text, nullable=True)
    highlight = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    product = relationship("Product", back_populates="vault_items")


class Drop(Base):
    __tablename__ = "drops"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    product_id = Column(UUID(as_uuid=True), ForeignKey("products.id"), nullable=False)
    name = Column(String(200), nullable=False)
    teaser_description = Column(Text, nullable=True)
    teaser_image_url = Column(String(500), nullable=True)
    drop_date = Column(DateTime, nullable=False)
    is_active = Column(Boolean, default=True)
    notify_count = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)


class WaitlistEntry(Base):
    __tablename__ = "waitlist_entries"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    drop_id = Column(UUID(as_uuid=True), ForeignKey("drops.id"), nullable=False, index=True)
    email = Column(String(200), nullable=False)
    notified = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)


class CommunityPost(Base):
    __tablename__ = "community_posts"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_name = Column(String(200), nullable=False)
    user_email = Column(String(200), nullable=True)
    image_url = Column(String(500), nullable=False)
    caption = Column(Text, nullable=True)
    upvotes = Column(Integer, default=0)
    downvotes = Column(Integer, default=0)
    is_approved = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)


class DesignVote(Base):
    __tablename__ = "design_votes"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    design_name = Column(String(200), nullable=False)
    description = Column(Text, nullable=True)
    image_url = Column(String(500), nullable=True)
    votes = Column(Integer, default=0)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)


class SiteVisit(Base):
    __tablename__ = "site_visits"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    path = Column(String(500), nullable=False)
    ip_address = Column(String(50), nullable=True)
    user_agent = Column(String(500), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
