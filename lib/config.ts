import type { ChainsConfig, SignersConfig } from "./types"

export const chains: ChainsConfig[] = [
  { name: "Ethereum Mainnet", chainId: 1, explorer: "https://etherscan.io" },
  { name: "Polygon", chainId: 137, explorer: "https://polygonscan.com" },
  { name: "Arbitrum", chainId: 42161, explorer: "https://arbiscan.io" },
  { name: "Optimism", chainId: 10, explorer: "https://optimistic.etherscan.io" },
]

export const signers: SignersConfig[] = [
  { address: "0x1234567890123456789012345678901234567890", chain: "Ethereum Mainnet" },
  { address: "0xabcdefabcdefabcdefabcdefabcdefabcdefabcd", chain: "Polygon" },
  { address: "0xdeadbeefdeadbeefdeadbeefdeadbeefdeadbeef", chain: "Arbitrum" },
  { address: "0xcafebabecafebabecafebabecafebabecafebabe", chain: "Optimism" },
  { address: "0xfeedfeedfeedfeedfeedfeedfeedfeedfeedfeed", chain: "Ethereum Mainnet" },
]

// Balance thresholds for alerts (in native tokens)
export const LOW_BALANCE_THRESHOLD = 0.1
export const WARNING_BALANCE_THRESHOLD = 0.5

// Chain colors for visual identification
export const CHAIN_COLORS: Record<string, string> = {
  "Ethereum Mainnet": "bg-blue-500",
  Polygon: "bg-purple-500",
  Arbitrum: "bg-sky-400",
  Optimism: "bg-red-500",
}
