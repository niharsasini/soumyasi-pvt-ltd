from fastapi import APIRouter, HTTPException
from app.models.job import Job
from app.models.application import JobApplication
from app.schemas.application import ApplicationCreate, ApplicationResponse

router = APIRouter()

@router.get("/")
async def get_jobs():
    return await Job.find(Job.is_active == True).to_list()

@router.get("/{slug}")
async def get_job(slug: str):
    job = await Job.find_one(Job.slug == slug, Job.is_active == True)
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    return job

@router.post("/{slug}/apply", response_model=ApplicationResponse)
async def apply_to_job(slug: str, data: ApplicationCreate):
    job = await Job.find_one(Job.slug == slug, Job.is_active == True)
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")

    application = JobApplication(
        job_id=str(job.id),
        job_title=job.title,
        **data.model_dump(),
    )
    await application.insert()
    return ApplicationResponse(
        success=True,
        message="Application received! We'll be in touch if shortlisted.",
        id=str(application.id)
    )
