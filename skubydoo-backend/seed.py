import sys
sys.path.insert(0, ".")

from app.database import SessionLocal, engine, Base
from models.all_models import (
    World, Product, ProductVariation, Order, OrderItem, OrderTimeline,
    User, Certificate, VaultItem, Drop, CommunityPost, DesignVote,
)
from datetime import datetime, timedelta
import hashlib

Base.metadata.create_all(bind=engine)
db = SessionLocal()

worlds_data = [
    {"slug": "rebel", "name": "REBEL WORLD", "description": "Dark aggressive designs for those who break rules.", "tagline": "Born to defy.", "accent_color": "#FF4444", "sort_order": 0},
    {"slug": "future", "name": "FUTURE WORLD", "description": "Cyberpunk designs from tomorrow's creators.", "tagline": "The future wears us.", "accent_color": "#00D26A", "sort_order": 1},
    {"slug": "legacy", "name": "LEGACY WORLD", "description": "Luxury gold collection. Timeless prestige.", "tagline": "Forever.", "accent_color": "#D4AF37", "sort_order": 2},
    {"slug": "chaos", "name": "CHAOS WORLD", "description": "Experimental limited editions. Unknown territory.", "tagline": "Order from disorder.", "accent_color": "#F4D37A", "sort_order": 3},
]

world_map = {}
for wd in worlds_data:
    world = World(**wd)
    db.add(world)
    db.flush()
    world_map[wd["slug"]] = world

