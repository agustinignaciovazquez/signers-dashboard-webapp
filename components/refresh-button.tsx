"use client"

import { Button } from "@/components/ui/button"
import { RotateCcw } from "lucide-react"

interface RefreshButtonProps {
  onRefresh: () => void
  loading: boolean
}

export function RefreshButton({ onRefresh, loading }: RefreshButtonProps) {
  return (
    <Button onClick={onRefresh} disabled={loading} className="gap-2 bg-transparent" variant="outline">
      <RotateCcw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
      {loading ? "Refreshing..." : "Refresh Balances"}
    </Button>
  )
}
