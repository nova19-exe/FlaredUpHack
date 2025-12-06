import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Bot } from "lucide-react";

export function StrategyAutomationSettings() {
    return (
        <AccordionItem value="strategy-automation">
            <AccordionTrigger className="text-lg font-semibold">
                <div className="flex items-center gap-3">
                    <Bot className="h-5 w-5" />
                    Strategy Automation
                </div>
            </AccordionTrigger>
            <AccordionContent className="pt-4">
                <Card>
                    <CardHeader>
                        <CardDescription>
                            This is the core control panel for your automated hedging logic.
                            Define the exact parameters for the DApp&apos;s main value proposition.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-8">
                        <div className="space-y-4">
                            <h4 className="font-medium">Trigger Thresholds</h4>
                            <p className="text-sm text-muted-foreground">
                                Set the specific values for automated actions, like BTC price drops or high funding rates.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="btc-drop">BTC Price Drop (%)</Label>
                                    <Input id="btc-drop" type="number" defaultValue="2.5" step="0.1" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="funding-rate">Funding Rate High Threshold (%)</Label>
                                    <Input id="funding-rate" type="number" defaultValue="0.18" step="0.01" />
                                </div>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <h4 className="font-medium">Hedge Asset Selection</h4>
                            <p className="text-sm text-muted-foreground">
                                Choose the asset to hedge into when a trigger condition is met.
                            </p>
                             <Select>
                                <SelectTrigger className="w-full md:w-1/2">
                                    <SelectValue placeholder="Select an asset" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="fxrp">FXRP (FAsset)</SelectItem>
                                    <SelectItem value="fusd" disabled>Stable FAsset (Coming Soon)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-4">
                            <h4 className="font-medium">Gas & Slippage Limits</h4>
                            <p className="text-sm text-muted-foreground">
                                Protect yourself from excessive fees or poor execution by setting maximums.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label>Max Gas (Gwei)</Label>
                                    <Input type="number" defaultValue="100" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Max Slippage</Label>
                                    <div className="flex items-center gap-4">
                                        <Slider defaultValue={[0.5]} max={5} step={0.1} className="w-full" />
                                        <span className="text-sm font-mono w-16 text-right">0.5%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </AccordionContent>
        </AccordionItem>
    );
}
