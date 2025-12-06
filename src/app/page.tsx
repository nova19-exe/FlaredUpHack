import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, Shield, Repeat, UserCheck } from "lucide-react";
import Link from "next/link";

const features = [
  {
    title: "Real-Time, Trustworthy Data",
    description: "Get ultra-reliable, live prices from Flare's FTSO. No more worrying about manipulated data from a single source.",
    icon: Zap,
  },
  {
    title: "Automated Trading Strategies",
    description: "Set simple 'if this, then that' rules. For example, if BTC drops 2.5%, automatically swap a portion to a stablecoin to protect your funds.",
    icon: Shield,
  },
  {
    title: "Trade Across Blockchains",
    description: "Easily swap assets like XRP directly on the Flare network, giving you more options for fast and reliable hedging.",
    icon: Repeat,
  },
  {
    title: "Simple & Secure Experience",
    description: "Manage complex strategies with ease. Flare's Smart Accounts make advanced trading accessible and secure for everyone.",
    icon: UserCheck,
  },
];

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center text-center py-12 lg:py-24">
      <main className="flex-1 container px-4 md:px-6">
        <section className="w-full">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-4xl font-headline tracking-tighter sm:text-6xl xl:text-7xl/none bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                Automate Your Edge.
                <br />
                Decentralize Your Risk.
              </h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Trade smarter with automated strategies and reliable, decentralized data from the Flare network. Stop worrying about centralized exchanges and slow trades—let FlareTrade react to the market for you.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild size="lg">
                <Link href="/trade">Start Trading</Link>
              </Button>
          </div>
</div>

        </section>

        <section className="w-full pt-16 mt-16 border-t">
            <h2 className="text-3xl font-headline tracking-tighter sm:text-4xl mb-12">The Flare Advantage</h2>
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <Card key={feature.title} className="text-left bg-card/50 backdrop-blur-sm border-white/10">
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <feature.icon className="h-6 w-6 text-accent" />
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
