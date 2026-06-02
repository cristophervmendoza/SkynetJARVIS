"""
Obsidian MCP Server - Connects to Obsidian vault via Local REST API plugin.
"""
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import httpx
import os

app = FastAPI(title="Obsidian MCP Server", version="0.1.0")

OBSIDIAN_API_PORT = int(os.getenv("OBSIDIAN_API_PORT", "27123"))
OBSIDIAN_API_KEY = os.getenv("OBSIDIAN_API_KEY", "")
OBSIDIAN_VAULT = os.getenv("OBSIDIAN_VAULT", "")

BASE_URL = f"http://localhost:{OBSIDIAN_API_PORT}"


class NoteCreate(BaseModel):
    title: str
    content: str
    folder: str = ""


class NoteUpdate(BaseModel):
    title: str
    content: str


@app.get("/vault")
async def get_vault_info():
    return {"name": OBSIDIAN_VAULT, "port": OBSIDIAN_API_PORT, "connected": True}


@app.get("/notes")
async def list_notes(folder: str = ""):
    url = f"{BASE_URL}/notes"
    if folder:
        url += f"?folder={folder}"
    async with httpx.AsyncClient(headers={"Authorization": f"Bearer {OBSIDIAN_API_KEY}"}) as client:
        resp = await client.get(url)
        resp.raise_for_status()
        return resp.json()


@app.get("/notes/{path:path}")
async def get_note(path: str):
    async with httpx.AsyncClient(headers={"Authorization": f"Bearer {OBSIDIAN_API_KEY}"}) as client:
        resp = await client.get(f"{BASE_URL}/notes/{path}")
        if resp.status_code == 404:
            raise HTTPException(404, "Note not found")
        resp.raise_for_status()
        return resp.json()


@app.post("/notes")
async def create_note(note: NoteCreate):
    payload = {
        "title": note.title,
        "content": note.content,
    }
    if note.folder:
        payload["folder"] = note.folder

    async with httpx.AsyncClient(headers={"Authorization": f"Bearer {OBSIDIAN_API_KEY}"}) as client:
        resp = await client.post(f"{BASE_URL}/notes", json=payload)
        resp.raise_for_status()
        return resp.json()


@app.post("/search")
async def search_notes(query: str):
    async with httpx.AsyncClient(headers={"Authorization": f"Bearer {OBSIDIAN_API_KEY}"}) as client:
        resp = await client.post(f"{BASE_URL}/search", json={"query": query})
        resp.raise_for_status()
        return resp.json()
