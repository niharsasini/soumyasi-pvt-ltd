import re

PHONE_REGEX = re.compile(r"^\+?[0-9]{10,15}$")

def is_valid_phone(phone: str) -> bool:
    """Basic international phone number validation"""
    return bool(PHONE_REGEX.match(phone.replace(" ", "")))

def is_valid_slug(slug: str) -> bool:
    """Slugs must be lowercase, alphanumeric, hyphen-separated"""
    return bool(re.match(r"^[a-z0-9]+(-[a-z0-9]+)*$", slug))
