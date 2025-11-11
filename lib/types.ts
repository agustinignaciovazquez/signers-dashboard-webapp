export interface ChainsConfig {
  name: string
  chainId: number
  explorer: string
}

export interface SignersConfig {
  address: string
  chain: string
}

export interface BalanceData {
  address: string
  shortAddress: string
  chain: string
  chainName: string
  balance: string
  status: "healthy" | "warning" | "low"
  chainColor: string
  explorerUrl: string
}
