from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import subprocess
import os
import platform

app = FastAPI(title="Nexa Local Agent", version="0.1.0")


class CommandRequest(BaseModel):
    command: str
    cwd: str | None = None
    timeout: int = 30


class FileReadRequest(BaseModel):
    path: str


class FileWriteRequest(BaseModel):
    path: str
    content: str


class ScreenshotRequest(BaseModel):
    monitor: int = 0


@app.post("/execute")
async def execute_command(req: CommandRequest):
    try:
        result = subprocess.run(
            req.command,
            shell=True,
            cwd=req.cwd or os.getcwd(),
            capture_output=True,
            text=True,
            timeout=req.timeout,
        )
        return {
            "stdout": result.stdout,
            "stderr": result.stderr,
            "returncode": result.returncode,
        }
    except subprocess.TimeoutExpired:
        raise HTTPException(status_code=408, detail="Command timed out")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/file")
async def read_file(path: str):
    if not os.path.exists(path):
        raise HTTPException(status_code=404, detail="File not found")
    try:
        with open(path, "r", encoding="utf-8") as f:
            content = f.read()
        return {"path": path, "content": content, "size": len(content)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/file")
async def write_file(req: FileWriteRequest):
    try:
        os.makedirs(os.path.dirname(req.path), exist_ok=True)
        with open(req.path, "w", encoding="utf-8") as f:
            f.write(req.content)
        return {"path": req.path, "status": "written"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/system")
async def system_info():
    uname = platform.uname()
    return {
        "system": uname.system,
        "node": uname.node,
        "release": uname.release,
        "version": uname.version,
        "machine": uname.machine,
        "processor": uname.processor,
        "cwd": os.getcwd(),
    }


@app.get("/processes")
async def list_processes():
    import psutil
    processes = []
    for proc in psutil.process_iter(["pid", "name", "cpu_percent", "memory_percent"]):
        try:
            processes.append(proc.info)
        except (psutil.NoSuchProcess, psutil.AccessDenied):
            pass
    return sorted(processes, key=lambda p: p.get("cpu_percent", 0), reverse=True)[:50]
