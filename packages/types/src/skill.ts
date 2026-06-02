export interface Skill {
  id: string
  name: string
  displayName: string
  description: string
  version: string
  author: string
  tools: string[]
  requiresApproval: string[]
  permissions: SkillPermission[]
  memoryPolicy: MemoryPolicy
  icon?: string
  category: string
  installed: boolean
  enabled: boolean
  createdAt: string
}

export interface SkillPermission {
  tool: string
  allowed: boolean
  requireApproval: boolean
}

export interface MemoryPolicy {
  canReadMemory: boolean
  canWriteMemory: boolean
  memoryScope: 'session' | 'project' | 'user'
  maxMemoryItems: number
}

export interface SkillManifest {
  name: string
  description: string
  version: string
  tools: string[]
  requires_approval: string[]
  permissions: SkillPermission[]
  memory_policy: MemoryPolicy
  icon?: string
  category: string
}
