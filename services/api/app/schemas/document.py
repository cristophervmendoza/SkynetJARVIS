from pydantic import BaseModel
from datetime import datetime


class DocumentCreate(BaseModel):
    title: str
    content: str = ""
    content_type: str = "markdown"
    project_id: str | None = None
    tags: list[str] = []


class DocumentResponse(BaseModel):
    id: str
    title: str
    content: str
    content_type: str
    project_id: str | None = None
    tags: list[str] = []
    version: int = 1
    file_url: str | None = None
    file_size: int | None = None
    summary: str | None = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
