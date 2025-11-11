"use client"

import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"

interface FiltersProps {
  chains: string[]
  selectedChain: string
  onChainChange: (chain: string) => void
  searchTerm: string
  onSearchChange: (term: string) => void
  sortBy: "address" | "balance"
  onSortChange: (sort: "address" | "balance") => void
}

export function Filters({
  chains,
  selectedChain,
  onChainChange,
  searchTerm,
  onSearchChange,
  sortBy,
  onSortChange,
}: FiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search by address..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>

      <Select value={selectedChain} onValueChange={onChainChange}>
        <SelectTrigger className="w-full sm:w-40">
          <SelectValue placeholder="Filter by chain" />
        </SelectTrigger>
        <SelectContent>
          {chains.map((chain) => (
            <SelectItem key={chain} value={chain}>
              {chain === "all" ? "All Chains" : chain}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={sortBy} onValueChange={(v) => onSortChange(v as any)}>
        <SelectTrigger className="w-full sm:w-40">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="address">Address</SelectItem>
          <SelectItem value="balance">Balance (Low First)</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
