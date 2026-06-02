export interface Document {
  id: string
  title: string
  content: string
  contentType: 'markdown' | 'pdf' | 'docx' | 'txt' | 'html'
  projectId?: string
  userId: string
  tags: string[]
  version: number
  fileUrl?: string
  fileSize?: number
  sourceUrl?: string
  summary?: string
  createdAt: string
  updatedAt: string
}

export interface DocumentChunk {
  id: string
  documentId: string
  content: string
  embedding: number[]
  metadata: Record<string, unknown>
  pageNumber?: number
  chunkIndex: number
}

export interface DocumentTemplate {
  id: string
  name: string
  description: string
  content: string
  category: 'report' | 'letter' | 'note' | 'article' | 'custom'
  createdAt: string
}
