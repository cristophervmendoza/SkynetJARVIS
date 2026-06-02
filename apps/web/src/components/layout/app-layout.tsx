import { Sidebar } from './sidebar'
import { TopBar } from './topbar'
import { useAppStore } from '@/stores/useAppStore'
import { cn } from '@/lib/utils'

interface AppLayoutProps {
  children: React.ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  const { sidebarOpen, terminalOpen } = useAppStore()

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar />
        <main
          className={cn(
            'flex-1 overflow-auto',
            terminalOpen && 'h-[calc(100vh-8rem)]',
          )}
        >
          {children}
        </main>
        {terminalOpen && (
          <div className="h-32 border-t border-border bg-background">
            <div className="flex items-center justify-between px-4 py-1 text-xs text-muted-foreground bg-muted/50">
              <span>Terminal</span>
              <button className="hover:text-foreground">×</button>
            </div>
            <div className="p-2 font-mono text-sm text-green-400">
              $ _
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
