# Nexa AI Workspace - Architecture

## System Overview

Nexa AI Workspace is an all-in-one AI platform combining chat, documents, code, research, design, and automation.

## Architecture Diagram

```
Nexa AI Platform
│
├── Web App (Next.js + React)
│   ├── Chat / Documentos / PPTs / Proyectos
│   ├── Historial / Gems / Skills
│   ├── Configuración / Suscripción / Conexiones
│
├── Desktop App (Electron)
│   ├── Chromium embebido / Terminal integrada
│   ├── Control de computadora / Agente local
│   ├── Acceso a archivos / Obsidian / Automatización
│
├── Backend (FastAPI + PostgreSQL)
│   ├── Usuarios / Roles / Pagos / Historial
│   ├── API Gateway / Seguridad / Logs / Auditoría
│
├── AI Orchestrator
│   ├── OpenAI / Anthropic / Google Gemini / Grok
│   ├── Modelos locales / RAG / Memoria / Tools
│
├── MCP Gateway
│   ├── Google MCP / Obsidian MCP / Files MCP
│   ├── Browser MCP / Database MCP / Custom MCP
│
└── Local Agent
    ├── Terminal / File System / Apps
    ├── Browser Automation / Screenshots / OCR
    └── Mouse/Keyboard / Permisos
```

## Tech Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS, shadcn/ui
- **Desktop**: Electron, xterm.js, node-pty
- **Backend**: FastAPI (Python), SQLAlchemy, PostgreSQL + pgvector
- **AI**: OpenAI, Anthropic, Google Gemini (pluggable providers)
- **Queue**: Redis + Celery
- **Auth**: JWT + OAuth (Google)
- **Payments**: Stripe

## Key Design Decisions

1. Monorepo with npm workspaces
2. API-first design with streaming responses
3. Plugin architecture via MCP protocol
4. Local-first for desktop agent capabilities
5. Vector embeddings for RAG and memory
