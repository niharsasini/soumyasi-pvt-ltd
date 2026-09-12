from fastapi import APIRouter
from app.models.gallery import GalleryItem

router = APIRouter()

@router.get("/")
async def get_gallery():
    items = await GalleryItem.find(
        GalleryItem.is_active == True
    ).sort(-GalleryItem.created_at).to_list()
    return [
        {
            "id": str(item.id),
            "title": item.title,
            "category": item.category,
            "subcategory": item.subcategory,
            "location": item.location,
            "image": item.image_url,
            "capacity": item.capacity,
            "description": item.description,
        }
        for item in items
    ]
