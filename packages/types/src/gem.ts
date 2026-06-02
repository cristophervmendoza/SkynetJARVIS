export interface Gem {
  id: string
  name: string
  role: string
  instructions: string
  userId: string
  modelId: string
  allowedTools: string[]
  allowedConnections: string[]
  memoryEnabled: boolean
  responseStyle: 'professional' | 'friendly' | 'technical' | 'creative' | 'custom'
  customStyle?: string
  systemPrompt: string
  baseFiles?: string[]
  icon?: string
  color?: string
  commands: GemCommand[]
  createdAt: string
  updatedAt: string
}

export interface GemCommand {
  trigger: string
  description: string
  action: string
  parameters?: Record<string, unknown>
}

export interface GemTemplate {
  name: string
  role: string
  description: string
  instructions: string
  modelId: string
  icon: string
  color: string
}
