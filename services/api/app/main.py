from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from .core.config import settings
from .core.database import create_tables
from .routes import auth_router, chat_router, projects_router, documents_router, agent_router, settings_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    try:
        await create_tables()
    except Exception as e:
        print(f"[WARN] Database not available: {e}")
        print("[INFO] Server will start but DB features won't work without PostgreSQL.")
    yield


app = FastAPI(
    title=settings.app_name,
    version=settings.app_version,
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(chat_router)
app.include_router(projects_router)
app.include_router(documents_router)
app.include_router(agent_router)
app.include_router(settings_router)


@app.get("/health")
async def health_check():
    return {"status": "ok", "version": settings.app_version}


@app.get("/")
async def root():
    return {
        "name": settings.app_name,
        "version": settings.app_version,
        "endpoints": {
            "auth": "/auth",
            "chat": "/chat",
            "projects": "/projects",
            "documents": "/documents",
            "agent": "/agent",
            "settings": "/settings",
        },
    }
