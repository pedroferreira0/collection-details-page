"use client"

import type { ReactNode } from "react"
import { PencilSimple } from "@phosphor-icons/react"

interface EditableWrapperProps {
  children: ReactNode
  onEdit: () => void
}

export function EditableWrapper({ children, onEdit }: EditableWrapperProps) {
  return (
    <div className="group cursor-pointer p-3 rounded-lg hover:bg-muted/50 transition-colors border" onClick={onEdit}>
      <div className="flex items-start gap-2">
        <div className="flex-1">{children}</div>
        <PencilSimple className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-1" />
      </div>
    </div>
  )
}
