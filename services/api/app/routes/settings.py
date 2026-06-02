from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from pydantic import BaseModel

from ..core.database import get_db

router = APIRouter(prefix="/settings", tags=["settings"])


class ModelConfigUpdate(BaseModel):
    cheap: str = "gpt-4o-mini"
    powerful: str = "claude-sonnet-4-20250514"
    code: str = "claude-sonnet-4-20250514"
    vision: str = "gpt-4o"
    image: str = "dall-e-3"
    video: str = "runway-gen3"
    audio: str = "elevenlabs-multilingual-v2"


@router.get("/models")
async def get_model_config():
    return {
        "cheap": "gpt-4o-mini",
        "powerful": "claude-sonnet-4-20250514",
        "code": "claude-sonnet-4-20250514",
        "vision": "gpt-4o",
        "image": "dall-e-3",
        "video": "runway-gen3",
        "audio": "elevenlabs-multilingual-v2",
        "embedding": "text-embedding-3-small",
    }


@router.put("/models")
async def update_model_config(config: ModelConfigUpdate):
    return config.model_dump()


@router.get("/providers")
async def list_providers():
    return {
        "cloud": [
            {"id": "openai", "name": "OpenAI", "models": ["gpt-4o", "gpt-4o-mini", "gpt-4-turbo", "o3-mini"]},
            {"id": "anthropic", "name": "Anthropic", "models": ["claude-sonnet-4-20250514", "claude-3-haiku", "claude-3-opus"]},
            {"id": "google", "name": "Google Gemini", "models": ["gemini-2.0-flash", "gemini-2.0-pro"]},
            {"id": "grok", "name": "xAI Grok", "models": ["grok-2", "grok-2-mini"]},
            {"id": "mistral", "name": "Mistral", "models": ["mistral-large", "mistral-small"]},
            {"id": "deepseek", "name": "DeepSeek", "models": ["deepseek-chat", "deepseek-coder"]},
        ],
        "local": [
            {"id": "ollama", "name": "Ollama", "models": ["llama3", "mistral", "codellama"]},
            {"id": "lmstudio", "name": "LM Studio", "models": ["local-model"]},
            {"id": "vllm", "name": "vLLM", "models": ["custom"]},
        ],
        "image": [
            {"id": "stability", "name": "Stability AI", "models": ["stable-diffusion-3"]},
            {"id": "replicate", "name": "Replicate", "models": ["flux"]},
        ],
        "video": [
            {"id": "runway", "name": "Runway", "models": ["gen-3"]},
            {"id": "luma", "name": "Luma", "models": ["ray"]},
        ],
    }
