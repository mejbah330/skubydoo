from datetime import datetime
from typing import Optional
from uuid import UUID
from pydantic import BaseModel, EmailStr


# --- World ---
class WorldBase(BaseModel):
    slug: str
    name: str
    description: Optional[str] = None
    tagline: Optional[str] = None
    image_url: Optional[str] = None
    artwork_url: Optional[str] = None
    accent_color: str = "#D4AF37"
    sort_order: int = 0


class WorldOut(WorldBase):
    id: UUID
    is_active: bool
    product_count: int = 0
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}


# --- Product Variation ---
class VariationBase(BaseModel):
    color: str
    color_hex: Optional[str] = None
    size: str
    stock: int = 0
    sku: Optional[str] = None


class VariationOut(VariationBase):
    id: UUID
    product_id: UUID
    is_active: bool

    model_config = {"from_attributes": True}


# --- Product ---
class ProductBase(BaseModel):
    world_id: UUID
    name: str
    slug: str
    edition_number: Optional[str] = None
    description: Optional[str] = None
    story: Optional[str] = None
    price: float
    compare_at_price: Optional[float] = None
    category: str = "t-shirt"
    tags: list[str] = []
    images: list[str] = []
    video_url: Optional[str] = None
    model_360_url: Optional[str] = None
    fabric_details: Optional[str] = None
    is_drop: bool = False
    is_limited: bool = False
    is_secret: bool = False
    secret_code: Optional[str] = None
    total_edition_size: int = 100


class ProductOut(ProductBase):
    id: UUID
    is_active: bool
    total_sold: int = 0
    remaining: int = 0
    variations: list[VariationOut] = []
    world_name: Optional[str] = None
    world_slug: Optional[str] = None
    created_at: datetime

    model_config = {"from_attributes": True}


# --- OrderItem ---
class OrderItemIn(BaseModel):
    product_id: UUID
    variation_id: UUID
    product_name: str
    color: str
    size: str
    quantity: int = 1
    unit_price: float
    total_price: float


class OrderItemOut(OrderItemIn):
    id: UUID

    model_config = {"from_attributes": True}


# --- Order ---
class OrderIn(BaseModel):
    customer_name: str
    customer_email: EmailStr
    customer_phone: Optional[str] = None
    shipping_address: dict
    payment_method: str = "cash_on_delivery"
    items: list[OrderItemIn]


class OrderOut(BaseModel):
    id: UUID
    order_number: str
    status: str
    customer_name: str
    customer_email: str
    customer_phone: Optional[str] = None
    shipping_address: dict
    payment_method: str
    subtotal: float
    shipping_cost: float
    tax: float
    total: float
    certificate_number: Optional[str] = None
    notes: Optional[str] = None
    items: list[OrderItemOut] = []
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}


# --- Certificate ---
class CertificateOut(BaseModel):
    certificate_number: str
    product_name: Optional[str] = None
    edition_number: Optional[str] = None
    issued_at: datetime

    model_config = {"from_attributes": True}


# --- User ---
class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserCreate(BaseModel):
    email: EmailStr
    username: str
    password: str
    full_name: Optional[str] = None


class UserOut(BaseModel):
    id: UUID
    email: str
    username: str
    full_name: Optional[str] = None
    role: str
    is_active: bool

    model_config = {"from_attributes": True}


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


# --- Vault ---
class VaultItemBase(BaseModel):
    product_id: UUID
    release_date: datetime
    edition_size: int
    sold_out_date: Optional[datetime] = None
    designer_notes: Optional[str] = None
    highlight: bool = False


class VaultItemOut(VaultItemBase):
    id: UUID
    product_name: Optional[str] = None
    product_image: Optional[str] = None
    created_at: datetime

    model_config = {"from_attributes": True}


# --- Drop ---
class DropBase(BaseModel):
    product_id: UUID
    name: str
    teaser_description: Optional[str] = None
    teaser_image_url: Optional[str] = None
    drop_date: datetime


class DropOut(DropBase):
    id: UUID
    is_active: bool
    notify_count: int
    created_at: datetime

    model_config = {"from_attributes": True}


class WaitlistIn(BaseModel):
    drop_id: UUID
    email: EmailStr


# --- Community ---
class CommunityPostIn(BaseModel):
    user_name: str
    user_email: Optional[EmailStr] = None
    image_url: str
    caption: Optional[str] = None


class CommunityPostOut(CommunityPostIn):
    id: UUID
    upvotes: int
    downvotes: int
    is_approved: bool
    created_at: datetime

    model_config = {"from_attributes": True}


class DesignVoteOut(BaseModel):
    id: UUID
    design_name: str
    description: Optional[str] = None
    image_url: Optional[str] = None
    votes: int
    is_active: bool
    created_at: datetime

    model_config = {"from_attributes": True}


# --- Analytics ---
class AnalyticsOverview(BaseModel):
    total_revenue: float
    total_orders: int
    total_visitors: int
    conversion_rate: float
    top_products: list[dict]
    top_sizes: list[dict]
    monthly_trend: list[dict]
    inventory_value: float
