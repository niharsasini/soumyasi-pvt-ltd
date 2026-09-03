from fastapi import APIRouter, HTTPException
from app.models.blog_post import BlogPost

router = APIRouter()

@router.get("/")
async def get_posts(category: str = None, skip: int = 0, limit: int = 50):
    query = {"is_published": True}
    if category:
        query["category"] = category
    posts = await BlogPost.find(query).sort(
        -BlogPost.created_at
    ).skip(skip).limit(limit).to_list()
    return posts

@router.get("/{slug}")
async def get_post(slug: str):
    post = await BlogPost.find_one(
        BlogPost.slug == slug, BlogPost.is_published == True
    )
    if not post:
        raise HTTPException(status_code=404, detail="Blog post not found")
    return post
