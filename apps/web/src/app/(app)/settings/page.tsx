'use client'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Palette, Key, Bell, Shield, CreditCard, Link,
  Database, Terminal, Bot, Globe, ChevronRight,
} from 'lucide-react'

const settingsSections = [
  {
    id: 'appearance',
    icon: Palette,
    title: 'Apariencia',
    description: 'Tema, colores, tipografía y diseño',
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
  },
  {
    id: 'models',
    icon: Bot,
    title: 'Modelos y API Keys',
    description: 'Configura proveedores de IA y modelos',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
  },
  {
    id: 'connections',
    icon: Link,
    title: 'Conexiones',
    description: 'Google, Obsidian, GitHub y más',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
  },
  {
    id: 'keys',
    icon: Key,
    title: 'API Keys',
    description: 'Tus claves de API para acceso externo',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
  },
  {
    id: 'terminal',
    icon: Terminal,
    title: 'Terminal',
    description: 'Configuración de shell y permisos',
    color: 'text-green-400',
    bg: 'bg-green-500/10',
  },
  {
    id: 'mcp',
    icon: Database,
    title: 'MCP Servers',
    description: 'Gestiona servidores MCP y herramientas',
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
  },
  {
    id: 'security',
    icon: Shield,
    title: 'Seguridad',
    description: '2FA, sesiones, permisos y auditoría',
    color: 'text-red-400',
    bg: 'bg-red-500/10',
  },
  {
    id: 'billing',
    icon: CreditCard,
    title: 'Suscripción y Facturación',
    description: 'Plan actual, facturas y métodos de pago',
    color: 'text-orange-400',
    bg: 'bg-orange-500/10',
  },
  {
    id: 'notifications',
    icon: Bell,
    title: 'Notificaciones',
    description: 'Email, escritorio y sonido',
    color: 'text-pink-400',
    bg: 'bg-pink-500/10',
  },
  {
    id: 'privacy',
    icon: Globe,
    title: 'Privacidad',
    description: 'Datos, memoria automática y uso anónimo',
    color: 'text-indigo-400',
    bg: 'bg-indigo-500/10',
  },
]

export default function SettingsPage() {
  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold">Configuración</h1>
        <p className="text-muted-foreground text-sm mt-1">Personaliza tu experiencia en Nexa AI Workspace</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {settingsSections.map((section) => {
          const Icon = section.icon
          return (
            <button
              key={section.id}
              className="flex items-center gap-4 p-4 rounded-xl border border-border hover:bg-muted hover:border-primary/30 transition-all text-left group"
            >
              <div className={`p-2 rounded-lg ${section.bg}`}>
                <Icon className={`w-5 h-5 ${section.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-sm">{section.title}</h3>
                <p className="text-xs text-muted-foreground truncate">{section.description}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            </button>
          )
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Modelos Predeterminados</CardTitle>
          <CardDescription>Configura qué modelo usar para cada tipo de tarea</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { label: 'Modelo Barato', key: 'cheap', placeholder: 'gpt-4o-mini' },
            { label: 'Modelo Potente', key: 'powerful', placeholder: 'claude-sonnet-4-20250514' },
            { label: 'Modelo de Código', key: 'code', placeholder: 'claude-sonnet-4-20250514' },
            { label: 'Modelo de Visión', key: 'vision', placeholder: 'gpt-4o' },
            { label: 'Modelo de Imagen', key: 'image', placeholder: 'dall-e-3' },
            { label: 'Modelo de Video', key: 'video', placeholder: 'runway-gen3' },
            { label: 'Modelo de Audio', key: 'audio', placeholder: 'elevenlabs-v2' },
          ].map((model) => (
            <div key={model.key} className="flex items-center gap-4">
              <label className="text-sm w-36 shrink-0">{model.label}</label>
              <Input placeholder={model.placeholder} className="flex-1" />
            </div>
          ))}
          <Button className="mt-2">Guardar Configuración</Button>
        </CardContent>
      </Card>
    </div>
  )
}
