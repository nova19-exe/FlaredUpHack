import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Crosshair, Shield, Zap } from "lucide-react";
import Link from "next/link";

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
    <div className="flex flex-col items-center justify-center text-center py-12 lg:py-24">
      <main className="flex-1">
        <section className="w-full">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4 text-center lg:text-left">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    FlareTrade
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl mx-auto lg:mx-0">
                    Trade Smarter on Flare
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center lg:justify-start">
                  <Button asChild size="lg">
                    <Link href="#">Connect Wallet</Link>
                  </Button>
                  <Button asChild size="lg" variant="secondary">
                     <Link href="/hedging">Start Trading</Link>
                  </Button>
                </div>
              </div>
              <div className="mx-auto flex w-full items-center justify-center">
                 <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {features.map((feature) => (
                    <Card key={feature.title}>
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
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}