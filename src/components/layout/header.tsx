"use client";

import { Button } from "@/components/ui/button";
import {
  BarChart,
  Bot,
  History,
  Settings,
  Wallet,
  LogOut,
  Home,
  CandlestickChart,
  User,
  Bell,
  Menu,
} from "lucide-react";
import { Logo } from "@/components/icons/logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import {
  useConnect,
  useDisconnect,
  useBalance,
  useChainId,
  useAccount,
} from "wagmi";

import { flare } from "viem/chains";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Badge } from "../ui/badge";
import { notifications } from "@/lib/data";

/* -------------------------------- LINKS -------------------------------- */

const links = [
  { href: "/", label: "Home", icon: Home },
  { href: "/dashboard", label: "Dashboard", icon: BarChart },
  { href: "/trade", label: "Trade", icon: CandlestickChart },
  { href: "/portfolio", label: "Portfolio", icon: User },
  { href: "/hedging", label: "Hedging Tool", icon: Bot },
  { href: "/history", label: "History", icon: History },
  { href: "/settings", label: "Settings", icon: Settings },
];

/* -------------------------------- NAV LINKS -------------------------------- */

function NavLinks({ isMobile = false }: { isMobile?: boolean }) {
  const pathname = usePathname();
  const Comp = isMobile ? "div" : "nav";

  return (
    <Comp
      className={cn(
        "items-center text-sm font-medium",
        isMobile ? "flex flex-col gap-4 mt-6" : "hidden md:flex md:gap-8"
      )}
    >
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            "transition-colors hover:text-primary",
            pathname === link.href
              ? "text-primary font-semibold"
              : "text-muted-foreground",
            isMobile && "text-lg"
          )}
        >
          {link.label}
        </Link>
      ))}
    </Comp>
  );
}

/* -------------------------------- ✅ WALLET BUTTON (HYDRATION FIXED) -------------------------------- */

function ConnectWalletButton() {
  const { connectors, connect } = useConnect();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: balance } = useBalance({ address });
  const chainId = useChainId();
  const router = useRouter();

  // ✅ HYDRATION FIX
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const shortAddress = address
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : "";

  const isFlare = chainId === flare.id;

  const handleDisconnect = () => {
    disconnect();
    router.push("/");
  };

  if (isConnected) {
    return (
      <div className="flex items-center gap-3">
        <Badge variant={isFlare ? "success" : "destructive"}>
          {isFlare ? "Flare" : "Wrong Network"}
        </Badge>

        <Button variant="outline">
          💰 {balance ? (Number(balance.value) / Math.pow(10, balance.decimals)).toFixed(4) : "0"}{" "}
          {balance?.symbol}
        </Button>

        <Button variant="outline">{shortAddress}</Button>

        <Button variant="destructive" onClick={handleDisconnect}>
          <LogOut className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <Button onClick={() => connect({ connector: connectors[0] })}>
      <Wallet className="mr-2 h-4 w-4" />
      Connect Wallet
    </Button>
  );
}

/* -------------------------------- NOTIFICATIONS -------------------------------- */

function Notifications() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <Button variant="outline" size="icon" onClick={() => setOpen(!open)}>
        <Bell className="h-5 w-5" />
      </Button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 rounded-lg border bg-background shadow-lg">
          <div className="p-4">
            <h4 className="font-medium text-lg">Notifications</h4>
            <p className="text-sm text-muted-foreground">
              You have {notifications.length} new notifications.
            </p>
          </div>

          <div className="space-y-2 p-4 pt-0 border-t">
            {notifications.map((notification) => (
              <div key={notification.id} className="flex items-start gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                  {notification.type === "success"
                    ? "✅"
                    : notification.type === "error"
                    ? "❌"
                    : "🔔"}
                </div>
                <div>
                  <p className="font-semibold text-sm">
                    {notification.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {notification.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* -------------------------------- HEADER -------------------------------- */

export function Header() {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center border-b border-white/10 bg-background/80 px-4 backdrop-blur-sm md:px-6">
      <div className="flex items-center gap-2 mr-auto">
        <Logo />
        <h1 className="text-xl font-headline font-bold">FlareTrade</h1>
      </div>

      <div className="hidden lg:flex flex-1 justify-center">
        <NavLinks />
      </div>

      <div className="ml-auto flex items-center gap-2 shrink-0">
        <Notifications />
        <ConnectWalletButton />

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>

          <SheetContent side="right">
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-2 mt-4">
                <Logo />
                <h1 className="text-xl font-semibold">FlareTrade</h1>
              </div>
              <NavLinks isMobile />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
