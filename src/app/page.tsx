import { AssetPrices } from "@/components/feature/asset-prices";
import { PerformanceChart } from "@/components/feature/performance-chart";
import { HedgeHistory } from "@/components/feature/hedge-history";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="grid gap-6">
      <AssetPrices />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <PerformanceChart />
        </div>
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-medium">
                Recent Activity
              </CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <HedgeHistory />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
