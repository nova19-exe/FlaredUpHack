import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Crosshair, Shield, Zap } from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/layout/header";

const features = [
  {
    title: "Live Prices (FTSO)",
    description: "Real-time, decentralized price feeds from the Flare Time Series Oracle.",
    icon: Zap,
  },
  {
    title: "Cross-Chain Trades (FAssets)",
    description: "Seamlessly trade assets from other blockchains like BTC on Flare.",
    icon: CheckCircle,
  },
  {
    title: "Smart Accounts",
    description: "Automate your trading strategies with programmable, on-chain accounts.",
    icon: Crosshair,
  },
  {
    title: "Data Security",
    description: "Your data is secured on-chain, giving you full control and transparency.",
    icon: Shield,
  },
];

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center text-center py-12 lg:py-24">
      <main className="flex-1 container px-4 md:px-6">
        <section className="w-full">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                FlareTrade
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Trade Smarter on Flare
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              {/* The wallet connection logic is in the header now */}
              <Button asChild size="lg" variant="secondary">
                 <Link href="/hedging">Start Trading</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="w-full pt-12 mt-12 border-t">
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <Card key={feature.title} className="text-left">
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <feature.icon className="h-6 w-6 text-primary" />
                  <CardTitle className="text-base font-semibold">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
