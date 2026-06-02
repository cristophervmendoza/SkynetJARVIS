'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, Folder, MoreHorizontal, Search } from 'lucide-react'

const projects = [
  { id: '1', name: 'ERP Cuentas', description: 'Sistema de gestión contable', status: 'active', chats: 12, documents: 5, updated: 'Hace 2h' },
  { id: '2', name: 'ONG Imfundo Kahle', description: 'Plataforma educativa', status: 'active', chats: 8, documents: 3, updated: 'Hace 1d' },
  { id: '3', name: 'Viva Idiomas', description: 'App de aprendizaje de idiomas', status: 'active', chats: 15, documents: 7, updated: 'Hace 3h' },
  { id: '4', name: 'Blender Juego', description: 'Modelado 3D para videojuego', status: 'active', chats: 6, documents: 2, updated: 'Hace 5d' },
]

export default function ProjectsPage() {
  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Proyectos</h1>
          <p className="text-muted-foreground text-sm mt-1">Gestiona tus espacios de trabajo</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Nuevo Proyecto
        </Button>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input placeholder="Buscar proyectos..." className="pl-9" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project) => (
          <Card key={project.id} className="group hover:border-primary/30 transition-colors cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Folder className="w-5 h-5 text-primary" />
                </div>
                <button className="p-1 rounded hover:bg-muted opacity-0 group-hover:opacity-100 transition-opacity">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
              <h3 className="font-semibold mb-1">{project.name}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{project.description}</p>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span>{project.chats} chats</span>
                <span>{project.documents} docs</span>
                <span className="ml-auto">{project.updated}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
