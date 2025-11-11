"use client"

import { useState, useEffect } from "react"
import { BalanceTable } from "@/components/balance-table"
import { Header } from "@/components/header"
import { LowBalanceAlerts } from "@/components/low-balance-alerts"
import { RefreshButton } from "@/components/refresh-button"
import { Filters } from "@/components/filters"
import type { BalanceData } from "@/lib/types"
import { chains, signers } from "@/lib/config"
import { fetchBalances } from "@/lib/fetch-balances"

export default function Page() {
  const [balances, setBalances] = useState<BalanceData[]>([])
  const [filteredBalances, setFilteredBalances] = useState<BalanceData[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedChain, setSelectedChain] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [sortBy, setSortBy] = useState<"address" | "balance">("balance")

  const loadBalances = async () => {
    setLoading(true)
    try {
      const data = await fetchBalances(chains, signers)
      setBalances(data)
    } catch (error) {
      console.error("Failed to fetch balances:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    let filtered = balances

    if (selectedChain !== "all") {
      filtered = filtered.filter((b) => b.chainName === selectedChain)
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (b) =>
          b.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
          b.shortAddress.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (sortBy === "balance") {
      filtered.sort((a, b) => Number.parseFloat(a.balance) - Number.parseFloat(b.balance))
    } else {
      filtered.sort((a, b) => a.address.localeCompare(b.address))
    }

    setFilteredBalances(filtered)
  }, [balances, selectedChain, searchTerm, sortBy])

  useEffect(() => {
    loadBalances()
  }, [])

  const chainNames = ["all", ...new Set(balances.map((b) => b.chainName))]
  const totalPerChain = chains.map((chain) => ({
    name: chain.name,
    total: balances.filter((b) => b.chainName === chain.name).reduce((sum, b) => sum + Number.parseFloat(b.balance), 0),
  }))

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      <div className="px-4 py-8 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <LowBalanceAlerts balances={balances} />

        <div className="mt-8 space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="text-2xl font-bold">Signer Balances</h2>
            <RefreshButton onRefresh={loadBalances} loading={loading} />
          </div>

          <Filters
            chains={chainNames}
            selectedChain={selectedChain}
            onChainChange={setSelectedChain}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />

          <BalanceTable balances={filteredBalances} loading={loading} />
        </div>
      </div>
    </main>
  )
}
