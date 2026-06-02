export type Permission =
  | 'chat.read'
  | 'chat.write'
  | 'project.create'
  | 'project.delete'
  | 'document.upload'
  | 'document.delete'
  | 'terminal.run'
  | 'terminal.admin'
  | 'computer.control'
  | 'google.read'
  | 'google.write'
  | 'obsidian.read'
  | 'obsidian.write'
  | 'billing.manage'
  | 'api_keys.manage'
  | 'mcp.manage'
  | 'team.manage'
  | 'settings.manage'
  | 'audit.view'

export const RolePermissions: Record<string, Permission[]> = {
  owner: [
    'chat.read', 'chat.write', 'project.create', 'project.delete',
    'document.upload', 'document.delete', 'terminal.run', 'terminal.admin',
    'computer.control', 'google.read', 'google.write', 'obsidian.read',
    'obsidian.write', 'billing.manage', 'api_keys.manage', 'mcp.manage',
    'team.manage', 'settings.manage', 'audit.view',
  ],
  admin: [
    'chat.read', 'chat.write', 'project.create', 'project.delete',
    'document.upload', 'document.delete', 'terminal.run', 'terminal.admin',
    'computer.control', 'google.read', 'google.write', 'obsidian.read',
    'obsidian.write', 'billing.manage', 'api_keys.manage', 'mcp.manage',
    'team.manage', 'settings.manage', 'audit.view',
  ],
  developer: [
    'chat.read', 'chat.write', 'project.create', 'document.upload',
    'terminal.run', 'google.read', 'obsidian.read', 'obsidian.write',
    'mcp.manage',
  ],
  designer: [
    'chat.read', 'chat.write', 'project.create', 'document.upload',
    'google.read', 'obsidian.read', 'obsidian.write',
  ],
  researcher: [
    'chat.read', 'chat.write', 'document.upload', 'google.read',
    'obsidian.read',
  ],
  user: [
    'chat.read', 'chat.write', 'project.create', 'document.upload',
    'google.read', 'obsidian.read',
  ],
  viewer: [
    'chat.read', 'google.read', 'obsidian.read',
  ],
}

export interface AuditLog {
  id: string
  userId: string
  action: string
  resource: string
  resourceId?: string
  details?: Record<string, unknown>
  ip: string
  userAgent?: string
  timestamp: string
}
