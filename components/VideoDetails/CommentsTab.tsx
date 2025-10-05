"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { TabsCardContent } from "@/components/stateless/tabs-card"
import { DotsThree } from "@phosphor-icons/react"

interface Comment {
  id: string
  author: string
  content: string
  date: string
  avatar: string
}

export function CommentsTab() {
  const [comments] = useState<Comment[]>([
    {
      id: "1",
      author: "Maria Silva",
      content: "Ótimo vídeo! Muito bem explicado.",
      date: "20/03/2024",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "2",
      author: "João Santos",
      content: "Adorei o produto mostrado no vídeo!",
      date: "18/03/2024",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ])

  return (
    <TabsCardContent value="comments">
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-4 rounded-lg border p-4">
            <Image
              src={comment.avatar || "/placeholder.svg"}
              alt={comment.author}
              width={40}
              height={40}
              className="rounded-full"
            />
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <p className="font-semibold">{comment.author}</p>
                <span className="text-sm text-muted-foreground">{comment.date}</span>
              </div>
              <p className="text-sm text-muted-foreground">{comment.content}</p>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <DotsThree className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Responder</DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">Excluir</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ))}
      </div>
    </TabsCardContent>
  )
}
