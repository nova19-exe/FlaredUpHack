export type Asset = {
  name: string;
  ticker: string;
  price: number;
  change24h: number;
};

export const assets: Asset[] = [
  { name: "Bitcoin", ticker: "BTC", price: 67123.45, change24h: 1.5 },
  { name: "Ethereum", ticker: "ETH", price: 3500.00, change24h: 2.1 },
  { name: "Solana", ticker: "SOL", price: 150.00, change24h: -1.2 },
  { name: "Tether", ticker: "USDT", price: 1.00, change24h: 0.01 },
  { name: "USD Coin", ticker: "USDC", price: 1.00, change24h: -0.02 },
  { name: "Dai", ticker: "DAI", price: 0.99, change24h: 0.05 },
  { name: "XRP", ticker: "XRP", price: 0.52, change24h: -2.3 },
  { name: "Flare", ticker: "FLR", price: 0.025, change24h: 3.5 },
];

export type HedgeExecution = {
  id: string;
  date: string;
  fromAsset: string;
  fromAmount: number;
  toAsset: string;
  toAmount: number;
  status: "Completed" | "Pending" | "Failed";
  txHash: string;
};

export const hedgeHistory: HedgeExecution[] = [
  { id: "1", date: "2024-07-21 14:30", fromAsset: "BTC", fromAmount: 0.3, toAsset: "USDC", toAmount: 20137.04, status: "Completed", txHash: "0x123...abc" },
  { id: "2", date: "2024-07-19 09:15", fromAsset: "BTC", fromAmount: 0.5, toAsset: "USDT", toAmount: 33500.00, status: "Completed", txHash: "0x456...def" },
  { id: "3", date: "2024-07-18 22:00", fromAsset: "BTC", fromAmount: 0.2, toAsset: "DAI", toAmount: 13450.50, status: "Completed", txHash: "0x789...ghi" },
  { id: "4", date: "2024-07-15 11:45", fromAsset: "BTC", fromAmount: 1.0, toAsset: "XRP", toAmount: 129083.56, status: "Completed", txHash: "0xabc...123" },
];

export type ChartData = {
    date: string;
    value: number;
};

export const performanceData: ChartData[] = [
    { date: "Jan", value: 100000 },
    { date: "Feb", value: 115000 },
    { date: "Mar", value: 105000 },
    { date: "Apr", value: 130000 },
    { date: "May", value: 125000 },
    { date: "Jun", value: 140000 },
    { date: "Jul", value: 155000 },
];
