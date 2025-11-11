import { Card } from "@/components/ui/card"
import type { BalanceData } from "@/lib/types"
import { AlertTriangle, AlertCircle, TrendingDown, ExternalLink } from "lucide-react"

interface LowBalanceAlertsProps {
  balances: BalanceData[]
}

export function LowBalanceAlerts({ balances }: LowBalanceAlertsProps) {
  const criticalAlerts = balances.filter((b) => b.status === "low").sort((a, b) => a.chainName.localeCompare(b.chainName))
  const warnings = balances.filter((b) => b.status === "warning").sort((a, b) => a.chainName.localeCompare(b.chainName))
  const healthy = balances.filter((b) => b.status === "healthy").sort((a, b) => a.chainName.localeCompare(b.chainName))

  const criticalCount = criticalAlerts.length
  const warningCount = warnings.length
  const healthyCount = healthy.length
  const totalSigners = balances.length

  return (
    <div className="space-y-4">
      {/* Top Alert Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Critical */}
        <Card className="p-4 bg-red-500/10 border-red-500/30 hover:border-red-500/50 transition-colors">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-muted-foreground mb-1">CRITICAL</p>
              <p className="text-3xl font-bold text-red-600 dark:text-red-400">{criticalCount}</p>
              <p className="text-xs text-muted-foreground mt-2">Signers need funding</p>
            </div>
            <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400 mt-1" />
          </div>
        </Card>

        {/* Warning */}
        <Card className="p-4 bg-yellow-500/10 border-yellow-500/30 hover:border-yellow-500/50 transition-colors">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-muted-foreground mb-1">WARNING</p>
              <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">{warningCount}</p>
              <p className="text-xs text-muted-foreground mt-2">Low balance detected</p>
            </div>
            <AlertCircle className="w-6 h-6 text-yellow-600 dark:text-yellow-400 mt-1" />
          </div>
        </Card>

        {/* Healthy */}
        <Card className="p-4 bg-green-500/10 border-green-500/30 hover:border-green-500/50 transition-colors">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-muted-foreground mb-1">HEALTHY</p>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400">{healthyCount}</p>
              <p className="text-xs text-muted-foreground mt-2">
                {totalSigners > 0 ? `${((healthyCount / totalSigners) * 100).toFixed(0)}% funded` : "No signers"}
              </p>
            </div>
            <TrendingDown className="w-6 h-6 text-green-600 dark:text-green-400 mt-1" />
          </div>
        </Card>
      </div>

      {/* Critical Signers List */}
      {criticalCount > 0 && (
        <Card className="p-4 bg-red-500/5 border-red-500/30">
          <h3 className="font-semibold text-red-600 dark:text-red-400 mb-3 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            Critical: {criticalCount} signer{criticalCount !== 1 ? "s" : ""} needs immediate funding
          </h3>
          <div className="space-y-2">
            {criticalAlerts.map((alert, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2 bg-background/50 rounded border border-red-500/20"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <a
                    href={alert.explorerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-mono text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 underline"
                  >
                    {alert.address}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">on {alert.chainName}</span>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="font-bold text-red-600 dark:text-red-400">{alert.balance}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Warning Signers List */}
      {warningCount > 0 && (
        <Card className="p-4 bg-yellow-500/5 border-yellow-500/30">
          <h3 className="font-semibold text-yellow-600 dark:text-yellow-400 mb-3 flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            Warning: {warningCount} signer{warningCount !== 1 ? "s" : ""} has low balance
          </h3>
          <div className="space-y-2">
            {warnings.map((warning, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2 bg-background/50 rounded border border-yellow-500/20"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <a
                    href={warning.explorerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-mono text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 underline"
                  >
                    {warning.address}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">on {warning.chainName}</span>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="font-bold text-yellow-600 dark:text-yellow-400">{warning.balance}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Healthy Signers List */}
      {healthyCount > 0 && (
        <Card className="p-4 bg-green-500/5 border-green-500/30">
          <h3 className="font-semibold text-green-600 dark:text-green-400 mb-3 flex items-center gap-2">
            <TrendingDown className="w-4 h-4" />
            Healthy: {healthyCount} signer{healthyCount !== 1 ? "s" : ""} funded
          </h3>
          <div className="space-y-2">
            {healthy.map((signer, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2 bg-background/50 rounded border border-green-500/20"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <a
                    href={signer.explorerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-mono text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 underline"
                  >
                    {signer.address}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">on {signer.chainName}</span>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="font-bold text-green-600 dark:text-green-400">{signer.balance}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  )
}
