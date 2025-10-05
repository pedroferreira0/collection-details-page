"use client"
import { BadgeSelector } from "@/components/stateless/badge-selector"
import { InfoCard } from "@/components/stateless/info-card"
import { EditableText } from "@/components/stateless/editable-text"
import { WhereIs } from "@/components/stateless/where-is"
import { EditableWrapper } from "@/components/stateless/editable-wrapper"
import { Info } from "@phosphor-icons/react"
import type { CollectionData, LocationData } from "./index"

interface InformationCardProps {
  collectionData: CollectionData
  setCollectionData: (data: CollectionData) => void
  locationData: LocationData
}

export function InformationCard({ collectionData, setCollectionData, locationData }: InformationCardProps) {
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

  const formatOptions = [
    { value: "Story", label: "Story", variant: "outline" as const },
    { value: "Reel", label: "Reel", variant: "outline" as const },
    { value: "Video", label: "Video", variant: "outline" as const },
  ]

  return (
    <div className="lg:col-span-2">
      <InfoCard title="Informações da Coleção" icon={<Info className="h-5 w-5" />}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InfoCard.Property label="Título">
            <EditableText
              value={collectionData.title}
              onSave={(newTitle) => setCollectionData({ ...collectionData, title: newTitle })}
            />
          </InfoCard.Property>

          <InfoCard.Property label="Highlight">
            <EditableText
              value={collectionData.highlight}
              onSave={(newHighlight) => setCollectionData({ ...collectionData, highlight: newHighlight })}
            />
          </InfoCard.Property>
        </div>

        <InfoCard.Property label="Onde está?">
          <EditableWrapper onEdit={() => alert("Editar")}>
            <WhereIs location={locationData} />
          </EditableWrapper>
        </InfoCard.Property>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InfoCard.Property label="Status">
            <BadgeSelector
              value={collectionData.status}
              onChange={(value) => setCollectionData({ ...collectionData, status: value as "active" | "inactive" })}
              options={statusOptions}
            />
          </InfoCard.Property>

          <InfoCard.Property label="Formato">
            <BadgeSelector
              value={collectionData.format}
              onChange={(value) =>
                setCollectionData({ ...collectionData, format: value as "Story" | "Reel" | "Video" })
              }
              options={formatOptions}
            />
          </InfoCard.Property>
        </div>
      </InfoCard>
    </div>
  )
}
