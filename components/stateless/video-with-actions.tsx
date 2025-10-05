"use client"

import type { ReactNode } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import { Play } from "@phosphor-icons/react"

interface VideoWithActionsProps {
  thumbnail: string
  children?: ReactNode
  onPlay?: () => void
}

interface ActionProps {
  tooltip: ReactNode
  icon: ReactNode
  onClick: () => void
}

function VideoWithActionsRoot({ thumbnail, children, onPlay }: VideoWithActionsProps) {
  return (
    <div className="relative aspect-[9/16] w-64 bg-muted rounded-lg overflow-hidden">
      <div className="absolute inset-0 cursor-pointer" onClick={onPlay}>
        <Image src={thumbnail || "/placeholder.svg"} alt="Video thumbnail" fill className="object-cover" />

        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
          <Button size="lg" className="h-16 w-16 rounded-full pointer-events-none">
            <Play className="h-8 w-8" />
          </Button>
        </div>
      </div>

      {children && <div className="absolute bottom-4 left-4 right-4 flex gap-2">{children}</div>}
    </div>
  )
}

function Action({ tooltip, icon, onClick }: ActionProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button size="sm" variant="secondary" onClick={onClick} className="cursor-pointer">
            {icon}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <div className="max-w-xs">{tooltip}</div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export const VideoWithActions = Object.assign(VideoWithActionsRoot, {
  Action,
})
