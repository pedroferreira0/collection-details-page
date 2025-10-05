"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { TabsCardContent } from "@/components/stateless/tabs-card"
import { DotsThree, Eye, PencilSimple, Trash, Heart, ArrowBendUpLeft } from "@phosphor-icons/react"

interface Comment {
  id: string
  author: string
  avatar: string
  content: string
  timestamp: string
  likes: number
  replies: number
  status: "active" | "inactive"
}

export function CommentsTab() {
  const [comments] = useState<Comment[]>([
    {
      id: "1",
      author: "João Silva",
      avatar: "/placeholder.svg?height=32&width=32",
      content: "Excelente conteúdo! Muito bem explicado e fácil de entender.",
      timestamp: "2 horas atrás",
      likes: 12,
      replies: 3,
      status: "active",
    },
    {
      id: "2",
      author: "Maria Santos",
      avatar: "/placeholder.svg?height=32&width=32",
      content: "Poderia fazer mais vídeos sobre este tema? Estou adorando a série!",
      timestamp: "5 horas atrás",
      likes: 8,
      replies: 1,
      status: "active",
    },
    {
      id: "3",
      author: "Pedro Costa",
      avatar: "/placeholder.svg?height=32&width=32",
      content: "Comentário inapropriado que foi reportado pelos usuários.",
      timestamp: "1 dia atrás",
      likes: 0,
      replies: 0,
      status: "inactive",
    },
  ])

  return (
    <TabsCardContent value="comments">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="comments">Comentários da Coleção</Label>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Eye className="h-4 w-4 mr-2" />
              Moderar
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <img
                    src={comment.avatar || "/placeholder.svg"}
                    alt={comment.author}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{comment.author}</span>
                      <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                      <Badge
                        variant={comment.status === "active" ? "default" : "destructive"}
                        className={`text-xs ${
                          comment.status === "active"
                            ? "bg-green-500 hover:bg-green-600 text-white"
                            : "bg-red-500 hover:bg-red-600 text-white"
                        }`}
                      >
                        {comment.status === "active" ? "Ativo" : "Inativo"}
                      </Badge>
                    </div>
                    <p className="text-sm text-foreground">{comment.content}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Heart className="h-3 w-3" />
                        {comment.likes}
                      </div>
                      <div className="flex items-center gap-1">
                        <ArrowBendUpLeft className="h-3 w-3" />
                        {comment.replies} respostas
                      </div>
                    </div>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <DotsThree className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Eye className="h-4 w-4 mr-2" />
                      Ver Detalhes
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <PencilSimple className="h-4 w-4 mr-2" />
                      {comment.status === "active" ? "Desativar" : "Ativar"}
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      <Trash className="h-4 w-4 mr-2" />
                      Remover
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      </div>
    </TabsCardContent>
  )
}
