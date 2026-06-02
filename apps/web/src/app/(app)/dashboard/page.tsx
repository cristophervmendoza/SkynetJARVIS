'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  MessageSquare, FileText, Code, Search, Image, Bot,
  ArrowRight, Clock, TrendingUp, Star,
} from 'lucide-react'
import { useRouter } from 'next/navigation'

const stats = [
  { label: 'Chats hoy', value: '12', icon: MessageSquare, color: 'text-blue-400', bg: 'bg-blue-500/10' },
  { label: 'Documentos', value: '8', icon: FileText, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  { label: 'Proyectos', value: '3', icon: Code, color: 'text-violet-400', bg: 'bg-violet-500/10' },
  { label: 'Memorias', value: '47', icon: Bot, color: 'text-amber-400', bg: 'bg-amber-500/10' },
]

const recentChats = [
  { title: 'Revisar estructura del proyecto ERP', mode: 'code', date: 'Hace 2h' },
  { title: 'Resumir documento de contabilidad', mode: 'document', date: 'Hace 5h' },
  { title: 'Crear presentación para clientes', mode: 'ppt', date: 'Ayer' },
  { title: 'Investigar mejores prácticas React', mode: 'research', date: 'Ayer' },
]

const quickActions = [
  { label: 'Nuevo Chat', icon: MessageSquare, href: '/', color: 'text-blue-400' },
  { label: 'Subir Documento', icon: FileText, href: '/documents', color: 'text-emerald-400' },
  { label: 'Crear PPT', icon: Image, href: '/ppt', color: 'text-orange-400' },
  { label: 'Escribir Código', icon: Code, href: '/code', color: 'text-violet-400' },
]

export default function DashboardPage() {
  const router = useRouter()

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Bienvenido a Nexa AI Workspace
          </p>
        </div>
        <Button onClick={() => router.push('/')}>
          <MessageSquare className="w-4 h-4 mr-2" />
          Nuevo Chat
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.label}>
              <CardContent className="p-4 flex items-center gap-4">
                <div className={`p-2 rounded-lg ${stat.bg}`}>
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Chats Recientes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              {recentChats.map((chat, i) => (
                <button
                  key={i}
                  onClick={() => router.push('/')}
                  className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors text-left"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
                      <MessageSquare className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <span className="text-sm truncate">{chat.title}</span>
                  </div>
                  <span className="text-xs text-muted-foreground shrink-0 ml-3">{chat.date}</span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Star className="w-4 h-4" />
              Acciones Rápidas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {quickActions.map((action) => {
              const Icon = action.icon
              return (
                <Button
                  key={action.label}
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => router.push(action.href)}
                >
                  <Icon className={`w-4 h-4 mr-2 ${action.color}`} />
                  {action.label}
                  <ArrowRight className="w-3 h-3 ml-auto text-muted-foreground" />
                </Button>
              )
            })}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Uso del Plan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { label: 'Chats del mes', current: 12, max: 100 },
              { label: 'Documentos', current: 8, max: 50 },
              { label: 'Almacenamiento', current: 256, max: 10240, unit: 'MB' },
            ].map((item) => (
              <div key={item.label} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>{item.label}</span>
                  <span className="text-muted-foreground">
                    {item.current}{item.unit ? ` ${item.unit}` : ''} / {item.max}{item.unit ? ` ${item.unit}` : ''}
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all"
                    style={{ width: `${(item.current / item.max) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
