"use client";
import { Button } from "@/components/ui/button";
import { BarChart, Bot, History, Settings, Wallet, LogOut, Copy, Check, Home } from "lucide-react";
import { Logo } from "@/components/icons/logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useAccount, useConnect, useDisconnect, useBalance, useChainId } from 'wagmi';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { flare } from "viem/chains";
import { useState } from "react";
import { Badge } from "../ui/badge";

const links = [
  { href: "/", label: "Home", icon: Home },
  { href: "/dashboard", label: "Dashboard", icon: BarChart },
  { href: "/hedging", label: "Hedging Tool", icon: Bot },
  { href: "/history", label: "History", icon: History },
  { href: "/settings", label: "Settings", icon: Settings },
];

function NavLinks({ isMobile = false }: { isMobile?: boolean }) {
    const pathname = usePathname();
    const Comp = isMobile ? 'div' : 'nav';
    return (
        <Comp className={cn("items-center gap-6 text-sm font-medium", isMobile ? "flex flex-col gap-4 mt-6" : "hidden md:flex")}>
            {links.map((link) => (
                <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                        "transition-colors hover:text-foreground",
                        pathname === link.href ? "text-foreground" : "text-muted-foreground",
                        isMobile && "text-lg"
                    )}
                >
                    {link.label}
                </Link>
            ))}
        </Comp>
    )
}

function ConnectWalletButton() {
  const { connectors, connect } = useConnect();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: balance } = useBalance({ address });
  const chainId = useChainId();
  const [copied, setCopied] = useState(false);

  const shortAddress = address ? `${address.slice(0, 6)}...${address.slice(-4)}` : '';
  const isFlareNetwork = chainId === flare.id;

  const handleCopy = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (isConnected) {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">
            <Wallet className="mr-2 h-4 w-4" />
            {shortAddress}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Wallet Connected</DialogTitle>
            <DialogDescription>
              View your wallet details and network status.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border p-3">
              <span className="text-sm text-muted-foreground">Address</span>
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm">{shortAddress}</span>
                <Button variant="ghost" size="icon" onClick={handleCopy} className="h-7 w-7">
                  {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>
             <div className="flex items-center justify-between rounded-lg border p-3">
                <span className="text-sm text-muted-foreground">Balance</span>
                <span className="font-mono text-sm">{balance ? `${Number(balance.formatted).toFixed(4)} ${balance.symbol}` : 'Loading...'}</span>
            </div>
            <div className="flex items-center justify-between rounded-lg border p-3">
              <span className="text-sm text-muted-foreground">Network</span>
              <Badge variant={isFlareNetwork ? "success" : "destructive"}>
                {isFlareNetwork ? "Flare Connected" : `Wrong Network (Switch to ${flare.name})`}
              </Badge>
            </div>
          </div>
          <DialogClose asChild>
            <Button onClick={() => disconnect()} variant="destructive" className="w-full mt-4">
              <LogOut className="mr-2 h-4 w-4" />
              Disconnect
            </Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    );
  }

  const walletConnectors = connectors.filter(c => c.icon);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Wallet className="mr-2 h-4 w-4" />
          Connect Wallet
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Connect Wallet</DialogTitle>
          <DialogDescription>
            Choose your preferred wallet to connect to FlareTrade.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          {walletConnectors.map((connector) => (
             <DialogClose asChild key={connector.id}>
              <Button onClick={() => connect({ connector })} variant="outline" className="w-full justify-start text-base py-6">
                <img src={connector.icon} alt={connector.name} className="h-6 w-6 mr-4" />
                {connector.name}
              </Button>
            </DialogClose>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}


export function Header() {
  return (
    <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm md:px-6">
      <div className="flex items-center gap-2">
        <Logo />
        <h1 className="text-xl font-semibold">FlareTrade</h1>
      </div>
      <div className="mx-auto">
        <NavLinks />
      </div>
      <div className="ml-auto flex items-center gap-2">
        <ConnectWalletButton />
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle navigation menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="right">
                <div className="flex flex-col items-center">
                    <div className="flex items-center gap-2 mt-4">
                        <Logo />
                        <h1 className="text-xl font-semibold">FlareTrade</h1>
                    </div>
                    <NavLinks isMobile={true} />
                </div>
            </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