products_data = [
    {"world_slug": "rebel", "name": "Shadow King", "edition_number": "SD-001", "price": 2499, "description": "The rebel's anthem. Dark, raw, and unapologetic.", "story": "Born from midnight creators building dreams while the world sleeps. The Shadow King represents rebellion against fast fashion.", "fabric_details": "280 GSM Premium Combed Cotton. Enzyme washed. Reactive dyed.", "total_edition_size": 100, "is_drop": True, "images": ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80", "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80"]},
    {"world_slug": "future", "name": "Neon Protocol", "edition_number": "SD-002", "price": 2999, "description": "Wired for tomorrow. The intersection of code and cloth.", "story": "When the digital and physical worlds collide. Neon Protocol is the uniform for those building the future.", "fabric_details": "260 GSM Tech Cotton Blend. UV reactive print. Moisture wicking.", "total_edition_size": 75, "is_drop": True, "images": ["https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80", "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80"]},
    {"world_slug": "legacy", "name": "Golden Crown", "edition_number": "SD-003", "price": 4999, "description": "The throne piece. Hand-finished gold detailing.", "story": "Inspired by ancient royalty and modern aristocracy. Each Golden Crown features real gold foil stamping.", "fabric_details": "320 GSM Heavyweight Pima Cotton. Gold foil detail. Hand-finished.", "total_edition_size": 50, "is_drop": True, "images": ["https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80", "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=800&q=80"]},
    {"world_slug": "chaos", "name": "Anomaly X", "edition_number": "SD-004", "price": 3499, "description": "Expect the unexpected. Each piece is uniquely distressed.", "story": "Chaos World's first statement piece. No two are identical. True limited edition.", "fabric_details": "260 GSM Heavy Cotton. Raw hem. Unique distressing per piece. Overdyed.", "total_edition_size": 60, "is_drop": True, "images": ["https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80", "https://images.unsplash.com/photo-1503341733017-1901578f9f1a?w=800&q=80"]},
    {"world_slug": "rebel", "name": "Nightfall", "edition_number": "SD-005", "price": 2799, "description": "When darkness falls, the rebels rise.", "story": "Nightfall captures the energy of the underground scene. Worn by those who own the night.", "fabric_details": "280 GSM Premium Cotton. Garment dyed. Vintage wash.", "total_edition_size": 80, "is_drop": True, "images": ["https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80"]},
    {"world_slug": "chaos", "name": "Void Walker", "edition_number": "SD-008", "price": 3899, "description": "Step into the void. Abstract artwork meets streetwear.", "story": "An experimental collaboration with underground artists. Pushing boundaries of what a t-shirt can be.", "fabric_details": "300 GSM Premium Cotton. Screen printed abstract art. Limited run.", "total_edition_size": 45, "is_drop": True, "images": ["https://images.unsplash.com/photo-1503341733017-1901578f9f1a?w=800&q=80"]},
]

variations_data = {
    "SD-001": [("Black", "#1a1a1a", "S", 12), ("Black", "#1a1a1a", "M", 8), ("Black", "#1a1a1a", "L", 4), ("Black", "#1a1a1a", "XL", 0), ("White", "#f5f5f5", "M", 2), ("White", "#f5f5f5", "L", 6)],
    "SD-002": [("Black", "#1a1a1a", "S", 15), ("Black", "#1a1a1a", "M", 5), ("Black", "#1a1a1a", "L", 3), ("Black", "#1a1a1a", "XL", 8)],
    "SD-003": [("White", "#f5f5f5", "M", 2), ("White", "#f5f5f5", "L", 1), ("White", "#f5f5f5", "XL", 3)],
    "SD-004": [("Black", "#1a1a1a", "M", 12), ("Black", "#1a1a1a", "L", 18), ("Black", "#1a1a1a", "XL", 20)],
    "SD-005": [("Black", "#1a1a1a", "S", 10), ("Black", "#1a1a1a", "M", 15), ("Black", "#1a1a1a", "L", 8)],
    "SD-008": [("Black", "#1a1a1a", "M", 10), ("Black", "#1a1a1a", "L", 18)],
}

product_map = {}
for pd in products_data:
    product = Product(
        world_id=world_map[pd["world_slug"]].id,
        name=pd["name"],
        slug=pd["name"].lower().replace(" ", "-"),
        edition_number=pd["edition_number"],
        price=pd["price"],
        description=pd["description"],
        story=pd["story"],
        fabric_details=pd["fabric_details"],
        total_edition_size=pd["total_edition_size"],
        is_drop=pd["is_drop"],
        is_limited=True,
        images=pd["images"],
    )
    db.add(product)
    db.flush()
    product_map[pd["edition_number"]] = product

for ed, vars_list in variations_data.items():
    product = product_map[ed]
    for color, color_hex, size, stock in vars_list:
        var = ProductVariation(
            product_id=product.id,
            color=color,
            color_hex=color_hex,
            size=size,
            stock=stock,
            sku=f"{ed}-{color[:4].upper()}-{size}",
        )
        db.add(var)

import hashlib

admin = User(
    email="admin@skubydoo.com",
    username="admin",
    full_name="SKUBYDOO Admin",
    hashed_password=hashlib.sha256("admin123".encode()).hexdigest(),
    role="admin",
)
db.add(admin)

customer = User(
    email="demo@skubydoo.com",
    username="demo",
    full_name="Demo User",
    hashed_password=hashlib.sha256("demo123".encode()).hexdigest(),
    role="customer",
)
db.add(customer)

sample_order = Order(
    order_number="SD-20260617-0001",
    status="confirmed",
    customer_name="Rahul Sharma",
    customer_email="rahul@email.com",
    customer_phone="+919876543210",
    shipping_address={"address": "123 Fashion Street", "city": "Mumbai", "state": "Maharashtra", "pincode": "400001"},
    payment_method="cash_on_delivery",
    subtotal=2499,
    shipping_cost=199,
    total=2698,
    certificate_number="SD-2026-000001",
)
db.add(sample_order)
db.flush()

first_var = db.query(ProductVariation).filter(ProductVariation.product_id == product_map["SD-001"].id).first()

order_item = OrderItem(
    order_id=sample_order.id,
    product_id=product_map["SD-001"].id,
    variation_id=first_var.id,
    product_name="Shadow King",
    color="Black",
    size="M",
    quantity=1,
    unit_price=2499,
    total_price=2499,
)
db.add(order_item)

db.add(OrderTimeline(order_id=sample_order.id, status="pending", note="Order placed"))
db.add(OrderTimeline(order_id=sample_order.id, status="confirmed", note="Certificate SD-2026-000001 issued"))

cert = Certificate(
    certificate_number="SD-2026-000001",
    order_id=sample_order.id,
    product_id=product_map["SD-001"].id,
    edition_number="SD-001",
)
db.add(cert)

vault_items = [
    {"edition": "SD-001", "release": datetime(2025, 9, 15), "edition_size": 50, "sold_out": datetime(2025, 9, 16), "notes": "The one that started it all. 50 pieces. Sold in 24 hours.", "highlight": True},
    {"edition": "SD-003", "release": datetime(2025, 11, 15), "edition_size": 30, "sold_out": datetime(2025, 11, 15), "notes": "The most premium drop to date. Vanished in under 3 hours.", "highlight": False},
]
for vi in vault_items:
    v = VaultItem(
        product_id=product_map[vi["edition"]].id,
        release_date=vi["release"],
        edition_size=vi["edition_size"],
        sold_out_date=vi["sold_out"],
        designer_notes=vi["notes"],
        highlight=vi["highlight"],
    )
    db.add(v)

drop = Drop(
    product_id=product_map["SD-008"].id,
    name="Void Walker Drop",
    teaser_description="The most experimental drop yet. Limited to 45 pieces worldwide.",
    drop_date=datetime(2026, 6, 30, 20, 0, 0),
    notify_count=312,
)
db.add(drop)

posts = [
    {"user": "street_k1ng", "img": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80", "cap": "Shadow King hitting different.", "up": 234, "down": 3, "approved": True},
    {"user": "fashion.phantom", "img": "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=400&q=80", "cap": "Neon Protocol under UV. Art.", "up": 189, "down": 5, "approved": True},
    {"user": "gold.era", "img": "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&q=80", "cap": "Golden Crown. No words.", "up": 312, "down": 1, "approved": True},
]
for p in posts:
    cp = CommunityPost(user_name=p["user"], image_url=p["img"], caption=p["cap"], upvotes=p["up"], downvotes=p["down"], is_approved=p["approved"])
    db.add(cp)

designs = [
    {"name": "Cyber Bloom", "description": "Floral cyberpunk fusion", "votes": 456, "active": True},
    {"name": "Midnight Marble", "description": "Marble texture experiment", "votes": 389, "active": True},
    {"name": "Gold Fracture", "description": "Shattered gold pattern", "votes": 312, "active": True},
]
for d in designs:
    dv = DesignVote(design_name=d["name"], description=d["description"], votes=d["votes"], is_active=d["active"])
    db.add(dv)

db.commit()
db.close()

print("Database seeded successfully!")
print(f"- {len(worlds_data)} worlds")
print(f"- {len(products_data)} products with variations")
print(f"- 2 users (admin/admin123, demo/demo123)")
print(f"- 1 sample order with certificate")
print(f"- {len(vault_items)} vault items")
print(f"- 1 upcoming drop")
print(f"- {len(posts)} community posts")
print(f"- {len(designs)} design votes")
