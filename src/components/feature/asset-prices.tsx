"use client";
import { Card } from "@/components/ui/card";
import { assets, type Asset } from "@/lib/data";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const AssetIcon = ({ ticker }: { ticker: string }) => {
  return (
    <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center font-bold">
      {ticker.charAt(0)}
    </div>
  );
};

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
            ${asset.price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
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
    const [currentAssets, setCurrentAssets] = useState(assets);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentAssets(prevAssets => 
                prevAssets.map(asset => {
                    const change = (Math.random() - 0.5) * 0.1; // Small random change
                    const newPrice = asset.price * (1 + change / 100);
                    const newChange24h = asset.change24h + (Math.random() - 0.5) * 0.5;
                    return { ...asset, price: newPrice, change24h: newChange24h };
                })
            );
        }, 2000); // Update every 2 seconds

        return () => clearInterval(interval);
    }, []);

  return (
    <div className="flex flex-col md:flex-row gap-4">
      {currentAssets.slice(0, 1).map((asset) => (
        <div key={asset.ticker} className="w-full md:w-2/5">
            <AssetCard asset={asset} />
        </div>
      ))}
      <div className="w-full md:w-3/5 grid grid-cols-2 lg:grid-cols-4 gap-4">
        {currentAssets.slice(1).map((asset) => (
          <AssetCard key={asset.ticker} asset={asset} />
        ))}
      </div>
    </div>
  );
}
