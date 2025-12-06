"use client"

import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { HedgeHistory } from "../hedge-history";
import { SlidersHorizontal } from "lucide-react";
import { useEffect, useState } from "react";

export function InterfaceSettings() {
    const [isDarkMode, setIsDarkMode] = useState(true);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const root = window.document.documentElement;
            if (isDarkMode) {
                root.classList.add("dark");
            } else {
                root.classList.remove("dark");
            }
        }
    }, [isDarkMode]);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <AccordionItem value="interface-notifications">
            <AccordionTrigger className="text-lg font-semibold">
                <div className="flex items-center gap-3">
                    <SlidersHorizontal className="h-5 w-5" />
                    Interface & Notifications
                </div>
            </AccordionTrigger>
            <AccordionContent className="pt-4">
                <Card>
                    <CardHeader>
                        <CardDescription>
                           General settings for usability, theme, and alert history.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-8">
                        <div className="space-y-4">
                            <h4 className="font-medium">Theme Selection</h4>
                            <p className="text-sm text-muted-foreground">
                                Toggle between Dark Mode (default) and Light Mode.
                            </p>
                            <div className="flex items-center space-x-2">
                                <Switch id="theme-mode" checked={isDarkMode} onCheckedChange={toggleTheme} />
                                <Label htmlFor="theme-mode">Dark Mode</Label>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h4 className="font-medium">Alert & Hedge History</h4>
                             <p className="text-sm text-muted-foreground">
                                A log of all automated trades, failed transactions, and price alerts.
                            </p>
                            <div className="border rounded-lg">
                                <HedgeHistory />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </AccordionContent>
        </AccordionItem>
    );
}
