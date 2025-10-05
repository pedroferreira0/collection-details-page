import { InfoCard } from "@/components/stateless/info-card"
import { Eye, MapPin, ChartBar } from "@phosphor-icons/react"
import type { VideoData } from "./index"

interface StatisticsCardProps {
  videoData: VideoData
}

export function StatisticsCard({ videoData }: StatisticsCardProps) {
  return (
    <div className="space-y-6">
      <InfoCard title="Estatísticas" icon={<ChartBar className="h-5 w-5" />}>
        <InfoCard.Property label="Total de Views">
          <div className="flex items-center gap-2">
            <Eye className="h-5 w-5 text-muted-foreground" />
            <p className="text-2xl font-bold">{videoData.views.toLocaleString()}</p>
          </div>
        </InfoCard.Property>

        <InfoCard.Property label="Páginas Ativas">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-muted-foreground" />
            <p className="text-2xl font-bold">{videoData.activePages}</p>
          </div>
        </InfoCard.Property>

        <div className="pt-4 border-t">
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Taxa de Engajamento</span>
              <span className="text-sm font-semibold">8.5%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Tempo Médio</span>
              <span className="text-sm font-semibold">2:34</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Compartilhamentos</span>
              <span className="text-sm font-semibold">342</span>
            </div>
          </div>
        </div>
      </InfoCard>
    </div>
  )
}
