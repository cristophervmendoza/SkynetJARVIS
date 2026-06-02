from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI(title="Nexa MCP Gateway", version="0.1.0")

servers: dict[str, dict] = {}


class MCPServerConfig(BaseModel):
    name: str
    transport: str = "stdio"
    command: str | None = None
    args: list[str] = []
    url: str | None = None
    tools: list[str] = []
    enabled: bool = True


class MCPToolCall(BaseModel):
    server: str
    tool: str
    arguments: dict


@app.get("/servers")
async def list_servers():
    return [
        {"name": name, **config}
        for name, config in servers.items()
    ]


@app.post("/servers")
async def add_server(config: MCPServerConfig):
    servers[config.name] = config.model_dump()
    return {"ok": True, "name": config.name}


@app.delete("/servers/{name}")
async def remove_server(name: str):
    if name not in servers:
        raise HTTPException(status_code=404, detail="Server not found")
    del servers[name]
    return {"ok": True}


@app.post("/call")
async def call_tool(request: MCPToolCall):
    if request.server not in servers:
        raise HTTPException(status_code=404, detail="Server not found")

    server = servers[request.server]
    if not server["enabled"]:
        raise HTTPException(status_code=400, detail="Server disabled")

    return {
        "server": request.server,
        "tool": request.tool,
        "arguments": request.arguments,
        "result": {"status": "simulated", "message": f"Tool {request.tool} executed on {request.server}"},
    }


@app.get("/tools")
async def list_tools():
    all_tools = []
    for name, config in servers.items():
        for tool in config.get("tools", []):
            all_tools.append({
                "server": name,
                "name": tool,
                "enabled": config["enabled"],
            })
    return all_tools
