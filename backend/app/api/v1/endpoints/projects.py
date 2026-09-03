from fastapi import APIRouter, HTTPException
from app.models.project import Project

router = APIRouter()

@router.get("/")
async def get_projects(category: str = None, skip: int = 0, limit: int = 50):
    query = {"is_published": True}
    if category:
        query["category"] = category
    projects = await Project.find(query).sort(
        -Project.created_at
    ).skip(skip).limit(limit).to_list()
    return projects

@router.get("/{slug}")
async def get_project(slug: str):
    project = await Project.find_one(
        Project.slug == slug, Project.is_published == True
    )
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project
