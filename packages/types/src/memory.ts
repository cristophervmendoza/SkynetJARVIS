export type MemoryLevel = 'session' | 'user' | 'project' | 'external'

export interface Memory {
  id: string
  userId: string
  projectId?: string
  level: MemoryLevel
  type: 'note' | 'decision' | 'fact' | 'preference' | 'learning' | 'task' | 'idea' | 'summary'
  title: string
  content: string
  embedding: number[]
  tags: string[]
  source?: string
  sourceUrl?: string
  importance: number
  externalSource?: 'obsidian' | 'google_drive' | 'notion'
  externalPath?: string
  createdAt: string
  updatedAt: string
}

export interface MemorySearchResult {
  memory: Memory
  relevance: number
  context?: string
}

export interface ObsidianVault {
  id: string
  name: string
  path: string
  notes: number
  lastSync: string
  connected: boolean
}
