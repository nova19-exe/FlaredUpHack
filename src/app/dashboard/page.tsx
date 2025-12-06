import { AssetPrices } from "@/components/feature/asset-prices";
import { PerformanceChart } from "@/components/feature/performance-chart";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <AssetPrices />
      <PerformanceChart />
    </div>
  );
}
