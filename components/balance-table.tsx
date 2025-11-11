import { Card } from "@/components/ui/card"
import type { BalanceData } from "@/lib/types"
import { AlertCircle, AlertTriangle, CheckCircle, ExternalLink } from "lucide-react"

interface BalanceTableProps {
  balances: BalanceData[]
  loading: boolean
}

function getStatusIcon(status: string) {
  switch (status) {
    case "low":
      return <AlertCircle className="w-5 h-5 text-red-500" />
    case "warning":
      return <AlertTriangle className="w-5 h-5 text-yellow-500" />
    default:
      return <CheckCircle className="w-5 h-5 text-green-500" />
  }
}

function getStatusBadge(status: string) {
  const baseClass = "px-2 py-1 rounded text-xs font-medium"
  switch (status) {
    case "low":
      return `${baseClass} bg-red-500/20 text-red-700 dark:text-red-400`
    case "warning":
      return `${baseClass} bg-yellow-500/20 text-yellow-700 dark:text-yellow-400`
    default:
      return `${baseClass} bg-green-500/20 text-green-700 dark:text-green-400`
  }
}

export function BalanceTable({ balances, loading }: BalanceTableProps) {
  if (loading) {
    return (
      <Card className="p-8 text-center">
        <p className="text-muted-foreground">Loading balances...</p>
      </Card>
    )
  }

  if (balances.length === 0) {
    return (
      <Card className="p-8 text-center">
        <p className="text-muted-foreground">No signers found</p>
      </Card>
    )
  }

  // Balances are already sorted from parent component
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left px-4 py-3 font-semibold text-sm text-muted-foreground">Status</th>
            <th className="text-left px-4 py-3 font-semibold text-sm text-muted-foreground">Address</th>
            <th className="text-left px-4 py-3 font-semibold text-sm text-muted-foreground">Chain</th>
            <th className="text-right px-4 py-3 font-semibold text-sm text-muted-foreground">Balance</th>
            <th className="text-right px-4 py-3 font-semibold text-sm text-muted-foreground">Tx Remaining</th>
          </tr>
        </thead>
        <tbody>
          {balances.map((balance, idx) => (
            <tr key={idx} className="border-b border-border/50 hover:bg-muted/50 transition-colors">
              <td className="px-4 py-3">
                <div className="flex items-center justify-center">{getStatusIcon(balance.status)}</div>
              </td>
              <td className="px-4 py-3">
                <a
                  href={balance.explorerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-mono text-sm text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 underline"
                >
                  {balance.address}
                  <ExternalLink className="w-3 h-3" />
                </a>
              </td>
              <td className="px-4 py-3">
                <span className="inline-flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${balance.chainColor}`} />
                  {balance.chainName}
                </span>
              </td>
              <td className="px-4 py-3 text-right">
                <div className="flex flex-col items-end gap-1">
                  <span className="font-bold text-primary">{balance.balance}</span>
                  <span className={getStatusBadge(balance.status)}>
                    {balance.status === "low" ? "LOW" : balance.status === "warning" ? "WARNING" : "HEALTHY"}
                  </span>
                </div>
              </td>
              <td className="px-4 py-3 text-right">
                <span className="font-mono text-sm text-muted-foreground">
                  ~{balance.transactionsRemaining.toLocaleString()}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
