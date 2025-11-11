import { ethers } from "ethers"
import type { ChainsConfig, SignersConfig, BalanceData } from "./types"
import { 
  CHAIN_COLORS, 
  CHAIN_GAS_COSTS,
  getLowBalanceThreshold, 
  getWarningBalanceThreshold, 
  getTransactionsRemaining 
} from "./config"

// Public RPC endpoints for each chain
const RPC_ENDPOINTS: Record<number, string> = {
  10: "https://mainnet.optimism.io",        // Optimism
  100: "https://rpc.gnosischain.com",       // Gnosis Chain
  130: "https://mainnet.unichain.org",      // UniChain
  137: "https://polygon-rpc.com",           // Polygon
  5000: "https://rpc.mantle.xyz",           // Mantle
  8453: "https://mainnet.base.org",         // Base
  33139: "https://rpc.apechain.com",        // ApeChain
  42161: "https://arb1.arbitrum.io/rpc",    // Arbitrum One
  42220: "https://forno.celo.org",          // Celo
  59144: "https://rpc.linea.build",         // Linea
  88888: "https://rpc.chiliz.com",          // Chiliz
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

      const lowThreshold = getLowBalanceThreshold(chain.name)
      const warningThreshold = getWarningBalanceThreshold(chain.name)
      const txRemaining = getTransactionsRemaining(balanceNum, chain.name)
      const gasCost = CHAIN_GAS_COSTS[chain.name] || 0.001

      let status: "healthy" | "warning" | "low" = "healthy"
      if (balanceNum < lowThreshold) {
        status = "low"
      } else if (balanceNum < warningThreshold) {
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
        transactionsRemaining: txRemaining,
        estimatedGasCost: gasCost,
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
        transactionsRemaining: 0,
        estimatedGasCost: 0,
      })
    }
  }

  return results
}
