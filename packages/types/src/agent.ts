export type AgentStatus = 'idle' | 'planning' | 'running' | 'waiting_approval' | 'error' | 'completed'

export interface AgentRun {
  id: string
  userId: string
  chatId: string
  goal: string
  plan: AgentStep[]
  status: AgentStatus
  toolsUsed: string[]
  filesAccessed: string[]
  commandsExecuted: string[]
  currentStep: number
  result?: string
  error?: string
  startedAt: string
  completedAt?: string
}

export interface AgentStep {
  id: string
  runId: string
  stepNumber: number
  action: string
  tool?: string
  input: string
  output: string
  status: 'pending' | 'running' | 'completed' | 'failed' | 'needs_approval'
  requiresApproval: boolean
  approved?: boolean
  startedAt?: string
  completedAt?: string
}

export interface AgentPermission {
  id: string
  userId: string
  level: 0 | 1 | 2 | 3 | 4 | 5
  allowedTools: string[]
  allowedPaths: string[]
  allowedCommands: string[]
  requireApproval: string[]
  sandboxEnabled: boolean
  readonly: boolean
}

export type AgentTool =
  | 'read_file'
  | 'write_file'
  | 'edit_file'
  | 'delete_file'
  | 'list_directory'
  | 'execute_command'
  | 'run_terminal'
  | 'search_web'
  | 'read_url'
  | 'take_screenshot'
  | 'mouse_move'
  | 'mouse_click'
  | 'keyboard_type'
  | 'open_app'
  | 'browser_navigate'
  | 'browser_click'
  | 'browser_type'
  | 'run_code'
  | 'search_memory'
  | 'save_memory'
  | 'call_api'
  | 'query_database'
