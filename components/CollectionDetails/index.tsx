"use client"

import { useState } from "react"
import { CollectionDetailsLayout } from "./layout"
import { InformationCard } from "./InformationCard"
import { StatisticsCard } from "./StatisticsCard"
import { VideosTab } from "./VideosTab"
import { CommentsTab } from "./CommentsTab"
import { TabsCard } from "@/components/stateless/tabs-card"
import { PlayCircle, ChatCircle } from "@phosphor-icons/react"
import type { MediaHighlight } from "@/components/video-elements"

export interface CollectionData {
  title: string
  highlight: string
  status: "active" | "inactive"
  format: "Story" | "Reel" | "Video"
}

export interface LocationData {
  type: "produto" | "home" | "categoria" | "pagina"
  name: string
  image?: string
  price?: string
  description?: string
  icon?: string
  highlight: MediaHighlight | null
}

export function CollectionDetails() {
  const [collectionData, setCollectionData] = useState<CollectionData>({
    title: "Coleção de Vídeos Educacionais",
    highlight: "Os melhores conteúdos para aprendizado online",
    status: "active",
    format: "Story",
  })

  const [locationData, setLocationData] = useState<LocationData>({
    type: "produto",
    name: "Vestido No Sleep PRETO",
    price: "R$ 1.019,00",
    image: "/vestido-produto.png",
    highlight: {
      type: "cta",
      buttonText: "Saiba Mais",
      buttonAction: "learn-more",
    },
  })

  const stats = {
    uniqueUsers: 2847,
    avgVideos: 8.5,
    totalViews: 15420,
  }

  return (
    <CollectionDetailsLayout>
      <InformationCard
        collectionData={collectionData}
        setCollectionData={setCollectionData}
        locationData={locationData}
        setLocationData={setLocationData}
      />

      <StatisticsCard stats={stats} />

      <div className="lg:col-span-3 space-y-6">
        <TabsCard
          tabs={[
            {
              value: "videos",
              label: "Vídeos",
              icon: <PlayCircle className="h-4 w-4" />,
              count: 3,
            },
            {
              value: "comments",
              label: "Comentários",
              icon: <ChatCircle className="h-4 w-4" />,
              count: 3,
            },
          ]}
          defaultValue="videos"
        >
          <VideosTab />
          <CommentsTab />
        </TabsCard>
      </div>
    </CollectionDetailsLayout>
  )
}
