from fastapi import APIRouter, Depends, HTTPException
from beanie import PydanticObjectId
from app.models.user import AdminUser
from app.models.contact import ContactSubmission, ContactStatus
from app.models.ev_partner import EVPartnerApplication, EVPartnerStatus
from app.models.newsletter import NewsletterSubscriber
from app.models.ev_station import EVStation
from app.models.project import Project
from app.models.blog_post import BlogPost
from app.models.job import Job
from app.models.application import JobApplication
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

@router.post("/change-password")
async def change_password(
    data: dict,
    current_user: AdminUser = Depends(get_current_admin)
):
    current_password = data.get("current_password", "")
    new_password = data.get("new_password", "")
    if not verify_password(current_password, current_user.hashed_password):
        raise HTTPException(status_code=401, detail="Current password is incorrect")
    if len(new_password) < 8:
        raise HTTPException(
            status_code=400,
            detail="New password must be at least 8 characters"
        )
    current_user.hashed_password = hash_password(new_password)
    await current_user.save()
    return {"success": True}

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

# ── PROJECTS ──────────────────────────────────────
@router.get("/projects")
async def get_all_projects(
    current_user: AdminUser = Depends(get_current_admin)
):
    return await Project.find_all().sort(-Project.created_at).to_list()

@router.post("/projects")
async def create_project(
    data: dict,
    current_user: AdminUser = Depends(get_current_admin)
):
    project = Project(**data)
    await project.insert()
    return {"success": True, "id": str(project.id)}

@router.patch("/projects/{project_id}")
async def update_project(
    project_id: str,
    data: dict,
    current_user: AdminUser = Depends(get_current_admin)
):
    project = await Project.get(PydanticObjectId(project_id))
    if not project:
        raise HTTPException(status_code=404, detail="Not found")
    for k, v in data.items():
        setattr(project, k, v)
    await project.save()
    return {"success": True}

@router.delete("/projects/{project_id}")
async def delete_project(
    project_id: str,
    current_user: AdminUser = Depends(get_current_admin)
):
    project = await Project.get(PydanticObjectId(project_id))
    if project:
        await project.delete()
    return {"success": True}

# ── BLOG ──────────────────────────────────────────
@router.get("/blog")
async def get_all_posts(
    current_user: AdminUser = Depends(get_current_admin)
):
    return await BlogPost.find_all().sort(-BlogPost.created_at).to_list()

@router.post("/blog")
async def create_post(
    data: dict,
    current_user: AdminUser = Depends(get_current_admin)
):
    post = BlogPost(**data)
    await post.insert()
    return {"success": True, "id": str(post.id)}

@router.patch("/blog/{post_id}")
async def update_post(
    post_id: str,
    data: dict,
    current_user: AdminUser = Depends(get_current_admin)
):
    post = await BlogPost.get(PydanticObjectId(post_id))
    if not post:
        raise HTTPException(status_code=404, detail="Not found")
    for k, v in data.items():
        setattr(post, k, v)
    post.updated_at = datetime.utcnow()
    await post.save()
    return {"success": True}

@router.delete("/blog/{post_id}")
async def delete_post(
    post_id: str,
    current_user: AdminUser = Depends(get_current_admin)
):
    post = await BlogPost.get(PydanticObjectId(post_id))
    if post:
        await post.delete()
    return {"success": True}

# ── CAREERS: JOBS ─────────────────────────────────
@router.get("/jobs")
async def get_all_jobs(
    current_user: AdminUser = Depends(get_current_admin)
):
    return await Job.find_all().sort(-Job.created_at).to_list()

@router.post("/jobs")
async def create_job(
    data: dict,
    current_user: AdminUser = Depends(get_current_admin)
):
    job = Job(**data)
    await job.insert()
    return {"success": True, "id": str(job.id)}

@router.patch("/jobs/{job_id}")
async def update_job(
    job_id: str,
    data: dict,
    current_user: AdminUser = Depends(get_current_admin)
):
    job = await Job.get(PydanticObjectId(job_id))
    if not job:
        raise HTTPException(status_code=404, detail="Not found")
    for k, v in data.items():
        setattr(job, k, v)
    await job.save()
    return {"success": True}

@router.delete("/jobs/{job_id}")
async def delete_job(
    job_id: str,
    current_user: AdminUser = Depends(get_current_admin)
):
    job = await Job.get(PydanticObjectId(job_id))
    if job:
        await job.delete()
    return {"success": True}

# ── CAREERS: APPLICATIONS ─────────────────────────
@router.get("/job-applications")
async def get_job_applications(
    job_id: str = None,
    status: str = None,
    skip: int = 0,
    limit: int = 50,
    current_user: AdminUser = Depends(get_current_admin)
):
    query = {}
    if job_id:
        query["job_id"] = job_id
    if status:
        query["status"] = status
    return await JobApplication.find(query).sort(
        -JobApplication.created_at
    ).skip(skip).limit(limit).to_list()

@router.patch("/job-applications/{application_id}")
async def update_job_application(
    application_id: str,
    data: dict,
    current_user: AdminUser = Depends(get_current_admin)
):
    application = await JobApplication.get(
        PydanticObjectId(application_id)
    )
    if not application:
        raise HTTPException(status_code=404, detail="Not found")
    for k, v in data.items():
        setattr(application, k, v)
    await application.save()
    return {"success": True}

# ── NEWSLETTER ────────────────────────────────────
@router.get("/newsletter")
async def get_subscribers(
    current_user: AdminUser = Depends(get_current_admin)
):
    return await NewsletterSubscriber.find_all().sort(
        -NewsletterSubscriber.subscribed_at
    ).to_list()

@router.delete("/newsletter/{subscriber_id}")
async def delete_subscriber(
    subscriber_id: str,
    current_user: AdminUser = Depends(get_current_admin)
):
    subscriber = await NewsletterSubscriber.get(
        PydanticObjectId(subscriber_id)
    )
    if subscriber:
        await subscriber.delete()
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
