export interface Project {
  id: string
  name: string
  description?: string
  userId: string
  workspaceId: string
  status: 'active' | 'archived' | 'completed'
  tags: string[]
  skills: string[]
  gemIds: string[]
  connections: string[]
  chatIds: string[]
  documentIds: string[]
  memoryCount: number
  createdAt: string
  updatedAt: string
}

export interface Workspace {
  id: string
  name: string
  organizationId: string
  members: WorkspaceMember[]
  settings: WorkspaceSettings
  createdAt: string
  updatedAt: string
}

export interface WorkspaceMember {
  userId: string
  role: string
  joinedAt: string
}

export interface WorkspaceSettings {
  defaultModel?: string
  allowedModes: string[]
  maxProjects: number
  maxStorage: number
}

export interface Task {
  id: string
  projectId: string
  title: string
  description?: string
  status: 'todo' | 'in_progress' | 'done'
  priority: 'low' | 'medium' | 'high'
  assignedTo?: string
  createdAt: string
  updatedAt: string
}
