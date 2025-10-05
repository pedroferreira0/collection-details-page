"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Check, X } from "@phosphor-icons/react"
import { PencilSimple } from "@phosphor-icons/react"

interface EditableTextProps {
  value: string
  onSave: (newValue: string) => void
  className?: string
}

export function EditableText({ value, onSave, className }: EditableTextProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [tempValue, setTempValue] = useState(value)

  const startEdit = () => {
    setTempValue(value)
    setIsEditing(true)
  }

  const saveEdit = () => {
    onSave(tempValue)
    setIsEditing(false)
  }

  const cancelEdit = () => {
    setTempValue(value)
    setIsEditing(false)
  }

  if (isEditing) {
    return (
      <div className="flex items-center gap-2">
        <Input
          value={tempValue}
          onChange={(e) => setTempValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") saveEdit()
            if (e.key === "Escape") cancelEdit()
          }}
          className="flex-1"
          autoFocus
        />
        <Button size="sm" variant="ghost" onClick={saveEdit}>
          <Check className="h-4 w-4" />
        </Button>
        <Button size="sm" variant="ghost" onClick={cancelEdit}>
          <X className="h-4 w-4" />
        </Button>
      </div>
    )
  }

  return (
    <div
      className={`flex items-center gap-2 group cursor-pointer p-2 rounded hover:bg-muted/50 transition-colors ${className || ""}`}
      onClick={startEdit}
    >
      <p className="text-sm text-foreground flex-1">{value}</p>
      <PencilSimple className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  )
}
