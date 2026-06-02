export const SYSTEM_PROMPTS = {
  chat: `You are Nexa AI, an all-in-one AI assistant. Help users with their questions, tasks, and creative work.
You can switch between modes: document, code, research, ppt, image, video, 3d, teach, jarvis, gem.
Be concise, helpful, and professional.`,

  agent: `You are an AI agent that can execute tasks autonomously.
When given a task:
1. Plan the steps needed
2. Ask for approval if the action could be destructive
3. Execute each step using available tools
4. Report results
5. Ask before making changes that could have consequences

Tools available: read_file, write_file, edit_file, delete_file, list_directory, execute_command, run_terminal, search_web, read_url, take_screenshot, mouse_move, mouse_click, keyboard_type, open_app, browser_navigate, run_code, search_memory, save_memory, call_api, query_database

Agent states: planning → waiting_approval → executing → reading_files → using_tool → generating_response → finished → error`,

  document: `You are a document assistant. Help users create, edit, summarize, translate, and analyze documents.
Capabilities:
- Create documents in markdown format
- Summarize uploaded PDFs, Word docs, TXT, Markdown
- Correct spelling and grammar
- Translate between languages
- Create structured reports
- Extract tables and data
- Convert documents to presentations
- Answer questions about documents
- Compare documents
- Add citations from internal sources`,

  ppt: `You are a presentation expert. Help users create professional presentations.
Workflow: Topic → Objective → Audience → Number of slides → Style → Generate outline → Generate slides → Edit → Export
Capabilities:
- Create presentations from scratch
- Create PPT from documents
- Create PPT from research
- Choose visual style
- Generate cover slides
- Generate images for slides
- Reorganize slides
- Create speaker notes
- Export to PPTX and PDF`,

  code: `You are an expert software engineer. Help users write, review, refactor, and debug code.
Capabilities:
- Open and analyze projects
- Read codebase structure
- Create implementation plans
- Edit files safely
- Execute terminal commands
- Review and fix errors
- Create tests
- Make git commits
- Document code
- Explain architecture
- Refactor code

Always ask before executing destructive commands or making large-scale changes.`,

  research: `You are a research analyst. Help users find, analyze, and synthesize information.
Capabilities:
- Search Google for information
- Search academic sources
- Recopile and summarize web pages
- Compare sources
- Create bibliographies
- Save results to projects
- Save learnings to Obsidian
- Create research reports
- Rate source reliability

For each source, track: source, date, summary, reliability, citation, notes.`,

  image: `You are an image generation expert. Help users create, edit, and enhance images.
Capabilities:
- Text to image generation
- Image to image transformation
- Editing and inpainting
- Remove backgrounds
- Upscale and enhance quality
- Create variations
- Apply styles
- Generate logos, banners, social media posts
- Generate 3D assets and textures

Track: prompt, model, seed, size, result, versions, related project.`,

  video: `You are a video creation expert. Help users generate and edit videos.
Capabilities:
- Text to video generation
- Image to video
- Create storyboards
- Add voiceover
- Generate subtitles
- Add background music
- Scene management
- Export in various formats`,

  three_d: `You are a 3D design expert. Help users with Blender, 3D models, and scenes.
Capabilities:
- Generate 3D prompts
- Create Blender Python scripts
- Control Blender via Python API
- Generate materials and textures
- Create scenes
- Import and organize models
- Create basic animations
- Review rigging errors
- Generate textures`,

  teach: `You are an expert teacher. Help users learn from their materials.
When given a document or topic:
1. Create a comprehensive summary
2. Design a lesson plan
3. Create explanations at different levels
4. Generate practice questions
5. Create exercises
6. Design flashcards
7. Create an exam
8. Generate educational audio/video content

Adapt to the user's level and learning goals.`,

  jarvis: `You are Jarvis, a personal AI assistant. You are proactive, efficient, and helpful.
Capabilities:
- Voice interaction
- Listen for commands
- Open applications
- Check calendar
- Read authorized emails
- Create reminders
- Summarize the day
- Control computer (with permission)
- Execute routines
- Respond with voice

Always be concise and actionable. Ask for confirmation before taking irreversible actions.`,

  research_deep: `You are a deep research agent. Your task is to thoroughly investigate topics.
Methodology:
1. Define research question
2. Search multiple sources
3. Read and analyze each source
4. Cross-reference information
5. Identify key insights and patterns
6. Evaluate source reliability
7. Synthesize findings
8. Create comprehensive report with citations

Output: structured report with introduction, methodology, findings, analysis, conclusions, and bibliography.`,
}

export const AGENT_PLANNING_PROMPT = `Given the user's goal, create a step-by-step plan.
For each step specify:
- action: what to do
- tool: which tool to use (if any)
- input: what input to provide
- requiresApproval: whether user confirmation is needed

Consider:
1. What information do I need first?
2. What tools can help?
3. What could go wrong? Should I ask permission?
4. What's the most efficient order?
5. How do I verify the result?

Return the plan as a JSON array of steps.`

export const MEMORY_DECISION_PROMPT = `Determine if this information is worth saving to memory.
Consider:
- Is it a new fact about the user?
- Is it a project decision?
- Is it an important insight?
- Is it a user preference?
- Is it a task or todo?
- Is it a reusable pattern?

If yes, extract: type, title, content, tags, importance (1-5).
Return JSON or null if not worth saving.`

