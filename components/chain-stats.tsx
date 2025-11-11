import { Card } from "@/components/ui/card"

interface ChainStat {
  name: string
  total: number
}

interface ChainStatsProps {
  stats: ChainStat[]
}

export function ChainStats({ stats }: ChainStatsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.name} className="p-4 bg-card border-border hover:border-primary/50 transition-colors">
          <p className="text-sm text-muted-foreground mb-2">{stat.name}</p>
          <p className="text-2xl font-bold text-primary">{stat.total.toFixed(4)}</p>
          <p className="text-xs text-muted-foreground mt-1">Total Balance</p>
        </Card>
      ))}
    </div>
  )
}
