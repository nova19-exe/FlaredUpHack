import { AssetPrices } from "@/components/feature/asset-prices";
import { PerformanceChart } from "@/components/feature/performance-chart";
import { HedgeHistory } from "@/components/feature/hedge-history";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, DollarSign, ShieldCheck, TrendingUp, TrendingDown, GanttChartSquare } from "lucide-react";
import { cn } from "@/lib/utils";

const kpiData = [
  {
    title: "Portfolio Value",
    value: "$155,000.00",
    change: "+2.5%",
    isPositive: true,
    icon: DollarSign,
  },
  {
    title: "24h P/L",
    value: "-$1,234.56",
    change: "-0.8%",
    isPositive: false,
    icon: TrendingDown,
  },
  {
    title: "Total Trades",
    value: "152",
    change: "+12 from last month",
    isPositive: true,
    icon: GanttChartSquare,
  },
  {
    title: "Hedging Coverage",
    value: "30%",
    change: "Auto-hedging active",
    isPositive: true,
    icon: ShieldCheck,
  },
];

const KpiCard = ({ kpi }: { kpi: (typeof kpiData)[0] }) => (
    <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
            <kpi.icon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
            <div className="text-2xl font-bold">{kpi.value}</div>
            <p className={cn("text-xs", kpi.isPositive ? "text-positive" : "text-negative")}>
                {kpi.change}
            </p>
        </CardContent>
    </Card>
)

export default function DashboardPage() {
  return (
    <div className="grid gap-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpiData.map(kpi => <KpiCard key={kpi.title} kpi={kpi} />)}
      </div>
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
