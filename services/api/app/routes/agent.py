from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from ..core.database import get_db
from ..models.agent import AgentRun, AgentStep
from ..schemas.agent import AgentRunRequest, AgentRunResponse, AgentStepResponse, ApprovalRequest

router = APIRouter(prefix="/agent", tags=["agent"])


@router.post("/run", response_model=AgentRunResponse)
async def start_agent_run(data: AgentRunRequest, db: AsyncSession = Depends(get_db)):
    run = AgentRun(
        goal=data.goal,
        chat_id=data.chat_id,
        status="planning",
    )
    db.add(run)
    await db.commit()
    await db.refresh(run)

    steps = [
        {"action": "Analyze request", "step_number": 1, "status": "completed"},
        {"action": "Search for information", "step_number": 2, "tool": "search_web", "requires_approval": False},
        {"action": "Process and generate response", "step_number": 3, "status": "pending"},
    ]

    for step_data in steps:
        step = AgentStep(run_id=run.id, **step_data)
        db.add(step)

    run.status = "running"
    await db.commit()

    result = await db.execute(select(AgentRun).where(AgentRun.id == run.id))
    run = result.scalar_one()

    steps_result = await db.execute(
        select(AgentStep).where(AgentStep.run_id == run.id).order_by(AgentStep.step_number)
    )

    return AgentRunResponse(
        id=run.id,
        goal=run.goal,
        status=run.status,
        current_step=run.current_step,
        plan=[AgentStepResponse.model_validate(s) for s in steps_result.scalars().all()],
        started_at=run.started_at,
    )


@router.post("/approve", response_model=AgentRunResponse)
async def approve_step(data: ApprovalRequest, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(AgentStep).where(AgentStep.id == data.step_id))
    step = result.scalar_one_or_none()
    if not step:
        raise HTTPException(status_code=404, detail="Step not found")

    step.approved = data.approved
    step.status = "approved" if data.approved else "failed"
    await db.commit()

    run_result = await db.execute(select(AgentRun).where(AgentRun.id == data.run_id))
    run = run_result.scalar_one()

    steps_result = await db.execute(
        select(AgentStep).where(AgentStep.run_id == run.id).order_by(AgentStep.step_number)
    )

    return AgentRunResponse(
        id=run.id,
        goal=run.goal,
        status=run.status,
        current_step=run.current_step,
        plan=[AgentStepResponse.model_validate(s) for s in steps_result.scalars().all()],
        started_at=run.started_at,
    )


@router.get("/runs", response_model=list[AgentRunResponse])
async def list_runs(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(AgentRun).order_by(AgentRun.started_at.desc()).limit(20))
    runs = []
    for run in result.scalars().all():
        steps_result = await db.execute(
            select(AgentStep).where(AgentStep.run_id == run.id).order_by(AgentStep.step_number)
        )
        runs.append(AgentRunResponse(
            id=run.id,
            goal=run.goal,
            status=run.status,
            current_step=run.current_step,
            plan=[AgentStepResponse.model_validate(s) for s in steps_result.scalars().all()],
            started_at=run.started_at,
            completed_at=run.completed_at,
        ))
    return runs
