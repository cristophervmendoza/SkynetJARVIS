import type { SubscriptionTier } from './billing'

export type UserRole = 'owner' | 'admin' | 'developer' | 'designer' | 'researcher' | 'user' | 'viewer'

export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  role: UserRole
  organizationId: string
  workspaceIds: string[]
  preferences: UserPreferences
  createdAt: string
  updatedAt: string
}

export interface UserPreferences {
  theme: ThemeMode
  primaryColor: string
  fontSize: 'sm' | 'md' | 'lg'
  sidebarPosition: 'left' | 'right'
  density: 'compact' | 'comfortable'
  terminalVisible: boolean
  blurEnabled: boolean
  backgroundImage?: string
}

export type ThemeMode = 'light' | 'dark' | 'system'

export interface Session {
  id: string
  userId: string
  token: string
  device: string
  ip: string
  expiresAt: string
  createdAt: string
}

export interface Account {
  id: string
  userId: string
  provider: 'google' | 'github' | 'email' | 'azure' | 'apple'
  providerAccountId: string
  accessToken?: string
  refreshToken?: string
  expiresAt?: number
}

export interface Organization {
  id: string
  name: string
  slug: string
  plan: SubscriptionTier
  ownerId: string
  createdAt: string
  updatedAt: string
}
