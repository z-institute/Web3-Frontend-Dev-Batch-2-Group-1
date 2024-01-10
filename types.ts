export interface FiatRate {
  symbol: "BTC" | "ETH" | "SOL" | "TON";
  price: number;
}

export interface Token {
  name: string;
  symbol: string;
  logo?: string;
  contractAddress?: string;
  tokenBalance: number;
}
