from pydantic import BaseModel
from datetime import datetime


class ChatRequest(BaseModel):
    message: str
    chat_id: str | None = None
    mode: str = "chat"
    model_id: str | None = None
    stream: bool = True


class ChatCreate(BaseModel):
    title: str = "New Chat"
    mode: str = "chat"
    project_id: str | None = None
    model_id: str | None = None


class ChatResponse(BaseModel):
    id: str
    title: str
    project_id: str | None = None
    mode: str
    model_id: str | None = None
    tags: list[str] = []
    favorite: bool = False
    summary: str | None = None
    message_count: int = 0
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class MessageCreate(BaseModel):
    role: str
    content: str
    model_id: str | None = None


class MessageResponse(BaseModel):
    id: str
    chat_id: str
    role: str
    content: str
    model_id: str | None = None
    created_at: datetime

    class Config:
        from_attributes = True
