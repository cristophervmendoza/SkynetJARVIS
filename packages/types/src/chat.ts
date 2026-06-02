export type ChatMode = 'chat' | 'document' | 'ppt' | 'code' | 'research' | 'jarvis' | 'image' | 'video' | '3d' | 'teach' | 'gem'

export type MessageRole = 'user' | 'assistant' | 'system' | 'tool'

export type AgentState = 'planning' | 'waiting_approval' | 'executing' | 'reading_files' | 'using_tool' | 'generating_response' | 'finished' | 'error'

export interface Chat {
  id: string
  title: string
  projectId?: string
  userId: string
  mode: ChatMode
  gemId?: string
  modelId?: string
  tags: string[]
  favorite: boolean
  summary?: string
  messageCount: number
  tokenCount: number
  createdAt: string
  updatedAt: string
}

export interface Message {
  id: string
  chatId: string
  role: MessageRole
  content: string
  modelId?: string
  toolCalls?: ToolCall[]
  toolResults?: ToolResult[]
  attachments?: Attachment[]
  metadata?: Record<string, unknown>
  createdAt: string
}

export interface ToolCall {
  id: string
  name: string
  arguments: Record<string, unknown>
  status: 'pending' | 'running' | 'completed' | 'failed'
  result?: ToolResult
}

export interface ToolResult {
  toolCallId: string
  output: string
  error?: string
  duration: number
}

export interface Attachment {
  id: string
  type: 'file' | 'image' | 'link' | 'code' | 'document'
  name: string
  url?: string
  mimeType?: string
  size?: number
}

export interface ChatHistoryFilter {
  search?: string
  projectId?: string
  mode?: ChatMode
  modelId?: string
  tags?: string[]
  dateFrom?: string
  dateTo?: string
  favorite?: boolean
}
