import uuid
from datetime import datetime, timezone
from sqlalchemy import String, Boolean, DateTime, JSON, ForeignKey, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import ARRAY
from ..core.database import Base


class Gem(Base):
    __tablename__ = "gems"

    id: Mapped[str] = mapped_column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    name: Mapped[str] = mapped_column(String)
    role: Mapped[str] = mapped_column(String)
    instructions: Mapped[str] = mapped_column(Text)
    user_id: Mapped[str] = mapped_column(String, ForeignKey("users.id", ondelete="CASCADE"))
    model_id: Mapped[str] = mapped_column(String)
    allowed_tools: Mapped[list] = mapped_column(ARRAY(String), default=list)
    allowed_connections: Mapped[list] = mapped_column(ARRAY(String), default=list)
    memory_enabled: Mapped[bool] = mapped_column(Boolean, default=True)
    response_style: Mapped[str] = mapped_column(String, default="professional")
    system_prompt: Mapped[str] = mapped_column(Text)
    icon: Mapped[str | None] = mapped_column(String, nullable=True)
    color: Mapped[str | None] = mapped_column(String, nullable=True)
    commands: Mapped[dict | None] = mapped_column(JSON, nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    user = relationship("User")
