import { CandlestickChart } from "@/components/feature/candlestick-chart";
import { TradeForm } from "@/components/feature/trade-form";
import { HedgeHistory } from "@/components/feature/hedge-history";

export default function TradePage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-8">
            <CandlestickChart />
            <HedgeHistory />
        </div>
        <div className="lg:col-span-1">
            <TradeForm />
        </div>
    </div>
  );
}
