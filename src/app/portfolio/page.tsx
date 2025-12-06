import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Holdings } from "@/components/feature/holdings";
import { PnlCard } from "@/components/feature/pnl-card";
import { TransactionHistory } from "@/components/feature/transaction-history";

export default function PortfolioPage() {
    return (
        <div className="space-y-8">
            <div className="grid gap-8 md:grid-cols-3">
                <PnlCard />
            </div>
            <div className="grid gap-8 lg:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Holdings</CardTitle>
                        <CardDescription>A list of your current assets.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Holdings />
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Transaction History</CardTitle>
                        <CardDescription>A log of your recent transactions.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <TransactionHistory />
                    </CardContent>
                </Card>
            </div>
             <Card>
                <CardHeader>
                    <CardTitle>Rewards</CardTitle>
                    <CardDescription>Rewards from staking and airdrops.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>No rewards to show yet.</p>
                </CardContent>
            </Card>
        </div>
    );
}
