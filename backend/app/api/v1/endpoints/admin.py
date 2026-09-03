from fastapi import APIRouter, Depends, HTTPException
from beanie import PydanticObjectId
from app.models.user import AdminUser
from app.models.contact import ContactSubmission, ContactStatus
from app.models.ev_partner import EVPartnerApplication, EVPartnerStatus
from app.models.newsletter import NewsletterSubscriber
from app.models.ev_station import EVStation
from app.schemas.user import LoginRequest, TokenResponse, AdminCreate
from app.schemas.contact import ContactUpdate
from app.schemas.ev_partner import EVPartnerUpdate
from app.services.auth_service import (
    verify_password, hash_password, create_token
)
from app.middleware.auth import get_current_admin, get_superadmin
from datetime import datetime

router = APIRouter()

# ── AUTH ──────────────────────────────────────────
@router.post("/login", response_model=TokenResponse)
async def login(data: LoginRequest):
    user = await AdminUser.find_one(
        AdminUser.username == data.username
    )
    if not user or not verify_password(data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    if not user.is_active:
        raise HTTPException(status_code=401, detail="Account inactive")

    user.last_login = datetime.utcnow()
    await user.save()

    token = create_token({"sub": user.username})
    return TokenResponse(
        access_token=token,
        username=user.username,
        is_superadmin=user.is_superadmin
    )

@router.get("/me")
async def get_me(current_user: AdminUser = Depends(get_current_admin)):
    return {
        "username": current_user.username,
        "email": current_user.email,
        "full_name": current_user.full_name,
        "is_superadmin": current_user.is_superadmin,
        "last_login": current_user.last_login
    }

# ── DASHBOARD STATS ───────────────────────────────
@router.get("/dashboard")
async def get_dashboard(
    current_user: AdminUser = Depends(get_current_admin)
):
    total_contacts = await ContactSubmission.count()
    new_contacts = await ContactSubmission.find(
        ContactSubmission.status == ContactStatus.NEW
    ).count()
    total_ev_apps = await EVPartnerApplication.count()
    new_ev_apps = await EVPartnerApplication.find(
        EVPartnerApplication.status == EVPartnerStatus.NEW
    ).count()
    total_subscribers = await NewsletterSubscriber.find(
        NewsletterSubscriber.is_active == True
    ).count()
    total_stations = await EVStation.find(
        EVStation.is_active == True
    ).count()

    return {
        "contacts": {
            "total": total_contacts,
            "new": new_contacts
        },
        "ev_partners": {
            "total": total_ev_apps,
            "new": new_ev_apps
        },
        "newsletter": {
            "total_subscribers": total_subscribers
        },
        "ev_stations": {
            "total_active": total_stations
        }
    }

# ── CONTACTS ──────────────────────────────────────
@router.get("/contacts")
async def get_contacts(
    status: str = None,
    skip: int = 0,
    limit: int = 50,
    current_user: AdminUser = Depends(get_current_admin)
):
    query = {}
    if status:
        query["status"] = status
    contacts = await ContactSubmission.find(query).sort(
        -ContactSubmission.created_at
    ).skip(skip).limit(limit).to_list()
    return contacts

@router.patch("/contacts/{contact_id}")
async def update_contact(
    contact_id: str,
    data: ContactUpdate,
    current_user: AdminUser = Depends(get_current_admin)
):
    contact = await ContactSubmission.get(PydanticObjectId(contact_id))
    if not contact:
        raise HTTPException(status_code=404, detail="Not found")
    if data.status:
        contact.status = data.status
    contact.updated_at = datetime.utcnow()
    await contact.save()
    return {"success": True}

# ── EV PARTNERS ───────────────────────────────────
@router.get("/ev-partners")
async def get_ev_partners(
    status: str = None,
    city: str = None,
    skip: int = 0,
    limit: int = 50,
    current_user: AdminUser = Depends(get_current_admin)
):
    query = {}
    if status:
        query["status"] = status
    if city:
        query["city"] = city
    apps = await EVPartnerApplication.find(query).sort(
        -EVPartnerApplication.created_at
    ).skip(skip).limit(limit).to_list()
    return apps

@router.patch("/ev-partners/{app_id}")
async def update_ev_partner(
    app_id: str,
    data: EVPartnerUpdate,
    current_user: AdminUser = Depends(get_current_admin)
):
    app = await EVPartnerApplication.get(PydanticObjectId(app_id))
    if not app:
        raise HTTPException(status_code=404, detail="Not found")
    update_data = data.model_dump(exclude_none=True)
    for k, v in update_data.items():
        setattr(app, k, v)
    app.updated_at = datetime.utcnow()
    await app.save()
    return {"success": True}

# ── EV STATIONS ───────────────────────────────────
@router.get("/ev-stations")
async def get_all_stations(
    current_user: AdminUser = Depends(get_current_admin)
):
    return await EVStation.find_all().to_list()

@router.post("/ev-stations")
async def create_station(
    data: dict,
    current_user: AdminUser = Depends(get_current_admin)
):
    station = EVStation(**data)
    await station.insert()
    return {"success": True, "id": str(station.id)}

@router.patch("/ev-stations/{station_id}")
async def update_station(
    station_id: str,
    data: dict,
    current_user: AdminUser = Depends(get_current_admin)
):
    station = await EVStation.get(PydanticObjectId(station_id))
    if not station:
        raise HTTPException(status_code=404, detail="Not found")
    for k, v in data.items():
        setattr(station, k, v)
    station.updated_at = datetime.utcnow()
    await station.save()
    return {"success": True}

@router.delete("/ev-stations/{station_id}")
async def delete_station(
    station_id: str,
    current_user: AdminUser = Depends(get_current_admin)
):
    station = await EVStation.get(PydanticObjectId(station_id))
    if station:
        station.is_active = False
        await station.save()
    return {"success": True}

# ── CREATE ADMIN ──────────────────────────────────
@router.post("/create-admin")
async def create_admin(
    data: AdminCreate,
    current_user: AdminUser = Depends(get_superadmin)
):
    existing = await AdminUser.find_one(
        AdminUser.username == data.username
    )
    if existing:
        raise HTTPException(
            status_code=400,
            detail="Username already exists"
        )
    user = AdminUser(
        username=data.username,
        email=data.email,
        hashed_password=hash_password(data.password),
        full_name=data.full_name,
        is_superadmin=data.is_superadmin,
    )
    await user.insert()
    return {"success": True, "username": user.username}
