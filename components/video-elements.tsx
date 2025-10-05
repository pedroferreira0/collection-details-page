"use client"

import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export type MediaHighlightType = "cta" | "products"

export interface MediaHighlightCTA {
  type: "cta"
  buttonText: string
  buttonAction?: string
}

export interface MediaHighlightProducts {
  type: "products"
  products: Array<{
    id: string
    name: string
    image: string
    price: string
  }>
}

export type MediaHighlight = MediaHighlightCTA | MediaHighlightProducts

interface MediaHighlightsProps {
  elements: MediaHighlight | null
  size?: "sm" | "md"
}

export function VideoElements({ elements, size = "sm" }: MediaHighlightsProps) {
  if (!elements) {
    return <span className="text-muted-foreground text-sm">-</span>
  }

  return (
    <TooltipProvider>
      {elements.type === "cta" ? (
        <Tooltip>
          <TooltipTrigger asChild>
            <Badge
              variant="outline"
              className={`rounded-full font-medium bg-background ${
                size === "md" ? "px-4 py-2 text-sm" : "px-3 py-1 text-xs"
              }`}
            >
              {elements.buttonText}
            </Badge>
          </TooltipTrigger>
          <TooltipContent>
            <p>
              Este vídeo está associado ao botão <strong>{elements.buttonText}</strong> (
              {elements.buttonAction || "https://wide.io"})
            </p>
          </TooltipContent>
        </Tooltip>
      ) : (
        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex -space-x-2">
                {elements.products.slice(0, 3).map((product, index) => (
                  <img
                    key={product.id}
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className={`rounded-full border-2 border-background object-cover ${
                      size === "md" ? "w-10 h-10" : "w-7 h-7"
                    }`}
                    style={{ zIndex: 3 - index }}
                  />
                ))}
                {elements.products.length > 3 && (
                  <div
                    className={`rounded-full border-2 border-background bg-muted flex items-center justify-center font-medium ${
                      size === "md" ? "w-10 h-10 text-sm" : "w-7 h-7 text-xs"
                    }`}
                  >
                    +{elements.products.length - 3}
                  </div>
                )}
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <div className="space-y-1">
                <p className="font-medium">Produtos associados:</p>
                {elements.products.map((product) => (
                  <p key={product.id} className="text-sm">
                    {product.name} - {product.price}
                  </p>
                ))}
              </div>
            </TooltipContent>
          </Tooltip>
        </div>
      )}
    </TooltipProvider>
  )
}
