"use client"
import Image from "next/image"
import { InfoCard } from "@/components/stateless/info-card"
import { BadgeSelector } from "@/components/stateless/badge-selector"
import { VideoElements, type MediaHighlight } from "@/components/video-elements"
import { EditableWrapper } from "@/components/stateless/editable-wrapper"
import { VideoWithActions } from "@/components/stateless/video-with-actions"
import { EditableText } from "@/components/stateless/editable-text"
import { DownloadSimple, CalendarBlank, Image as ImageIcon, Info, Upload } from "@phosphor-icons/react"
import type { VideoData } from "./index"

interface InformationCardProps {
  videoData: VideoData
  videoStatus: "active" | "inactive"
  cover: string
  defaultVideoElements: MediaHighlight
  onTitleChange: (title: string) => void
  onStatusChange: (status: "active" | "inactive") => void
  onVideoElementEdit: () => void
  onChangeCover: () => void
  onDownload: () => void
  onReplaceVideo: () => void
  onPlay: () => void
}

export function InformationCard({
  videoData,
  videoStatus,
  cover,
  defaultVideoElements,
  onTitleChange,
  onStatusChange,
  onVideoElementEdit,
  onChangeCover,
  onDownload,
  onReplaceVideo,
  onPlay,
}: InformationCardProps) {
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

  return (
    <div className="lg:col-span-2 space-y-4">
      <InfoCard title="Informações do vídeo" icon={<Info className="h-5 w-5" />}>
        <div className="flex gap-6">
          {/* Video vertical à esquerda */}
          <div className="flex-shrink-0">
            <VideoWithActions thumbnail={cover} onPlay={onPlay}>
              <VideoWithActions.Action
                tooltip={
                  <>
                    <strong>Substituir vídeo:</strong> Use essa função quando você precisar trocar o vídeo em todas as
                    páginas.
                  </>
                }
                icon={<Upload className="h-4 w-4" />}
                onClick={onReplaceVideo}
              />
              <VideoWithActions.Action
                tooltip={
                  <>
                    <strong>Trocar capa:</strong> Essa capa é utilizada apenas quando você está usando soluções de
                    Carrossel, Explorar e Elementos do Vídeo.
                  </>
                }
                icon={<ImageIcon className="h-4 w-4" />}
                onClick={onChangeCover}
              />
              <VideoWithActions.Action
                tooltip={
                  <>
                    <strong>Baixar vídeo:</strong> Baixar vídeo original.
                  </>
                }
                icon={<DownloadSimple className="h-4 w-4" />}
                onClick={onDownload}
              />
            </VideoWithActions>
          </div>

          {/* Informações à direita */}
          <div className="flex-1 space-y-4">
            <InfoCard.Property label="Título">
              <EditableText value={videoData.title} onSave={onTitleChange} />
            </InfoCard.Property>

            <InfoCard.Property label="Data de Adição">
              <div className="flex items-center gap-2">
                <CalendarBlank className="h-4 w-4 text-muted-foreground" />
                <p className="font-medium">{videoData.addedDate}</p>
              </div>
            </InfoCard.Property>

            <InfoCard.Property label="Status">
              <BadgeSelector value={videoStatus} onChange={onStatusChange} options={statusOptions} />
            </InfoCard.Property>

            <InfoCard.Property
              label="Elementos do Vídeo Padrão"
              tooltip={
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Os elementos do vídeo são os elementos que aparecem na parte inferior do vídeo, podendo ser botão ou
                    podendo ser produtos.
                  </p>
                  <div className="rounded-lg border overflow-hidden bg-muted/30">
                    <Image
                      src="/video-with-product-highlights-and-cta-button.jpg"
                      alt="Exemplo de elementos no vídeo"
                      width={280}
                      height={160}
                      className="w-full"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    O elemento do vídeo padrão é o default que é aplicado a esse vídeo toda vez que ele é vinculado.
                  </p>
                </div>
              }
            >
              <EditableWrapper onEdit={onVideoElementEdit}>
                <VideoElements elements={defaultVideoElements} size="md" />
              </EditableWrapper>
            </InfoCard.Property>
          </div>
        </div>
      </InfoCard>
    </div>
  )
}
