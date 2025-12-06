import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Wallet, Link } from "lucide-react";

export function WalletManagementSettings() {
    return (
        <AccordionItem value="wallet-management">
            <AccordionTrigger className="text-lg font-semibold">
                <div className="flex items-center gap-3">
                    <Wallet className="h-5 w-5" />
                    Wallet & Smart Account
                </div>
            </AccordionTrigger>
            <AccordionContent className="pt-4">
                 <Card>
                    <CardHeader>
                        <CardDescription>
                            Settings related to your connection and on-chain identity on Flare.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-8">
                        <div className="space-y-4">
                            <h4 className="font-medium">Account Delegation Status</h4>
                            <p className="text-sm text-muted-foreground">
                                View and manage the current status of your delegated FLR for rewards.
                            </p>
                            <div className="flex items-center gap-4">
                                <Badge variant="success">Delegating</Badge>
                                <Button variant="outline" size="sm">Manage Delegation</Button>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h4 className="font-medium">Gas Management (FLR)</h4>
                            <p className="text-sm text-muted-foreground">
                                Deposit or withdraw FLR into your Smart Account for gas fees, or link a separate EOA.
                            </p>
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="flex-1 space-y-2">
                                    <Label htmlFor="gas-amount">Amount (FLR)</Label>
                                    <Input id="gas-amount" type="number" placeholder="0.0" />
                                </div>
                                <div className="flex items-end gap-2">
                                    <Button>Deposit</Button>
                                    <Button variant="secondary">Withdraw</Button>
                                </div>
                            </div>
                             <div className="flex items-center space-x-2 mt-4">
                                <Link className="h-4 w-4 text-muted-foreground" />
                                <Button variant="link" className="p-0 h-auto">Link a separate account for gas</Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </AccordionContent>
        </AccordionItem>
    );
}
