import { ethers } from "ethers"
import type { ChainsConfig, SignersConfig, BalanceData } from "./types"
import { LOW_BALANCE_THRESHOLD, WARNING_BALANCE_THRESHOLD, CHAIN_COLORS } from "./config"

// Public RPC endpoints for each chain
const RPC_ENDPOINTS: Record<number, string> = {
  1: "https://eth.llamarpc.com",
  137: "https://polygon-rpc.com",
  42161: "https://arb1.arbitrum.io/rpc",
  10: "https://mainnet.optimism.io",
}

export async function fetchBalances(chains: ChainsConfig[], signers: SignersConfig[]): Promise<BalanceData[]> {
  const results: BalanceData[] = []

  for (const signer of signers) {
    const chain = chains.find((c) => c.name === signer.chain)
    if (!chain) continue

    try {
      const provider = new ethers.JsonRpcProvider(RPC_ENDPOINTS[chain.chainId])
      const balance = await provider.getBalance(signer.address)
      const formattedBalance = ethers.formatEther(balance)
      const balanceNum = Number.parseFloat(formattedBalance)

      let status: "healthy" | "warning" | "low" = "healthy"
      if (balanceNum < LOW_BALANCE_THRESHOLD) {
        status = "low"
      } else if (balanceNum < WARNING_BALANCE_THRESHOLD) {
        status = "warning"
      }

      results.push({
        address: signer.address,
        shortAddress: `${signer.address.slice(0, 6)}...${signer.address.slice(-4)}`,
        chain: signer.chain,
        chainName: chain.name,
        balance: formattedBalance,
        status,
        chainColor: CHAIN_COLORS[chain.name] || "bg-gray-500",
        explorerUrl: `${chain.explorer}/address/${signer.address}`,
      })
    } catch (error) {
      console.error(`Failed to fetch balance for ${signer.address}:`, error)
      results.push({
        address: signer.address,
        shortAddress: `${signer.address.slice(0, 6)}...${signer.address.slice(-4)}`,
        chain: signer.chain,
        chainName: chain!.name,
        balance: "Error",
        status: "healthy",
        chainColor: CHAIN_COLORS[chain!.name] || "bg-gray-500",
        explorerUrl: `${chain!.explorer}/address/${signer.address}`,
      })
    }
  }

  return results
}
