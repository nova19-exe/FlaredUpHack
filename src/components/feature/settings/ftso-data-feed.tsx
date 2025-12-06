import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Rss } from "lucide-react";

export function FtsoDataFeedSettings() {
    return (
        <AccordionItem value="ftso-data-feed">
            <AccordionTrigger className="text-lg font-semibold">
                <div className="flex items-center gap-3">
                    <Rss className="h-5 w-5" />
                    FTSO Data Feed Preferences
                </div>
            </AccordionTrigger>
            <AccordionContent className="pt-4">
                <Card>
                    <CardHeader>
                        <CardDescription>
                            Select which FTSO data feeds your contract should use and set your preferences for data latency and alerts.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-8">
                         <div className="space-y-4">
                            <h4 className="font-medium">Feed Latency Tolerance</h4>
                            <p className="text-sm text-muted-foreground">
                                Set the maximum age of an FTSO price update the contract is allowed to use before aborting a trade.
                            </p>
                            <div className="flex items-center gap-4">
                                <Input id="latency" type="number" defaultValue="60" className="w-24" />
                                <Label htmlFor="latency">seconds</Label>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h4 className="font-medium">Custom Price Alerts</h4>
                            <p className="text-sm text-muted-foreground">
                                Get non-automated push notifications when an asset hits a manual price target.
                            </p>
                            <div className="flex items-center space-x-2">
                                <Switch id="price-alerts" />
                                <Label htmlFor="price-alerts">Enable Price Alerts</Label>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </AccordionContent>
        </AccordionItem>
    );
}
