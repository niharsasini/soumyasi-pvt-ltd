from motor.motor_asyncio import AsyncIOMotorClient
from beanie import init_beanie
from app.config import settings
import logging

logger = logging.getLogger(__name__)

class Database:
    client: AsyncIOMotorClient = None

db = Database()

async def connect_db():
    try:
        db.client = AsyncIOMotorClient(settings.MONGODB_URL)
        # Import all models for Beanie init
        from app.models.contact import ContactSubmission
        from app.models.ev_partner import EVPartnerApplication
        from app.models.newsletter import NewsletterSubscriber
        from app.models.ev_station import EVStation
        from app.models.project import Project
        from app.models.blog_post import BlogPost
        from app.models.job import Job
        from app.models.application import JobApplication
        from app.models.user import AdminUser

        await init_beanie(
            database=db.client[settings.MONGODB_DB_NAME],
            document_models=[
                ContactSubmission,
                EVPartnerApplication,
                NewsletterSubscriber,
                EVStation,
                Project,
                BlogPost,
                Job,
                JobApplication,
                AdminUser,
            ]
        )
        logger.info("Connected to MongoDB")
    except Exception as e:
        logger.error(f"MongoDB connection failed: {e}")
        raise

async def close_db():
    if db.client:
        db.client.close()
        logger.info("MongoDB connection closed")
