"use client"

import { Button } from "@/components/ui/button"
import { Power, Trash } from "@phosphor-icons/react"
import type { ReactNode } from "react"

interface VideoDetailsLayoutProps {
  videoStatus: "active" | "inactive"
  onDeactivate: () => void
  onDelete: () => void
  children: ReactNode
}

export function VideoDetailsLayout({ videoStatus, onDeactivate, onDelete, children }: VideoDetailsLayoutProps) {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header com título e ações */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Detalhes da Mídia</h1>
          <div className="flex gap-2">
            <Button variant={videoStatus === "active" ? "outline" : "default"} onClick={onDeactivate}>
              <Power className="mr-2 h-4 w-4" />
              {videoStatus === "active" ? "Desativar" : "Ativar"}
            </Button>
            <Button variant="destructive" onClick={onDelete}>
              <Trash className="mr-2 h-4 w-4" />
              Excluir
            </Button>
          </div>
        </div>

        {/* Grid principal */}
        <div className="grid gap-6 lg:grid-cols-3">{children}</div>
      </div>
    </div>
  )
}