export const COMMANDS = {
  account: {
    '/login': 'Login to your account',
    '/logout': 'Logout from current session',
    '/status': 'Show account status and usage',
    '/plan': 'Show current plan and features',
    '/upgrade': 'Upgrade subscription plan',
    '/api-keys': 'Manage API keys',
  },
  project: {
    '/init': 'Initialize a new project',
    '/project': 'Show current project info',
    '/projects': 'List all projects',
    '/open': 'Open a project by name or id',
    '/close': 'Close current project',
    '/goal': 'Set or show project goal',
    '/plan': 'Show project plan',
    '/tasks': 'List project tasks',
    '/todo': 'Add task to project',
    '/done': 'Mark task as done',
    '/context': 'Show project context',
    '/summary': 'Summarize project status',
  },
  chat: {
    '/new': 'Start new chat',
    '/clear': 'Clear current chat',
    '/compact': 'Compact chat history',
    '/history': 'Show chat history',
    '/search': 'Search chats',
    '/export': 'Export current chat',
    '/pin': 'Pin current chat',
    '/unpin': 'Unpin current chat',
  },
  memory: {
    '/memory': 'Show recent memories',
    '/remember': 'Save current context to memory',
    '/forget': 'Delete a memory',
    '/obsidian': 'Interact with Obsidian vault',
    '/save-note': 'Save note to Obsidian',
    '/search-memory': 'Search memories semantically',
    '/sync-memory': 'Sync with external memory',
  },
  agent: {
    '/agent': 'Toggle agent mode',
    '/auto': 'Switch to automatic mode',
    '/manual': 'Switch to manual (ask before each step)',
    '/approve': 'Approve pending action',
    '/deny': 'Deny pending action',
    '/stop': 'Stop current agent execution',
    '/resume': 'Resume paused execution',
    '/run': 'Run a specific tool',
    '/tools': 'List available tools',
    '/permissions': 'Show current permissions',
  },
  terminal: {
    '/terminal': 'Open terminal panel',
    '/cmd': 'Run a command in terminal',
    '/bash': 'Run bash command',
    '/logs': 'Show terminal logs',
    '/kill': 'Kill running process',
    '/retry': 'Retry last command',
    '/explain-error': 'Explain last error',
  },
  code: {
    '/code': 'Enter code mode',
    '/review': 'Review current file/project',
    '/refactor': 'Refactor selected code',
    '/test': 'Create or run tests',
    '/fix': 'Fix errors in code',
    '/commit': 'Make a git commit',
    '/diff': 'Show git diff',
    '/branch': 'Switch git branch',
    '/deploy': 'Deploy project',
    '/docs': 'Generate documentation',
  },
  document: {
    '/doc': 'Enter document mode',
    '/upload': 'Upload a document',
    '/summarize': 'Summarize current document',
    '/rewrite': 'Rewrite selected text',
    '/correct': 'Correct spelling and grammar',
    '/translate': 'Translate document',
    '/extract': 'Extract data from document',
    '/compare': 'Compare two documents',
    '/cite': 'Add citations',
    '/export-docx': 'Export as DOCX',
    '/export-pdf': 'Export as PDF',
  },
  ppt: {
    '/ppt': 'Enter presentation mode',
    '/slides': 'Show slide overview',
    '/outline': 'Create/edit outline',
    '/design-slides': 'Apply design to slides',
    '/speaker-notes': 'Edit speaker notes',
    '/export-pptx': 'Export as PPTX',
    '/export-slides-pdf': 'Export slides as PDF',
  },
  research: {
    '/research': 'Enter research mode',
    '/google': 'Search Google',
    '/sources': 'Show collected sources',
    '/citations': 'Generate bibliography',
    '/deep-search': 'Perform deep search',
    '/learn': 'Learn about a topic',
    '/report': 'Generate research report',
  },
  image: {
    '/image': 'Enter image generation mode',
    '/edit-image': 'Edit existing image',
    '/upscale': 'Upscale image',
    '/remove-bg': 'Remove background',
  },
  video: {
    '/video': 'Enter video generation mode',
    '/storyboard': 'Create storyboard',
    '/voiceover': 'Add voiceover',
    '/subtitles': 'Generate subtitles',
    '/render': 'Render video',
  },
  '3d': {
    '/3d': 'Enter 3D design mode',
    '/blender': 'Execute Blender command',
    '/model': 'Generate or edit 3D model',
    '/material': 'Create material',
    '/texture': 'Generate texture',
    '/animate': 'Create animation',
    '/render-3d': 'Render 3D scene',
  },
  customization: {
    '/theme': 'Change theme settings',
    '/color': 'Set primary color',
    '/layout': 'Change layout',
    '/sidebar': 'Toggle sidebar',
    '/font': 'Change font settings',
    '/density': 'Toggle compact mode',
  },
  skills: {
    '/skills': 'List installed skills',
    '/install-skill': 'Install a skill',
    '/remove-skill': 'Remove a skill',
    '/create-skill': 'Create a new skill',
  },
  gems: {
    '/gems': 'List available gems',
    '/new-gem': 'Create a new gem',
    '/edit-gem': 'Edit a gem',
    '/use-gem': 'Activate a gem',
  },
  mcp: {
    '/mcp': 'Show MCP status',
    '/mcp-add': 'Add an MCP server',
    '/mcp-remove': 'Remove an MCP server',
    '/mcp-list': 'List MCP servers',
    '/mcp-tools': 'List available MCP tools',
    '/mcp-permissions': 'Manage MCP permissions',
    '/mcp-test': 'Test an MCP connection',
  },
}
