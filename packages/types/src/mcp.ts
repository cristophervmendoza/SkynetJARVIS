export interface MCPServer {
  id: string
  name: string
  description: string
  type: 'builtin' | 'custom' | 'marketplace'
  transport: 'stdio' | 'http' | 'websocket'
  command?: string
  args?: string[]
  url?: string
  tools: MCPTool[]
  prompts: MCPPrompt[]
  enabled: boolean
  userId?: string
  permissions: MCPPermission[]
  status: 'connected' | 'disconnected' | 'error'
  lastUsed?: string
  createdAt: string
}

export interface MCPTool {
  name: string
  description: string
  inputSchema: Record<string, unknown>
  serverId: string
  category: string
  requiresApproval: boolean
}

export interface MCPPrompt {
  name: string
  description: string
  arguments: MCPPromptArgument[]
  serverId: string
}

export interface MCPPromptArgument {
  name: string
  description: string
  required: boolean
}

export interface MCPPermission {
  toolName: string
  allowed: boolean
  requireApproval: boolean
  maxUsagePerSession?: number
}

export interface MCPMarketplaceItem {
  id: string
  name: string
  description: string
  author: string
  version: string
  tools: string[]
  downloads: number
  rating: number
  verified: boolean
}
