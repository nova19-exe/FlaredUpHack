import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export function PnlCard() {
    const pnl = 4831.23;
    const pnlPercent = 12.5;
    const isPositive = pnl >= 0;

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle className="text-base font-normal text-muted-foreground">Portfolio Value</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-3xl font-bold">$43,500.00</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="text-base font-normal text-muted-foreground">24h P&L</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center gap-2">
                        <p className={`text-3xl font-bold ${isPositive ? "text-positive" : "text-negative"}`}>
                            ${pnl.toLocaleString()}
                        </p>
                        <div className={`flex items-center text-sm font-semibold ${isPositive ? "text-positive" : "text-negative"}`}>
                            {isPositive ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                            {pnlPercent.toFixed(2)}%
                        </div>
                    </div>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle className="text-base font-normal text-muted-foreground">Total Trades</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-3xl font-bold">128</p>
                </CardContent>
            </Card>
        </>
    );
}
