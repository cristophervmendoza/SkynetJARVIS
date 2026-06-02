export interface AppSettings {
  theme: ThemeSettings
  chat: ChatSettings
  editor: EditorSettings
  privacy: PrivacySettings
  notifications: NotificationSettings
}

export interface ThemeSettings {
  mode: 'light' | 'dark' | 'system'
  primaryColor: string
  secondaryColor: string
  backgroundType: 'solid' | 'gradient' | 'image'
  backgroundValue: string
  blurLevel: 0 | 1 | 2 | 3
  roundedCorners: 'none' | 'sm' | 'md' | 'lg'
  fontFamily: string
  fontSize: 'sm' | 'md' | 'lg'
  density: 'compact' | 'comfortable'
}

export interface ChatSettings {
  sidebarPosition: 'left' | 'right'
  showTimestamps: boolean
  showTokenCount: boolean
  autoScroll: boolean
  enterToSend: boolean
  maxContextMessages: number
  showModelBadge: boolean
}

export interface EditorSettings {
  fontFamily: string
  fontSize: number
  lineHeight: number
  wordWrap: boolean
  minimap: boolean
  tabSize: number
  vimMode: boolean
}

export interface PrivacySettings {
  shareAnonymousData: boolean
  saveChatHistory: boolean
  saveMemoryAutomatically: boolean
  autoSummarizeChats: boolean
}

export interface NotificationSettings {
  email: boolean
  desktop: boolean
  sound: boolean
  mentions: boolean
  dailyDigest: boolean
}

export interface ModelConfig {
  id: string
  provider: ModelProvider
  name: string
  displayName: string
  type: 'chat' | 'code' | 'vision' | 'image' | 'video' | 'audio' | 'embedding'
  apiKey: string
  baseUrl?: string
  defaultModel: boolean
  cheapModel?: boolean
  powerfulModel?: boolean
  maxTokens: number
  monthlyLimit?: number
  priority: number
  enabled: boolean
  status: 'connected' | 'error' | 'disabled'
}

export type ModelProvider =
  | 'openai'
  | 'anthropic'
  | 'google'
  | 'grok'
  | 'mistral'
  | 'cohere'
  | 'perplexity'
  | 'deepseek'
  | 'together'
  | 'replicate'
  | 'runway'
  | 'elevenlabs'
  | 'stability'
  | 'ollama'
  | 'lmstudio'
  | 'vllm'
  | 'localai'
  | 'custom'
