"use client";
import { Button } from "@/components/ui/button";
import { Wallet, BarChart, Bot, History, Settings } from "lucide-react";
import { Logo } from "@/components/icons/logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const links = [
  { href: "/", label: "Dashboard", icon: BarChart },
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

export function Header() {
  return (
    <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm md:px-6">
      <div className="flex items-center gap-2">
        <Logo />
        <h1 className="text-xl font-semibold">Flare Hedge</h1>
      </div>
      <div className="mx-auto">
        <NavLinks />
      </div>
      <div className="ml-auto flex items-center gap-2">
        <Button>
          <Wallet className="mr-2 h-4 w-4" />
          Connect Wallet
        </Button>
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
                        <h1 className="text-xl font-semibold">Flare Hedge</h1>
                    </div>
                    <NavLinks isMobile={true} />
                </div>
            </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
