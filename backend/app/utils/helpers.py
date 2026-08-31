import re
import unicodedata

def slugify(value: str) -> str:
    """Convert a string into a URL-friendly slug"""
    value = unicodedata.normalize("NFKD", value).encode("ascii", "ignore").decode("ascii")
    value = re.sub(r"[^\w\s-]", "", value).strip().lower()
    return re.sub(r"[-\s]+", "-", value)

def paginate(query, page: int = 1, page_size: int = 20):
    """Apply offset/limit pagination to a SQLAlchemy query"""
    return query.offset((page - 1) * page_size).limit(page_size)
