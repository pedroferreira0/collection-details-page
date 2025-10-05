"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { TabsCardContent } from "@/components/stateless/tabs-card"
import { BadgeSelector } from "@/components/stateless/badge-selector"
import { VideoElements, type MediaHighlight } from "@/components/video-elements"
import { DotsThree, Eye, PencilSimple, Trash, PlayCircle, Check, X, Play, DotsSixVertical } from "@phosphor-icons/react"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core"
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

interface Video {
  id: string
  title: string
  thumbnail: string
  status: "active" | "inactive"
  highlight: MediaHighlight | null
}

function SortableTableRow({
  video,
  editingVideoId,
  tempVideoTitle,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
  onSetTempTitle,
  onToggleFeatured,
  onRemove,
  onUpdateStatus,
}: {
  video: Video
  editingVideoId: string | null
  tempVideoTitle: string
  onStartEdit: (id: string, title: string) => void
  onSaveEdit: () => void
  onCancelEdit: () => void
  onSetTempTitle: (title: string) => void
  onToggleFeatured: (id: string) => void
  onRemove: (id: string) => void
  onUpdateStatus: (id: string, status: "active" | "inactive") => void
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: video.id })
  const [isHovered, setIsHovered] = useState(false)

  const statusOptions = [
    {
      value: "active",
      label: "Ativo",
      variant: "default" as const,
      className: "bg-green-500 hover:bg-green-600 text-white",
    },
    {
      value: "inactive",
      label: "Desativado",
      variant: "destructive" as const,
      className: "bg-red-500 hover:bg-red-600 text-white",
    },
  ]

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <TableRow ref={setNodeRef} style={style} className={`bg-background border-b ${isDragging ? "relative z-50" : ""}`}>
      <TableCell className="w-12 py-4">
        <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing p-1 hover:bg-muted rounded">
          <DotsSixVertical className="h-5 w-5 text-muted-foreground" />
        </div>
      </TableCell>
      <TableCell className="py-4">
        <div
          className="relative w-16 h-28 rounded-lg overflow-hidden cursor-pointer group"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <img
            src={video.thumbnail || "/placeholder.svg"}
            alt={video.title || "Vídeo sem título"}
            className="w-full h-full object-cover"
          />
          <div
            className={`absolute inset-0 bg-black/30 flex items-center justify-center transition-opacity ${isHovered ? "opacity-100" : "opacity-0"}`}
          >
            <Play className="h-6 w-6 text-white" weight="fill" />
          </div>
        </div>
      </TableCell>
      <TableCell className="py-4">
        {editingVideoId === video.id ? (
          <div className="flex items-center gap-2">
            <Input
              value={tempVideoTitle}
              onChange={(e) => onSetTempTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") onSaveEdit()
                if (e.key === "Escape") onCancelEdit()
              }}
              className="flex-1"
              placeholder="Digite o título do vídeo"
              autoFocus
            />
            <Button size="sm" variant="ghost" onClick={onSaveEdit}>
              <Check className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="ghost" onClick={onCancelEdit}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div
            className="flex items-center gap-2 group cursor-pointer py-2 rounded hover:bg-muted/30 transition-colors"
            onClick={() => onStartEdit(video.id, video.title)}
          >
            <p className="text-sm font-medium text-foreground flex-1">{video.title || "sem título"}</p>
            <PencilSimple className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        )}
      </TableCell>
      <TableCell className="py-4">
        <BadgeSelector
          value={video.status}
          onChange={(value) => onUpdateStatus(video.id, value as "active" | "inactive")}
          options={statusOptions}
        />
      </TableCell>
      <TableCell className="py-4">
        <VideoElements highlight={video.highlight} />
      </TableCell>
      <TableCell className="py-4 text-center">
        <span className="text-sm font-medium text-foreground">-</span>
      </TableCell>
      <TableCell className="py-4 text-center">
        <span className="text-sm font-medium text-foreground">-</span>
      </TableCell>
      <TableCell className="py-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <DotsThree className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <a href="/video" className="flex items-center cursor-pointer">
                <Eye className="h-4 w-4 mr-2" />
                Ver Detalhes
              </a>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onToggleFeatured(video.id)}>
              <PencilSimple className="h-4 w-4 mr-2" />
              Editar Elementos do Vídeo
            </DropdownMenuItem>
            <DropdownMenuItem className="text-destructive" onClick={() => onRemove(video.id)}>
              <Trash className="h-4 w-4 mr-2" />
              Remover
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  )
}

