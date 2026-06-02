import { create } from 'zustand'
import type { Chat, Message, ChatMode } from '@nexa/types'

interface ChatState {
  chats: Chat[]
  currentChat: Chat | null
  messages: Message[]
  isStreaming: boolean
  isLoading: boolean
  setChats: (chats: Chat[]) => void
  setCurrentChat: (chat: Chat | null) => void
  setMessages: (messages: Message[]) => void
  addMessage: (message: Message) => void
  updateLastMessage: (content: string) => void
  setIsStreaming: (streaming: boolean) => void
  setIsLoading: (loading: boolean) => void
  createChat: (mode: ChatMode, title?: string) => Chat
}

export const useChatStore = create<ChatState>((set, get) => ({
  chats: [],
  currentChat: null,
  messages: [],
  isStreaming: false,
  isLoading: false,

  setChats: (chats) => set({ chats }),
  setCurrentChat: (chat) => set({ currentChat: chat }),
  setMessages: (messages) => set({ messages }),

  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),

  updateLastMessage: (content) =>
    set((state) => {
      const messages = [...state.messages]
      const last = messages[messages.length - 1]
      if (last) {
        messages[messages.length - 1] = { ...last, content }
      }
      return { messages }
    }),

  setIsStreaming: (isStreaming) => set({ isStreaming }),
  setIsLoading: (isLoading) => set({ isLoading }),

  createChat: (mode, title) => {
    const chat: Chat = {
      id: crypto.randomUUID(),
      title: title ?? `New ${mode} chat`,
      userId: 'current',
      mode,
      tags: [],
      favorite: false,
      messageCount: 0,
      tokenCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    set((state) => ({
      chats: [chat, ...state.chats],
      currentChat: chat,
      messages: [],
    }))
    return chat
  },
}))
