from datetime import datetime
from sqlalchemy.orm import Session
from models.all_models import Certificate


def generate_certificate_number(db: Session) -> str:
    year = datetime.utcnow().year
    count = db.query(Certificate).count() + 1
    return f"SD-{year}-{count:06d}"
