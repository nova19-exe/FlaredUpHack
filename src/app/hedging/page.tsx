import { HedgingTool } from "@/components/feature/hedging-tool";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Info } from "lucide-react";

export default function HedgingPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <HedgingTool />
      </div>
      <div className="lg:col-span-1">
        <Card className="sticky top-24">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Info className="h-5 w-5" />
              <CardTitle>How Hedging Works</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <p>
              When your BTC position drops by a specified percentage (your trigger), the tool automatically converts a portion of your BTC into more stable assets to mitigate further losses.
            </p>
            <div className="space-y-2">
              <h4 className="font-semibold text-foreground">Configuration:</h4>
              <ul className="list-disc list-inside space-y-1">
                <li><strong>Trigger Threshold:</strong> The % drop in BTC price that activates the hedge.</li>
                <li><strong>Hedge Percentage:</strong> The % of your BTC to convert.</li>
                <li><strong>Hedge Assets:</strong> Stablecoins (USDT, USDC, DAI) or XRP to hedge into.</li>
                <li><strong>Auto-Execute:</strong> Toggle for automatic or manual confirmation of the hedge.</li>
              </ul>
            </div>
             <p className="text-xs italic border-l-2 pl-3">
              <strong>Note:</strong> XRP is a volatile asset and not a stablecoin. Including it as a hedge asset introduces different risk dynamics compared to stablecoins.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
