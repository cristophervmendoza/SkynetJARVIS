import json
from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import StreamingResponse
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from openai import AsyncOpenAI
from anthropic import AsyncAnthropic

from ..core.database import get_db
from ..models.chat import Chat, Message
from ..schemas.chat import ChatRequest, ChatCreate, ChatResponse, MessageResponse

router = APIRouter(prefix="/chat", tags=["chat"])


async def stream_openai(messages: list[dict], model: str = "gpt-4o-mini"):
    client = AsyncOpenAI()
    stream = await client.chat.completions.create(
        model=model,
        messages=messages,
        stream=True,
    )
    async for chunk in stream:
        if chunk.choices[0].delta.content:
            yield f"data: {json.dumps({'content': chunk.choices[0].delta.content})}\n\n"
    yield "data: [DONE]\n\n"


async def stream_anthropic(messages: list[dict], model: str = "claude-sonnet-4-20250514"):
    client = AsyncAnthropic()
    async with client.messages.stream(
        model=model,
        max_tokens=4096,
        messages=messages,
    ) as stream:
        async for text in stream.text_stream:
            yield f"data: {json.dumps({'content': text})}\n\n"
    yield "data: [DONE]\n\n"


@router.post("")
async def chat_completion(request: ChatRequest, db: AsyncSession = Depends(get_db)):
    chat_id = request.chat_id

    if chat_id:
        result = await db.execute(select(Chat).where(Chat.id == chat_id))
        chat = result.scalar_one_or_none()
        if not chat:
            raise HTTPException(status_code=404, detail="Chat not found")
    else:
        chat = Chat(
            title=request.message[:50],
            mode=request.mode,
            model_id=request.model_id,
        )
        db.add(chat)
        await db.commit()
        await db.refresh(chat)

    user_msg = Message(chat_id=chat.id, role="user", content=request.message)
    db.add(user_msg)

    result = await db.execute(
        select(Message).where(Message.chat_id == chat.id).order_by(Message.created_at)
    )
    history = result.scalars().all()

    messages = [
        {"role": "system", "content": "You are Nexa AI, an all-in-one AI assistant."}
    ]
    for msg in history:
        messages.append({"role": msg.role, "content": msg.content})
    messages.append({"role": "user", "content": request.message})

    chat.message_count += 1
    await db.commit()

    async def generate():
        full_response = ""
        async for chunk in stream_openai(messages):
            yield chunk
            if chunk.startswith("data: ") and not chunk.startswith("data: [DONE]"):
                data = json.loads(chunk[6:])
                full_response += data.get("content", "")

        if full_response:
            assistant_msg = Message(
                chat_id=chat.id, role="assistant", content=full_response,
                model_id=request.model_id or "gpt-4o-mini",
            )
            db.add(assistant_msg)
            await db.commit()

    return StreamingResponse(generate(), media_type="text/event-stream")


@router.get("", response_model=list[ChatResponse])
async def list_chats(user_id: str | None = None, db: AsyncSession = Depends(get_db)):
    query = select(Chat).order_by(Chat.updated_at.desc())
    if user_id:
        query = query.where(Chat.user_id == user_id)
    result = await db.execute(query)
    return [ChatResponse.model_validate(c) for c in result.scalars().all()]


@router.get("/{chat_id}/messages", response_model=list[MessageResponse])
async def get_messages(chat_id: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Message).where(Message.chat_id == chat_id).order_by(Message.created_at)
    )
    return [MessageResponse.model_validate(m) for m in result.scalars().all()]


@router.delete("/{chat_id}")
async def delete_chat(chat_id: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Chat).where(Chat.id == chat_id))
    chat = result.scalar_one_or_none()
    if not chat:
        raise HTTPException(status_code=404, detail="Chat not found")
    await db.delete(chat)
    await db.commit()
    return {"ok": True}
