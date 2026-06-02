import asyncio
from typing import AsyncGenerator
from pydantic import BaseModel


class ModelRequest(BaseModel):
    messages: list[dict]
    model: str = "gpt-4o-mini"
    provider: str = "openai"
    stream: bool = True
    max_tokens: int = 4096
    temperature: float = 0.7


class AIOrchestrator:
    def __init__(self):
        self.clients = {}

    async def route_request(self, request: ModelRequest) -> AsyncGenerator[str, None]:
        provider = request.provider
        model = request.model

        if provider == "openai":
            async for chunk in self._stream_openai(request):
                yield chunk
        elif provider == "anthropic":
            async for chunk in self._stream_anthropic(request):
                yield chunk
        elif provider == "google":
            async for chunk in self._stream_google(request):
                yield chunk
        else:
            yield f"Provider {provider} not configured"

    async def _stream_openai(self, request: ModelRequest) -> AsyncGenerator[str, None]:
        from openai import AsyncOpenAI
        client = AsyncOpenAI()
        stream = await client.chat.completions.create(
            model=request.model,
            messages=request.messages,
            stream=True,
            max_tokens=request.max_tokens,
            temperature=request.temperature,
        )
        async for chunk in stream:
            if chunk.choices[0].delta.content:
                yield chunk.choices[0].delta.content

    async def _stream_anthropic(self, request: ModelRequest) -> AsyncGenerator[str, None]:
        from anthropic import AsyncAnthropic
        client = AsyncAnthropic()
        async with client.messages.stream(
            model=request.model,
            max_tokens=request.max_tokens,
            messages=request.messages,
        ) as stream:
            async for text in stream.text_stream:
                yield text

    async def _stream_google(self, request: ModelRequest) -> AsyncGenerator[str, None]:
        import google.generativeai as genai
        genai.configure()
        model = genai.GenerativeModel(request.model)
        response = await model.generate_content_async(
            request.messages[-1]["content"],
            stream=True,
        )
        async for chunk in response:
            if chunk.text:
                yield chunk.text

    async def select_model(self, task_type: str, preferences: dict | None = None) -> tuple[str, str]:
        defaults = {
            "cheap": ("openai", "gpt-4o-mini"),
            "powerful": ("anthropic", "claude-sonnet-4-20250514"),
            "code": ("anthropic", "claude-sonnet-4-20250514"),
            "vision": ("openai", "gpt-4o"),
            "image": ("openai", "dall-e-3"),
            "video": ("runway", "gen-3"),
            "audio": ("elevenlabs", "elevenlabs-multilingual-v2"),
        }
        return defaults.get(task_type, defaults["cheap"])


orchestrator = AIOrchestrator()
