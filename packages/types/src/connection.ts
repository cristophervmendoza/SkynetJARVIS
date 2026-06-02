import type { ModelProvider } from './settings'

export type ConnectionProvider = 'google' | 'obsidian' | 'github' | 'notion' | 'slack' | 'figma' | 'blender' | 'custom'

export type ConnectionStatus = 'connected' | 'disconnected' | 'error' | 'expired'

export interface Connection {
  id: string
  userId: string
  provider: ConnectionProvider
  name: string
  status: ConnectionStatus
  scopes: string[]
  accessToken?: string
  refreshToken?: string
  expiresAt?: string
  lastUsed?: string
  metadata?: Record<string, unknown>
  createdAt: string
  updatedAt: string
}

export interface GoogleConnection {
  id: string
  email: string
  driveEnabled: boolean
  docsEnabled: boolean
  sheetsEnabled: boolean
  slidesEnabled: boolean
  gmailEnabled: boolean
  calendarEnabled: boolean
  contactsEnabled: boolean
  scopes: string[]
  lastSync?: string
}

export interface ObsidianConnection {
  id: string
  vaultPath: string
  vaultName: string
  noteCount: number
  lastSync: string
  pluginVersion: string
  apiPort: number
  localOnly: boolean
}

export interface ApiKey {
  id: string
  userId: string
  name: string
  key: string
  provider: ModelProvider
  scopes: string[]
  lastUsed?: string
  expiresAt?: string
  createdAt: string
}
