from pydantic import BaseModel
from datetime import datetime


class AgentRunRequest(BaseModel):
    goal: str
    chat_id: str | None = None
    auto_mode: bool = False


class AgentStepResponse(BaseModel):
    id: str
    step_number: int
    action: str
    tool: str | None = None
    input: str | None = None
    output: str | None = None
    status: str
    requires_approval: bool = False
    approved: bool | None = None

    class Config:
        from_attributes = True


class AgentRunResponse(BaseModel):
    id: str
    goal: str
    plan: list[AgentStepResponse] = []
    status: str
    current_step: int = 0
    result: str | None = None
    error: str | None = None
    started_at: datetime
    completed_at: datetime | None = None

    class Config:
        from_attributes = True


class ApprovalRequest(BaseModel):
    run_id: str
    step_id: str
    approved: bool
