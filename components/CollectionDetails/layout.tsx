import type { ReactNode } from "react"

interface CollectionDetailsLayoutProps {
  children: ReactNode
}

export function CollectionDetailsLayout({ children }: CollectionDetailsLayoutProps) {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-2xl font-semibold text-foreground">Coleção de vídeos</h1>
              <p className="text-sm text-muted-foreground">Gerencie sua coleção de vídeos</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">{children}</div>
      </div>
    </div>
  )
}
