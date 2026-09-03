"""
Create first admin user.
Run: python scripts/create_admin.py
"""
import asyncio
import sys
sys.path.insert(0, '.')

async def create_admin():
    from app.database import connect_db
    from app.models.user import AdminUser
    from app.services.auth_service import hash_password

    await connect_db()

    username = input("Admin username: ").strip()
    password = input("Admin password: ").strip()
    email = input("Admin email: ").strip()
    full_name = input("Full name: ").strip()

    existing = await AdminUser.find_one(
        AdminUser.username == username
    )
    if existing:
        print(f"❌ Username '{username}' already exists")
        return

    user = AdminUser(
        username=username,
        email=email,
        hashed_password=hash_password(password),
        full_name=full_name,
        is_superadmin=True,
    )
    await user.insert()
    print(f"✅ Admin '{username}' created successfully!")

if __name__ == "__main__":
    asyncio.run(create_admin())
