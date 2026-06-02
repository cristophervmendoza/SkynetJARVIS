# SkynetJARVIS_Local1 (Nexa AI Workspace)

Plataforma todo-en-uno que combina Chat IA, Documentos, PPTs, Código, Investigación, Imagen, Video, Agente local, Terminal y más.

## Requisitos

| Herramienta | Version |
|-------------|---------|
| Node.js | 18+ |
| Python | 3.11+ |
| PostgreSQL | 16+ (opcional, sin DB arranca igual) |

## Instalacion

```cmd
:: 1. Clonar e instalar todo automaticamente
install.bat
```

O manualmente:

```cmd
npm install
pip install -r services/api/requirements.txt
```

## Iniciar

```cmd
:: Abre API (8000) + Web (3000) en ventanas separadas
start.bat
```

O desde npm:

```cmd
:: Los dos a la vez en la misma terminal
npm run dev

:: O separados:
npm run dev:web     :: http://localhost:3000
npm run dev:api     :: http://localhost:8000
```

## Estructura del proyecto

```
SkynetJARVIS_Local1/
├── apps/
│   ├── web/              Next.js + Tailwind (frontend)
│   └── desktop/          Electron + Terminal (app escritorio)
├── services/
│   ├── api/              FastAPI (backend)
│   ├── ai-orchestrator/  Ruteo de modelos IA
│   └── mcp-gateway/      Conexion MCP
├── packages/
│   ├── types/            Tipos compartidos (TypeScript)
│   ├── config/           Configuraciones y constantes
│   ├── database/         Schema Prisma + pgvector
│   └── prompts/          System prompts y comandos
├── agents/               Agentes locales
├── mcp-servers/          Servidores MCP (Obsidian, Google)
├── docs/                 Documentacion
├── install.bat           Instalacion automatica
└── start.bat             Inicio rapido
```

## Paginas disponibles

| Pagina | Ruta |
|--------|------|
| Chat | `/` |
| Dashboard | `/dashboard` |
| Proyectos | `/projects` |
| Documentos | `/documents` |
| Configuracion | `/settings` |
| Login | `/login` |

## Modos (proximamente)

Chat, Documentos, PPTs, Codigo, Investigacion, Imagen, Video, Diseño 3D, Enseñar, Gems, Jarvis.

## Comandos rapidos

Escribe `/` en el chat para ver todos los comandos:

- `/new` Nuevo chat
- `/project` Info del proyecto
- `/memory` Guardar en memoria
- `/agent` Modo agente
- `/terminal` Abrir terminal
- `/mcp` Estado MCP

## Tecnologias

- **Frontend**: Next.js, React, TypeScript, Tailwind, shadcn/ui
- **Backend**: FastAPI, SQLAlchemy, PostgreSQL + pgvector
- **Desktop**: Electron, xterm.js, node-pty
- **IA**: OpenAI, Anthropic, Google Gemini (pluggable)
- **Infra**: Docker, Redis, Stripe
