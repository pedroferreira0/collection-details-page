"use client"

import { useState } from "react"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { VideoDetailsLayout } from "./layout"
import { InformationCard } from "./InformationCard"
import { StatisticsCard } from "./StatisticsCard"
import { LocationsTab } from "./LocationsTab"
import { CommentsTab } from "./CommentsTab"
import { TabsCard } from "@/components/stateless/tabs-card"
import { VideoOnElementsEdit } from "@/components/stateless/video-on-elements-edit"
import type { MediaHighlight } from "@/components/video-elements"

export interface VideoData {
  title: string
  views: number
  activePages: number
  addedDate: string
  videoUrl: string
}

export function VideoDetails() {
  const [videoStatus, setVideoStatus] = useState<"active" | "inactive">("active")
  const [cover, setCover] = useState("/react-tutorial.png")

  const [videoData, setVideoData] = useState<VideoData>({
    title: "Tutorial de React - Componentes Funcionais",
    views: 15420,
    activePages: 8,
    addedDate: "15/03/2024",
    videoUrl: "/react-tutorial.png",
  })

  const [defaultVideoElements, setDefaultVideoElements] = useState<MediaHighlight>({
    type: "products",
    products: [
      {
        id: "1",
        name: "Vestido No Sleep PRETO",
        image: "/vestido-produto.png",
        price: "R$ 1.019,00",
      },
      {
        id: "2",
        name: "Vestido No Sleep PRETO",
        image: "/vestido-produto.png",
        price: "R$ 1.019,00",
      },
    ],
  })

  const [isElementsSheetOpen, setIsElementsSheetOpen] = useState(false)

  const handleTitleChange = (newTitle: string) => {
    setVideoData({ ...videoData, title: newTitle })
  }

  const handleStatusChange = (newStatus: "active" | "inactive") => {
    setVideoStatus(newStatus)
  }

  const handleVideoElementEdit = () => {
    setIsElementsSheetOpen(true)
  }

  const handleElementsChange = (type: "products" | "button", data: any) => {
    if (type === "products") {
      setDefaultVideoElements({
        type: "products",
        products: data.selectedProducts,
      })
    } else {
      setDefaultVideoElements({
        type: "button",
        buttonText: data.buttonText,
        buttonLink: data.buttonLink,
      })
    }
    setIsElementsSheetOpen(false)
  }

  const handleChangeCover = () => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = "image/*"
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          setCover(e.target?.result as string)
        }
        reader.readAsDataURL(file)
      }
    }
    input.click()
  }

  const handleDownload = () => {
    console.log("Download iniciado")
  }

  const handleReplaceVideo = () => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = "video/*"
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        console.log("Substituindo vídeo:", file.name)
      }
    }
    input.click()
  }

  const handlePlay = () => {
    alert("playing...")
  }

  const handleDeactivate = () => {
    setVideoStatus(videoStatus === "active" ? "inactive" : "active")
  }

  const handleDelete = () => {
    if (confirm("Tem certeza que deseja excluir este vídeo?")) {
      console.log("Vídeo excluído")
    }
  }

  return (
    <TooltipProvider>
      <VideoDetailsLayout videoStatus={videoStatus} onDeactivate={handleDeactivate} onDelete={handleDelete}>
        <InformationCard
          videoData={videoData}
          videoStatus={videoStatus}
          cover={cover}
          defaultVideoElements={defaultVideoElements}
          onTitleChange={handleTitleChange}
          onStatusChange={handleStatusChange}
          onVideoElementEdit={handleVideoElementEdit}
          onChangeCover={handleChangeCover}
          onDownload={handleDownload}
          onReplaceVideo={handleReplaceVideo}
          onPlay={handlePlay}
        />
        <StatisticsCard videoData={videoData} />

        <div className="lg:col-span-2">
          <TabsCard
            tabs={[
              { value: "locations", label: "Locais onde o vídeo está vinculado" },
              { value: "comments", label: "Comentários" },
            ]}
            defaultValue="locations"
          >
            <LocationsTab />
            <CommentsTab />
          </TabsCard>
        </div>

        <Sheet open={isElementsSheetOpen} onOpenChange={setIsElementsSheetOpen}>
          <SheetContent side="right" className="w-full sm:max-w-xl overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Editar Elementos do Vídeo</SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              <VideoOnElementsEdit
                initialType={defaultVideoElements.type}
                initialProducts={defaultVideoElements.type === "products" ? defaultVideoElements.products : []}
                initialButtonText={defaultVideoElements.type === "button" ? defaultVideoElements.buttonText || "" : ""}
                initialButtonLink={defaultVideoElements.type === "button" ? defaultVideoElements.buttonLink || "" : ""}
                availableProducts={[
                  {
                    id: "1",
                    name: "Stick Cor Multifuncional",
                    image: "/vestido-produto.png",
                    price: "R$ 89,00",
                  },
                  {
                    id: "2",
                    name: "Vestido No Sleep PRETO",
                    image: "/vestido-produto.png",
                    price: "R$ 1.019,00",
                  },
                  {
                    id: "3",
                    name: "Blusa Casual Branca",
                    image: "/vestido-produto.png",
                    price: "R$ 159,00",
                  },
                ]}
                onChange={handleElementsChange}
              />
            </div>
          </SheetContent>
        </Sheet>
      </VideoDetailsLayout>
    </TooltipProvider>
  )
}

export default VideoDetails
