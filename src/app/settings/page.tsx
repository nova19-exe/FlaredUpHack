import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion } from "@/components/ui/accordion";
import { StrategyAutomationSettings } from "@/components/feature/settings/strategy-automation";
import { FtsoDataFeedSettings } from "@/components/feature/settings/ftso-data-feed";
import { WalletManagementSettings } from "@/components/feature/settings/wallet-management";
import { InterfaceSettings } from "@/components/feature/settings/interface-settings";

export default function SettingsPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Settings</CardTitle>
                <CardDescription>Manage your automated strategies, data feeds, wallet, and interface preferences.</CardDescription>
            </CardHeader>
            <CardContent>
                <Accordion type="single" collapsible className="w-full">
                    <StrategyAutomationSettings />
                    <FtsoDataFeedSettings />
                    <WalletManagementSettings />
                    <InterfaceSettings />
                </Accordion>
            </CardContent>
        </Card>
    );
}
