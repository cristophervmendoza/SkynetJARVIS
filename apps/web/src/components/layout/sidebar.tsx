import { cn } from '@/lib/utils'
import { useAppStore } from '@/stores/useAppStore'
import { useRouter, usePathname } from 'next/navigation'
import {
  MessageSquare, FileText, Presentation, Code, Search, Image,
  Video, Box, GraduationCap, Bot, Gem, Settings, History,
  ChevronLeft, ChevronRight, Command, Plus,
} from 'lucide-react'

const modes = [
  { id: 'chat', icon: MessageSquare, label: 'Chat', color: 'text-blue-400' },
  { id: 'documents', icon: FileText, label: 'Documentos', color: 'text-emerald-400' },
  { id: 'ppt', icon: Presentation, label: 'PPTs', color: 'text-orange-400' },
  { id: 'code', icon: Code, label: 'Código', color: 'text-violet-400' },
  { id: 'research', icon: Search, label: 'Investigación', color: 'text-cyan-400' },
  { id: 'image', icon: Image, label: 'Imagen', color: 'text-pink-400' },
  { id: 'video', icon: Video, label: 'Video', color: 'text-red-400' },
  { id: 'design-3d', icon: Box, label: '3D', color: 'text-indigo-400' },
  { id: 'teach', icon: GraduationCap, label: 'Enseñar', color: 'text-yellow-400' },
  { id: 'gems', icon: Gem, label: 'Gems', color: 'text-purple-400' },
  { id: 'jarvis', icon: Bot, label: 'Jarvis', color: 'text-amber-400' },
]

const bottomLinks = [
  { id: 'history', icon: History, label: 'Historial', href: '/history' },
  { id: 'settings', icon: Settings, label: 'Configuración', href: '/settings' },
]

export function Sidebar() {
  const { sidebarOpen, toggleSidebar, setCurrentMode } = useAppStore()
  const router = useRouter()
  const pathname = usePathname()

  const handleModeClick = (modeId: string) => {
    setCurrentMode(modeId)
    const path = modeId === 'chat' ? '/' : `/${modeId}`
    router.push(path)
  }

  return (
    <aside
      className={cn(
        'h-screen bg-sidebar text-sidebar-foreground flex flex-col border-r border-border relative transition-all duration-300',
        sidebarOpen ? 'w-60' : 'w-16',
      )}
    >
      <div className={cn('flex items-center p-4 border-b border-sidebar-accent', sidebarOpen ? 'justify-between' : 'justify-center')}>
        {sidebarOpen && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Command className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-semibold text-sm">Nexa AI</span>
          </div>
        )}
        <button
          onClick={toggleSidebar}
          className="p-1.5 rounded-lg hover:bg-sidebar-accent transition-colors"
        >
          {sidebarOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </button>
      </div>

      {sidebarOpen && (
        <div className="px-3 pt-3">
          <button
            onClick={() => {
              setCurrentMode('chat')
              router.push('/')
            }}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-medium"
          >
            <Plus className="w-4 h-4" />
            <span>Nuevo Chat</span>
          </button>
        </div>
      )}

      <nav className="flex-1 px-2 py-3 space-y-1 overflow-y-auto">
        {modes.map((mode) => {
          const Icon = mode.icon
          const isActive = pathname === `/${mode.id}` || (mode.id === 'chat' && pathname === '/')
          return (
            <button
              key={mode.id}
              onClick={() => handleModeClick(mode.id)}
              className={cn(
                'w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all text-sm',
                isActive
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                  : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                !sidebarOpen && 'justify-center px-2',
              )}
              title={mode.label}
            >
              <Icon className={cn('w-4 h-4 shrink-0', mode.color)} />
              {sidebarOpen && <span>{mode.label}</span>}
            </button>
          )
        })}
      </nav>

      <div className="px-2 py-3 border-t border-sidebar-accent space-y-1">
        {bottomLinks.map((link) => {
          const Icon = link.icon
          const isActive = pathname === link.href
          return (
            <button
              key={link.id}
              onClick={() => router.push(link.href)}
              className={cn(
                'w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all text-sm',
                isActive
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                  : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                !sidebarOpen && 'justify-center px-2',
              )}
              title={link.label}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {sidebarOpen && <span>{link.label}</span>}
            </button>
          )
        })}
      </div>
    </aside>
  )
}
