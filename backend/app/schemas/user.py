from pydantic import BaseModel
from typing import Optional

class LoginRequest(BaseModel):
    username: str
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    username: str
    is_superadmin: bool

class AdminCreate(BaseModel):
    username: str
    email: str
    password: str
    full_name: str
    is_superadmin: bool = False
