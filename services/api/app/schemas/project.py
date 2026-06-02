from pydantic import BaseModel
from datetime import datetime


class ProjectCreate(BaseModel):
    name: str
    description: str | None = None
    tags: list[str] = []


class ProjectUpdate(BaseModel):
    name: str | None = None
    description: str | None = None
    status: str | None = None
    tags: list[str] | None = None


class ProjectResponse(BaseModel):
    id: str
    name: str
    description: str | None = None
    status: str
    tags: list[str] = []
    skills: list[str] = []
    chat_ids: list[str] = []
    document_ids: list[str] = []
    memory_count: int = 0
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
