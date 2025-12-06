"use client";
import { Card } from "@/components/ui/card";
import { assets, type Asset } from "@/lib/data";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const AssetIcon = ({ ticker }: { ticker: string }) => (
  <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center font-bold">
    {ticker.charAt(0)}
  </div>
);

const AssetCard = ({ asset }: { asset: Asset }) => {
  const isUp = asset.change24h >= 0;
  return (
    <Card className="flex-1 p-4 transition-colors duration-500 hover:bg-muted/50">
      <div className="flex items-center gap-4">
        <AssetIcon ticker={asset.ticker} />
        <div>
          <p className="font-semibold">{asset.name}</p>
          <p className="text-sm text-muted-foreground">{asset.ticker}</p>
        </div>
        <div className="ml-auto text-right">
          <p className="font-semibold">
            ${asset.price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: asset.price < 10? 6:2})}
          </p>
          <p className={cn("text-sm", isUp ? "text-positive" : "text-negative")}>
            <span className="inline-flex items-center">
              {isUp ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
              {asset.change24h.toFixed(2)}%
            </span>
          </p>
        </div>
      </div>
    </Card>
  );
};

export function AssetPrices() {
  const [currentAssets, setCurrentAssets] = useState<Asset[]>(assets);

  useEffect(() => {
    async function fetchPrices() {
      const ids = currentAssets.map(a => a.id).join(",");
      const url = `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,tether,usd-coin,dai,ripple,flare-network&vs_currencies=usd&include_24hr_change=true`;

      try {
        const res = await fetch(url);
        const data = await res.json();

        setCurrentAssets(prev =>
          prev.map(asset => ({
            ...asset,
            price: data[asset.id]?.usd ?? asset.price,
            change24h: data[asset.id]?.usd_24h_change ?? asset.change24h,
          }))
        );
      } catch (err) {
        console.error("Failed to fetch prices:", err);
      }
    }

    fetchPrices(); // initial load
    const interval = setInterval(fetchPrices, 1000); // refresh every 10s
    return () => clearInterval(interval);
  }, [currentAssets]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {currentAssets.map(asset => (
        <AssetCard key={asset.ticker} asset={asset} />
      ))}
    </div>
  );
}