import { useAppStore } from '@/stores/useAppStore'
import { useChatStore } from '@/stores/useChatStore'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Terminal, Search, Sun, Moon, User, Settings as SettingsIcon,
} from 'lucide-react'
import { cn } from '@/lib/utils'

export function TopBar() {
  const { theme, setTheme, toggleTerminal } = useAppStore()
  const { currentChat } = useChatStore()

  return (
    <header className="h-12 border-b border-border flex items-center justify-between px-4 bg-background/80 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        {currentChat && (
          <span className="text-sm font-medium truncate max-w-md">
            {currentChat.title}
          </span>
        )}
      </div>

      <div className="flex items-center gap-2">
        <div className="relative hidden md:block">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <Input
            placeholder="Buscar..."
            className="h-8 w-48 pl-8 text-xs"
          />
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={toggleTerminal}
          title="Terminal"
        >
          <Terminal className="w-4 h-4" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          title="Toggle theme"
        >
          {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </Button>

        <Button variant="ghost" size="icon" className="h-8 w-8" title="Settings">
          <SettingsIcon className="w-4 h-4" />
        </Button>

        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" title="User">
          <User className="w-4 h-4" />
        </Button>
      </div>
    </header>
  )
}
