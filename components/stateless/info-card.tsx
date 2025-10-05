import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { RetryErrorMessage } from "./retry-error-message"
import { Info } from "@phosphor-icons/react"
import type { ReactNode } from "react"

interface InfoCardProps {
  title: string
  icon?: ReactNode
  children: ReactNode
  className?: string
}

function InfoCard({ title, icon, children, className }: InfoCardProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">{children}</CardContent>
    </Card>
  )
}

function Property({
  label,
  tooltip,
  children,
}: {
  label: string
  tooltip?: string | ReactNode
  children: ReactNode
}) {
  return (
    <div>
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-muted-foreground">{label}</label>
        {tooltip && (
          <HoverCard>
            <HoverCardTrigger asChild>
              <button className="inline-flex items-center justify-center">
                <Info className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
              </button>
            </HoverCardTrigger>
            <HoverCardContent className="w-80" side="right">
              {typeof tooltip === "string" ? <p className="text-sm text-muted-foreground">{tooltip}</p> : tooltip}
            </HoverCardContent>
          </HoverCard>
        )}
      </div>
      <div className="mt-1">{children}</div>
    </div>
  )
}

function Loading({ title, icon, className }: { title: string; icon?: ReactNode; className?: string }) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-6 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-6 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-6 w-full" />
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
  className,
}: {
  title: string
  icon?: ReactNode
  errorText: string
  onRetry: () => void
  className?: string
}) {
  return (
    <Card className={className}>
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

InfoCard.Property = Property
InfoCard.Loading = Loading
InfoCard.Error = Error

export { InfoCard }
