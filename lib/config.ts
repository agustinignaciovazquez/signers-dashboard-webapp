import type { ChainsConfig, SignersConfig } from "./types"

export const chains: ChainsConfig[] = [
  { name: "Ethereum Mainnet", chainId: 1, explorer: "https://etherscan.io" },
  { name: "Polygon", chainId: 137, explorer: "https://polygonscan.com" },
  { name: "Arbitrum", chainId: 42161, explorer: "https://arbiscan.io" },
  { name: "Optimism", chainId: 10, explorer: "https://optimistic.etherscan.io" },
  { name: "Gnosis", chainId: 100, explorer: "https://gnosisscan.io" },
  { name: "UniChain", chainId: 130, explorer: "https://uniscan.xyz" },
  { name: "Mantle", chainId: 5000, explorer: "https://explorer.mantle.xyz" },
  { name: "Base", chainId: 8453, explorer: "https://basescan.org" },
  { name: "ApeChain", chainId: 33139, explorer: "https://apescan.io" },
  { name: "Celo", chainId: 42220, explorer: "https://celoscan.io" },
  { name: "Linea", chainId: 59144, explorer: "https://lineascan.build" },
  { name: "Chiliz", chainId: 88888, explorer: "https://chiliscan.com" },
]

export const signers: SignersConfig[] = [
  { address: "0xfC01A703f41a9cdCbba126b13596881d462aa777", chain: "Mantle" },
  { address: "0xfC01A703f41a9cdCbba126b13596881d462aa777", chain: "ApeChain" },
  { address: "0xe29D840B4654CFA0b41EDB7a23e849d3Bfc3b5c1", chain: "Arbitrum" },
  { address: "0x45A012d41750af882804dfFf6284d86292F36B8a", chain: "Gnosis" },
  { address: "0xfC01A703f41a9cdCbba126b13596881d462aa777", chain: "Arbitrum" },
  { address: "0xfC01A703f41a9cdCbba126b13596881d462aa777", chain: "Chiliz" },
  { address: "0xfC01A703f41a9cdCbba126b13596881d462aa777", chain: "Enuls" },
  { address: "0xfC01A703f41a9cdCbba126b13596881d462aa777", chain: "Gnosis" },
  { address: "0xfC01A703f41a9cdCbba126b13596881d462aa777", chain: "Celo" },
  { address: "0xe29D840B4654CFA0b41EDB7a23e849d3Bfc3b5c1", chain: "Base" },
  { address: "0xfC01A703f41a9cdCbba126b13596881d462aa777", chain: "Linea" },
  { address: "0xfC01A703f41a9cdCbba126b13596881d462aa777", chain: "Base" },
  { address: "0xfC01A703f41a9cdCbba126b13596881d462aa777", chain: "Polygon" },
]

// Per-chain gas cost estimates (max gas used from recent transactions in native tokens)
// These represent the typical maximum gas cost per transaction on each chain
// Based on ~203,757 gas units for minting operations
export const CHAIN_GAS_COSTS: Record<string, number> = {
  "Ethereum Mainnet": 0.01, // ~203,757 gas at ~50 gwei
  Polygon: 0.0001, // ~203,757 gas at ~0.5 gwei (very cheap)
  Arbitrum: 0.00002, // ~203,757 gas at ~0.1 gwei (very low L2)
  Optimism: 0.00002, // ~203,757 gas at ~0.1 gwei (very low L2)
  Gnosis: 0.00002, // ~203,757 gas at ~0.1 gwei (xDAI stable)
  Enuls: 0.0001, // Estimated for ~203,757 gas
  Mantle: 0.00002, // ~203,757 gas at low L2 fees
  Base: 0.00001, // ~203,757 gas at ~0.05 gwei (very low L2)
  ApeChain: 0.00004, // Estimated for ~203,757 gas
  Celo: 0.00002, // ~203,757 gas at low fees
  Linea: 0.00002, // ~203,757 gas at low L2 fees
  Chiliz: 0.0002, // ~203,757 gas at higher fees
  UniChain: 0.00002, // ~203,757 gas at low L2 fees
}

// Number of transactions to reserve for low/warning thresholds
export const LOW_BALANCE_TX_COUNT = 10 // Alert when < 10 tx remaining
export const WARNING_BALANCE_TX_COUNT = 50 // Warning when < 50 tx remaining

// Balance thresholds for alerts (in native tokens) - calculated dynamically per chain
export function getLowBalanceThreshold(chainName: string): number {
  const gasCost = CHAIN_GAS_COSTS[chainName] || 0.001
  return gasCost * LOW_BALANCE_TX_COUNT
}

export function getWarningBalanceThreshold(chainName: string): number {
  const gasCost = CHAIN_GAS_COSTS[chainName] || 0.001
  return gasCost * WARNING_BALANCE_TX_COUNT
}

export function getTransactionsRemaining(balance: number, chainName: string): number {
  const gasCost = CHAIN_GAS_COSTS[chainName] || 0.001
  return Math.floor(balance / gasCost)
}

// Chain colors for visual identification
export const CHAIN_COLORS: Record<string, string> = {
  "Ethereum Mainnet": "bg-blue-500",
  Polygon: "bg-purple-500",
  Arbitrum: "bg-sky-400",
  Optimism: "bg-red-500",
  Gnosis: "bg-emerald-500",
  Enuls: "bg-green-500",
  Mantle: "bg-teal-500",
  Base: "bg-blue-600",
  ApeChain: "bg-yellow-500",
  Celo: "bg-lime-500",
  Linea: "bg-indigo-500",
  Chiliz: "bg-rose-500",
}
