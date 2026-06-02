'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { FileText, Upload, Search, MoreHorizontal } from 'lucide-react'

const documents = [
  { id: '1', title: 'Informe Financiero Q1 2026', type: 'PDF', size: '2.4 MB', updated: 'Hace 1d', tags: ['finanzas', 'reporte'] },
  { id: '2', title: 'Plan de Negocios ONG', type: 'DOCX', size: '1.1 MB', updated: 'Hace 3d', tags: ['plan', 'ong'] },
  { id: '3', title: 'Guía de Usuario ERP', type: 'PDF', size: '5.2 MB', updated: 'Hace 5d', tags: ['documentación', 'erp'] },
  { id: '4', title: 'Requerimientos del Sistema', type: 'MD', size: '156 KB', updated: 'Hace 1s', tags: ['requerimientos'] },
  { id: '5', title: 'Contrato de Servicios', type: 'DOCX', size: '892 KB', updated: 'Hace 2s', tags: ['legal', 'contrato'] },
  { id: '6', title: 'Presentación Clientes', type: 'PPTX', size: '8.3 MB', updated: 'Hace 1m', tags: ['presentación'] },
]

export default function DocumentsPage() {
  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Documentos</h1>
          <p className="text-muted-foreground text-sm mt-1">Sube, edita y analiza documentos con IA</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Upload className="w-4 h-4 mr-2" />
            Subir
          </Button>
          <Button>
            <FileText className="w-4 h-4 mr-2" />
            Nuevo Documento
          </Button>
        </div>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input placeholder="Buscar documentos..." className="pl-9" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {documents.map((doc) => (
          <Card key={doc.id} className="group hover:border-primary/30 transition-colors cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-emerald-400" />
                </div>
                <button className="p-1 rounded hover:bg-muted opacity-0 group-hover:opacity-100 transition-opacity">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
              <h3 className="font-semibold mb-1 line-clamp-1">{doc.title}</h3>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs px-2 py-0.5 rounded-full bg-muted">{doc.type}</span>
                <span className="text-xs text-muted-foreground">{doc.size}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex gap-1">
                  {doc.tags.map((tag) => (
                    <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded bg-primary/10 text-primary">
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">{doc.updated}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
