"""
Google MCP Server - Connects to Google APIs (Drive, Docs, Gmail, Calendar).
"""
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import httpx
import os

app = FastAPI(title="Google MCP Server", version="0.1.0")


class GoogleAuth(BaseModel):
    access_token: str


@app.post("/drive/list")
async def list_drive_files(auth: GoogleAuth, folder_id: str = "root"):
    headers = {"Authorization": f"Bearer {auth.access_token}"}
    async with httpx.AsyncClient(headers=headers) as client:
        resp = await client.get(
            "https://www.googleapis.com/drive/v3/files",
            params={
                "q": f"'{folder_id}' in parents and trashed=false",
                "pageSize": 20,
                "fields": "files(id,name,mimeType,size,createdTime,modifiedTime)",
            },
        )
        resp.raise_for_status()
        return resp.json()


@app.post("/drive/upload")
async def upload_to_drive(auth: GoogleAuth, name: str, content: str, mime_type: str = "text/plain"):
    headers = {"Authorization": f"Bearer {auth.access_token}"}
    metadata = {"name": name, "mimeType": mime_type}

    async with httpx.AsyncClient(headers=headers) as client:
        resp = await client.post(
            "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart",
            data={"metadata": metadata, "content": content},
        )
        resp.raise_for_status()
        return resp.json()


@app.post("/gmail/list")
async def list_emails(auth: GoogleAuth, max_results: int = 10):
    headers = {"Authorization": f"Bearer {auth.access_token}"}
    async with httpx.AsyncClient(headers=headers) as client:
        resp = await client.get(
            "https://gmail.googleapis.com/gmail/v1/users/me/messages",
            params={"maxResults": max_results},
        )
        resp.raise_for_status()
        return resp.json()


@app.post("/calendar/events")
async def list_events(auth: GoogleAuth, max_results: int = 10):
    headers = {"Authorization": f"Bearer {auth.access_token}"}
    async with httpx.AsyncClient(headers=headers) as client:
        resp = await client.get(
            "https://www.googleapis.com/calendar/v3/calendars/primary/events",
            params={"maxResults": max_results, "orderBy": "startTime", "singleEvents": True},
        )
        resp.raise_for_status()
        return resp.json()
