from pydantic import BaseModel, EmailStr
from datetime import datetime


class UserCreate(BaseModel):
    email: str
    name: str
    password: str


class UserUpdate(BaseModel):
    name: str | None = None
    avatar: str | None = None
    preferences: dict | None = None


class UserResponse(BaseModel):
    id: str
    email: str
    name: str
    avatar: str | None = None
    role: str
    preferences: dict = {}
    created_at: datetime

    class Config:
        from_attributes = True


class LoginRequest(BaseModel):
    email: str
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse
