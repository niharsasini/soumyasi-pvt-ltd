from fastapi import APIRouter
from app.api.v1.endpoints import (
    contact,
    newsletter,
    ev_partner,
    ev_stations,
    solutions,
    projects,
    blog,
    careers,
    admin
)

api_router = APIRouter()

api_router.include_router(
    contact.router,
    prefix="/contact",
    tags=["Contact"]
)
api_router.include_router(
    newsletter.router,
    prefix="/newsletter",
    tags=["Newsletter"]
)
api_router.include_router(
    ev_partner.router,
    prefix="/ev-partner",
    tags=["EV Partner"]
)
api_router.include_router(
    ev_stations.router,
    prefix="/ev-stations",
    tags=["EV Stations"]
)
api_router.include_router(
    solutions.router,
    prefix="/solutions",
    tags=["Solutions"]
)
api_router.include_router(
    projects.router,
    prefix="/projects",
    tags=["Projects"]
)
api_router.include_router(
    blog.router,
    prefix="/blog",
    tags=["Blog"]
)
api_router.include_router(
    careers.router,
    prefix="/careers",
    tags=["Careers"]
)
api_router.include_router(
    admin.router,
    prefix="/admin",
    tags=["Admin"]
)
