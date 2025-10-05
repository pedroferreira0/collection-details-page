import type { ReactNode } from "react"

interface CollectionDetailsLayoutProps {
  children: ReactNode
}

export function CollectionDetailsLayout({ children }: CollectionDetailsLayoutProps) {
  return (
    <div className="bg-background pr-2">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">{children}</div>
      </div>
    </div>
  )
}
