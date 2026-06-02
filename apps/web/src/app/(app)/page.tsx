'use client'

import { useChatStore } from '@/stores/useChatStore'
import { ChatMessage } from '@/components/chat/chat-message'
import { ChatInput } from '@/components/chat/chat-input'
import { cn } from '@/lib/utils'
import { MessageSquare, Sparkles, Command } from 'lucide-react'

const suggestions = [
  'Revisa mi proyecto y dime cómo mejorarlo',
  'Crea una presentación sobre este tema',
  'Resume este documento para mí',
  'Ayúdame a planificar esta tarea',
  'Busca información sobre inteligencia artificial',
  'Escribe un script para automatizar respaldos',
]

export default function ChatPage() {
  const { messages, isStreaming, addMessage, setIsStreaming, updateLastMessage, createChat, currentChat } = useChatStore()

  const handleSend = async (content: string) => {
    if (!currentChat) {
      createChat('chat')
    }

    addMessage({
      id: crypto.randomUUID(),
      chatId: currentChat?.id ?? 'new',
      role: 'user',
      content,
      createdAt: new Date().toISOString(),
    })

    setIsStreaming(true)

    addMessage({
      id: crypto.randomUUID(),
      chatId: currentChat?.id ?? 'new',
      role: 'assistant',
      content: '',
      createdAt: new Date().toISOString(),
    })

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: content,
          chatId: currentChat?.id,
          mode: 'chat',
        }),
      })

      if (!res.body) return

      const reader = res.body.getReader()
      const decoder = new TextDecoder()

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const text = decoder.decode(value)
        updateLastMessage(text)
      }
    } catch (error) {
      updateLastMessage('Lo siento, ocurrió un error al conectar con el servidor.')
    } finally {
      setIsStreaming(false)
    }
  }

  const handleStop = () => {
    setIsStreaming(false)
  }

  const hasMessages = messages.length > 0

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto">
        {!hasMessages ? (
          <div className="h-full flex flex-col items-center justify-center px-4">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
              <Command className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Nexa AI Workspace</h1>
            <p className="text-muted-foreground text-sm mb-8 text-center max-w-md">
              Tu asistente todo-en-uno. Pregunta, investiga, crea y automatiza.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-w-lg w-full">
              {suggestions.map((suggestion, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(suggestion)}
                  className="text-left text-sm p-3 rounded-xl border border-border hover:bg-muted hover:border-primary/30 transition-all"
                >
                  <span className="line-clamp-2">{suggestion}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto py-4">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {isStreaming && (
              <div className="flex gap-3 px-4 py-3">
                <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-muted-foreground animate-pulse" />
                </div>
                <div className="typing-indicator">
                  <span></span><span></span><span></span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <ChatInput
        onSend={handleSend}
        onStop={handleStop}
        isStreaming={isStreaming}
      />
    </div>
  )
}
