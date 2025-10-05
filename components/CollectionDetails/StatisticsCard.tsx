import { InfoCard } from "@/components/stateless/info-card"
import { Users, PlayCircle, ChartBar } from "@phosphor-icons/react"

interface StatisticsCardProps {
  stats: {
    uniqueUsers: number
    avgVideos: number
    totalViews: number
  }
}

export function StatisticsCard({ stats }: StatisticsCardProps) {
  return (
    <div>
      <InfoCard title="Estatísticas" icon={<ChartBar className="h-5 w-5" />} className="h-full">
        <InfoCard.Property label="Usuários Únicos">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-primary" />
            <p className="text-2xl font-bold text-foreground">{stats.uniqueUsers.toLocaleString()}</p>
          </div>
        </InfoCard.Property>

        <InfoCard.Property label="Média de Vídeos">
          <div className="flex items-center gap-2">
            <PlayCircle className="h-4 w-4 text-primary" />
            <p className="text-2xl font-bold text-foreground">{stats.avgVideos}</p>
          </div>
        </InfoCard.Property>

        <InfoCard.Property label="Total de Views">
          <div className="flex items-center gap-2">
            <ChartBar className="h-4 w-4 text-primary" />
            <p className="text-2xl font-bold text-foreground">{stats.totalViews.toLocaleString()}</p>
          </div>
        </InfoCard.Property>
      </InfoCard>
    </div>
  )
}
