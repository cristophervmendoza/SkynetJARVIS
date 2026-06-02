import { create } from 'zustand'
import type { ThemeMode } from '@nexa/types'

interface AppState {
  theme: ThemeMode
  sidebarOpen: boolean
  terminalOpen: boolean
  currentMode: string
  setTheme: (theme: ThemeMode) => void
  toggleSidebar: () => void
  setSidebarOpen: (open: boolean) => void
  toggleTerminal: () => void
  setTerminalOpen: (open: boolean) => void
  setCurrentMode: (mode: string) => void
}

export const useAppStore = create<AppState>((set) => ({
  theme: 'dark',
  sidebarOpen: true,
  terminalOpen: false,
  currentMode: 'chat',
  setTheme: (theme) => set({ theme }),
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  toggleTerminal: () => set((s) => ({ terminalOpen: !s.terminalOpen })),
  setTerminalOpen: (open) => set({ terminalOpen: open }),
  setCurrentMode: (mode) => set({ currentMode: mode }),
}))
