import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowUp, Paperclip, Mic, StopCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ChatInputProps {
  onSend: (message: string) => void
  onStop: () => void
  isStreaming: boolean
  placeholder?: string
}

export function ChatInput({ onSend, onStop, isStreaming, placeholder }: ChatInputProps) {
  const [input, setInput] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`
    }
  }, [input])

  const handleSubmit = () => {
    if (!input.trim() || isStreaming) return
    onSend(input.trim())
    setInput('')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <div className="border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-4xl mx-auto px-4 py-3">
        <div className="relative flex items-end gap-2 bg-muted rounded-2xl border border-border focus-within:border-primary/50 transition-colors">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder ?? 'Escribe un mensaje...'}
            rows={1}
            className="flex-1 bg-transparent resize-none px-4 py-3 text-sm outline-none max-h-[200px] placeholder:text-muted-foreground"
          />

          <div className="flex items-center gap-1 p-1.5">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full text-muted-foreground hover:text-foreground"
              title="Adjuntar archivo"
            >
              <Paperclip className="w-4 h-4" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full text-muted-foreground hover:text-foreground"
              title="Voz"
            >
              <Mic className="w-4 h-4" />
            </Button>

            {isStreaming ? (
              <Button
                size="icon"
                className="h-8 w-8 rounded-full bg-destructive hover:bg-destructive/90"
                onClick={onStop}
                title="Detener"
              >
                <StopCircle className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                size="icon"
                className={cn(
                  'h-8 w-8 rounded-full transition-all',
                  input.trim() ? 'bg-primary hover:bg-primary/90' : 'bg-muted-foreground/20',
                )}
                onClick={handleSubmit}
                disabled={!input.trim()}
                title="Enviar"
              >
                <ArrowUp className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
