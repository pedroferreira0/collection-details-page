"use client"

import { ArrowClockwise } from "@phosphor-icons/react"

export function RetryErrorMessage({
  errorText,
  onRetry,
}: {
  errorText: string
  onRetry: () => void
}) {
  return (
    <div className="flex flex-col items-center justify-center p-4 gap-2">
      <p className="text-sm text-muted-foreground">{errorText}</p>
      <button
        className="text-sm text-destructive border-b border-destructive cursor-pointer flex items-center gap-1 hover:opacity-80 transition-opacity"
        onClick={onRetry}
      >
        <ArrowClockwise size={14} />
        Tentar novamente
      </button>
    </div>
  )
}
