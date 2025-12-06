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

export type Holding = {
    name: string;
    ticker: string;
    balance: number;
    price: number;
};

export const holdings: Holding[] = [
    { name: "Bitcoin", ticker: "BTC", balance: 0.5, price: 67123.45 },
    { name: "Flare", ticker: "FLR", balance: 10000, price: 0.025 },
    { name: "XRP", ticker: "XRP", balance: 5000, price: 0.52 },
    { name: "USD Coin", ticker: "USDC", balance: 1000, price: 1.00 },
];

export type Transaction = {
  id: string;
  date: string;
  type: 'buy' | 'sell' | 'hedge';
  asset: string;
  amount: number;
  value: number;
  status: "Completed" | "Pending" | "Failed";
  txHash: string;
}

export const transactions: Transaction[] = [
  { id: "1", date: "2024-07-22 10:00", type: "buy", asset: "BTC", amount: 0.1, value: 6712.34, status: "Completed", txHash: "0x..."},
  { id: "2", date: "2024-07-21 14:30", type: "hedge", asset: "BTC", amount: 0.3, value: 20137.04, status: "Completed", txHash: "0x123...abc" },
  { id: "3", date: "2024-07-20 18:45", type: "sell", asset: "FLR", amount: 5000, value: 125.00, status: "Completed", txHash: "0x..."},
  { id: "4", date: "2024-07-19 09:15", type: "hedge", asset: "BTC", amount: 0.5, value: 33500.00, status: "Completed", txHash: "0x456...def" },
  { id: "5", date: "2024-07-18 22:00", type: "hedge", asset: "BTC", amount: 0.2, value: 13450.50, status: "Completed", txHash: "0x789...ghi" },
  { id: "6", date: "2024-07-18 12:00", type: "buy", asset: "XRP", amount: 1000, value: 520, status: "Completed", txHash: "0x..."},
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
