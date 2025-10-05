import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { RetryErrorMessage } from "./retry-error-message"
import type { ReactNode } from "react"

interface StatisticsCardProps {
  title: string
  icon?: ReactNode
  children: ReactNode
}

function StatisticsCard({ title, icon, children }: StatisticsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  )
}

function Loading({ title, icon }: { title: string; icon?: ReactNode }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-8 w-32" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-8 w-32" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-8 w-32" />
        </div>
      </CardContent>
    </Card>
  )
}

function Error({
  title,
  icon,
  errorText,
  onRetry,
}: {
  title: string
  icon?: ReactNode
  errorText: string
  onRetry: () => void
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <RetryErrorMessage errorText={errorText} onRetry={onRetry} />
      </CardContent>
    </Card>
  )
}

StatisticsCard.Loading = Loading
StatisticsCard.Error = Error

export { StatisticsCard }
