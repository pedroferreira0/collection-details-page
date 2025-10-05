import { Badge } from "@/components/ui/badge"
import { House, Tag, File, ShoppingBag } from "@phosphor-icons/react"

export interface WhereIsLocation {
  type: "home" | "categoria" | "pagina" | "produto"
  name: string
  image?: string
  price?: string
  description?: string
}

interface WhereIsProps {
  location: WhereIsLocation
}

export function WhereIs({ location }: WhereIsProps) {
  return (
      <div className="flex items-center gap-3">
        {location.type === "produto" && location.image ? (
          <img
            src={location.image || "/placeholder.svg"}
            alt={location.name}
            className="w-12 h-12 rounded object-cover border"
          />
        ) : (
          <div className="w-12 h-12 rounded bg-muted flex items-center justify-center">
            {location.type === "home" && <House className="h-6 w-6 text-muted-foreground" />}
            {location.type === "categoria" && <Tag className="h-6 w-6 text-muted-foreground" />}
            {location.type === "pagina" && <File className="h-6 w-6 text-muted-foreground" />}
            {location.type === "produto" && <ShoppingBag className="h-6 w-6 text-muted-foreground" />}
          </div>
        )}

        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-sm text-foreground truncate">{location.name}</h4>
          {location.type === "produto" && location.price && (
            <p className="text-sm text-muted-foreground">{location.price}</p>
          )}
          {(location.type === "categoria" || location.type === "pagina") && location.description && (
            <p className="text-xs text-muted-foreground truncate">{location.description}</p>
          )}
        </div>

        <Badge
          variant="secondary"
          className={`text-xs ${
            location.type === "produto"
              ? "bg-purple-100 text-purple-700 border-purple-200"
              : location.type === "home"
                ? "bg-blue-100 text-blue-700 border-blue-200"
                : location.type === "categoria"
                  ? "bg-green-100 text-green-700 border-green-200"
                  : "bg-orange-100 text-orange-700 border-orange-200"
          }`}
        >
          {location.type.charAt(0).toUpperCase() + location.type.slice(1)}
        </Badge>
      </div>
  )
}