export function VideosTab() {
  const [editingVideoId, setEditingVideoId] = useState<string | null>(null)
  const [tempVideoTitle, setTempVideoTitle] = useState("")

  const [videos, setVideos] = useState<Video[]>([
    {
      id: "1",
      title: "Introdução ao React",
      thumbnail: "/react-tutorial.png",
      status: "active",
      highlight: {
        type: "cta",
        buttonText: "Saiba Mais",
        buttonAction: "learn-more",
      },
    },
    {
      id: "2",
      title: "",
      thumbnail: "/javascript-code.png",
      status: "active",
      highlight: {
        type: "products",
        products: [
          {
            id: "1",
            name: "Curso JavaScript",
            image: "/placeholder.svg?height=24&width=24",
            price: "R$ 99,90",
          },
          {
            id: "2",
            name: "Livro JS Avançado",
            image: "/placeholder.svg?height=24&width=24",
            price: "R$ 49,90",
          },
          {
            id: "3",
            name: "Kit Desenvolvedor",
            image: "/placeholder.svg?height=24&width=24",
            price: "R$ 199,90",
          },
        ],
      },
    },
    {
      id: "3",
      title: "CSS Grid Layout",
      thumbnail: "/css-grid-layout.png",
      status: "inactive",
      highlight: null,
    },
  ])

  const startVideoTitleEdit = (videoId: string, currentTitle: string) => {
    setEditingVideoId(videoId)
    setTempVideoTitle(currentTitle)
  }

  const saveVideoTitleEdit = () => {
    if (editingVideoId) {
      setVideos(videos.map((video) => (video.id === editingVideoId ? { ...video, title: tempVideoTitle } : video)))
    }
    setEditingVideoId(null)
    setTempVideoTitle("")
  }

  const cancelVideoTitleEdit = () => {
    setEditingVideoId(null)
    setTempVideoTitle("")
  }

  const toggleVideoFeatured = (videoId: string) => {
    console.log("Toggle featured", videoId)
  }

  const removeVideo = (videoId: string) => {
    setVideos(videos.filter((video) => video.id !== videoId))
  }

  const updateVideoStatus = (videoId: string, status: "active" | "inactive") => {
    setVideos(videos.map((v) => (v.id === videoId ? { ...v, status } : v)))
  }

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (active.id !== over?.id) {
      setVideos((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id)
        const newIndex = items.findIndex((item) => item.id === over?.id)

        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  return (
    <TabsCardContent value="videos">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="videos">Vídeos</Label>
          <Button size="sm">
            <PlayCircle className="h-4 w-4 mr-2" />
            Adicionar vídeos
          </Button>
        </div>
        <div className="rounded-lg border overflow-hidden">
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50 hover:bg-muted/50">
                  <TableHead className="w-12"></TableHead>
                  <TableHead className="w-20 font-semibold text-foreground">Vídeo</TableHead>
                  <TableHead className="font-semibold text-foreground">Título</TableHead>
                  <TableHead className="w-32 font-semibold text-foreground">Status</TableHead>
                  <TableHead className="w-40 font-semibold text-foreground">Elementos do Vídeo</TableHead>
                  <TableHead className="w-24 text-center font-semibold text-foreground">Views</TableHead>
                  <TableHead className="w-24 text-center font-semibold text-foreground">Páginas</TableHead>
                  <TableHead className="w-16"></TableHead>
                </TableRow>
              </TableHeader>
              <SortableContext items={videos.map((v) => v.id)} strategy={verticalListSortingStrategy}>
                <TableBody>
                  {videos.map((video) => (
                    <SortableTableRow
                      key={video.id}
                      video={video}
                      editingVideoId={editingVideoId}
                      tempVideoTitle={tempVideoTitle}
                      onStartEdit={startVideoTitleEdit}
                      onSaveEdit={saveVideoTitleEdit}
                      onCancelEdit={cancelVideoTitleEdit}
                      onSetTempTitle={setTempVideoTitle}
                      onToggleFeatured={toggleVideoFeatured}
                      onRemove={removeVideo}
                      onUpdateStatus={updateVideoStatus}
                    />
                  ))}
                </TableBody>
              </SortableContext>
            </Table>
          </DndContext>
        </div>
      </div>
    </TabsCardContent>
  )
}
