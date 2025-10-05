"use client"

import type { ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader } from "@/components/ui/sheet"
import { VideoStepper } from "./video-stepper"
import { useIsMobile } from "@/hooks/use-mobile"

interface PageDrawerProps {
  title: string
  children: ReactNode
  onOpenChange: () => void
  open: boolean
}

export function PageDrawer({
 title, 
 children,
 onOpenChange,
 open
}: PageDrawerProps) {
  const isMobile = useIsMobile()


  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side={isMobile ? "bottom" : "right"}
        className={
          isMobile ? "h-[90vh] w-full px-4 pb-4 flex flex-col" : "w-[90vw] max-w-[90vw] px-6 pb-4 flex flex-col"
        }
        style={{ maxWidth: "none" }}
      >
        <SheetHeader className="border-b border-gray-200 dark:border-gray-700 text-2xl font-bold pb-4 flex-shrink-0">
         {title}
        </SheetHeader>

        <div className="flex-1 overflow-auto py-2">{children}</div>

      </SheetContent>
    </Sheet>
  )
}
