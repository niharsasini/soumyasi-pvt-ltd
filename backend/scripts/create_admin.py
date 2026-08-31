"""
Create an admin user in the database.
Run: python scripts/create_admin.py
"""
import sys
sys.path.append(".")

import getpass

from app.database import SessionLocal
from app.models.user import User
from app.services.auth_service import hash_password


def create_admin():
    email = input("Admin email: ").strip()
    password = getpass.getpass("Admin password: ")
    full_name = input("Full name: ").strip()

    db = SessionLocal()
    try:
        existing = db.query(User).filter(User.email == email).first()
        if existing:
            print(f"User with email {email} already exists.")
            return

        admin = User(
            email=email,
            hashed_password=hash_password(password),
            full_name=full_name,
            is_active=True,
            is_admin=True,
        )
        db.add(admin)
        db.commit()
        print(f"Admin user created: {email}")
    finally:
        db.close()


if __name__ == "__main__":
    create_admin()
