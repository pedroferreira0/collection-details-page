"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { TabsCardContent } from "@/components/stateless/tabs-card"
import { DataTable, type Column, type Action } from "@/components/stateless/data-table"
import { BadgeSelector } from "@/components/stateless/badge-selector"
import { VideoElements, type MediaHighlight } from "@/components/video-elements"
import { Eye, PencilSimple, Trash, Plus } from "@phosphor-icons/react"

interface Location {
  id: string
  page: string
  highlight: MediaHighlight | null
  views: number
  status: "active" | "inactive"
}

export function LocationsTab() {
  const [locations] = useState<Location[]>([
    {
      id: "1",
      page: "Home",
      highlight: {
        type: "cta",
        buttonText: "Comprar Agora",
        buttonAction: "buy-now",
      },
      views: 8420,
      status: "active",
    },
    {
      id: "2",
      page: "Categoria - Vestidos",
      highlight: {
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
            name: "Vestido Elegance",
            image: "/placeholder.svg?height=24&width=24",
            price: "R$ 899,00",
          },
        ],
      },
      views: 4200,
      status: "active",
    },
    {
      id: "3",
      page: "Produto - Vestido No Sleep",
      highlight: null,
      views: 2800,
      status: "inactive",
    },
  ])

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

  const locationColumns: Column<Location>[] = [
    {
      key: "page",
      header: "Página",
      render: (location) => (
        <Link href="/" className="font-medium text-primary hover:underline hover:text-primary/80 transition-colors">
          {location.page}
        </Link>
      ),
    },
    {
      key: "highlight",
      header: "Elementos do Vídeo",
      render: (location) => <VideoElements highlight={location.highlight} size="sm" />,
    },
    {
      key: "views",
      header: "Views",
      render: (location) => (
        <div className="flex items-center gap-2">
          <Eye className="h-4 w-4 text-muted-foreground" />
          {location.views.toLocaleString()}
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      width: "w-32",
      render: (location) => (
        <BadgeSelector
          value={location.status}
          onChange={(value) => console.log("Status changed to", value)}
          options={statusOptions}
        />
      ),
    },
  ]

  const locationActions: Action<Location>[] = [
    {
      label: "Editar Elementos do Vídeo",
      icon: <PencilSimple className="h-4 w-4" />,
      onClick: (location) => console.log("Editar elementos do vídeo", location),
    },
    {
      label: "Remover",
      icon: <Trash className="h-4 w-4" />,
      onClick: (location) => console.log("Remover", location),
      variant: "destructive",
    },
  ]

  return (
    <TabsCardContent value="locations">
      <div className="flex justify-end mb-4">
        <Button onClick={() => console.log("Adicionar a página")}>
          <Plus className="mr-2 h-4 w-4" />
          Adicionar a página
        </Button>
      </div>
      <DataTable
        data={locations}
        columns={locationColumns}
        actions={locationActions}
        getItemId={(location) => location.id}
      />
    </TabsCardContent>
  )
}
