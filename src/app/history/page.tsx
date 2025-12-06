import { HedgeHistory } from "@/components/feature/hedge-history";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function HistoryPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Hedge Execution History</CardTitle>
                <CardDescription>A log of all past automated and manual hedge executions.</CardDescription>
            </CardHeader>
            <CardContent>
                <HedgeHistory />
            </CardContent>
        </Card>
    );
}
