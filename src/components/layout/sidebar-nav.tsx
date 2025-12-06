"use client";
import { BarChart, Bot, History, Settings } from "lucide-react";
import {
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { useSidebar } from "../ui/sidebar";

const links = [
  { href: "/", label: "Dashboard", icon: BarChart, tooltip: "Dashboard" },
  { href: "/hedging", label: "Hedging Tool", icon: Bot, tooltip: "Hedging Tool" },
  { href: "/history", label: "History", icon: History, tooltip: "History" },
  { href: "/settings", label: "Settings", icon: Settings, tooltip: "Settings" },
];

export function SidebarNav() {
  const pathname = usePathname();
  const { open } = useSidebar();

  return (
    <>
      <SidebarContent className="p-2">
        <SidebarMenu>
          {links.map((link) => (
            <SidebarMenuItem key={link.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === link.href}
                tooltip={{ children: link.tooltip, side: "right" }}
              >
                <Link href={link.href}>
                  <link.icon />
                  <span>{link.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-2">
         <div className="flex items-center gap-3 p-2 rounded-md bg-muted/50">
            <Avatar className="h-9 w-9">
              <AvatarImage src="https://picsum.photos/seed/user-avatar/40/40" data-ai-hint="person face" />
              <AvatarFallback>SN</AvatarFallback>
            </Avatar>
            <div className={`flex flex-col overflow-hidden transition-opacity duration-200 ${open ? 'opacity-100' : 'opacity-0'}`}>
                <p className="font-medium truncate text-sm">Satoshi Nakamoto</p>
                <p className="text-xs text-muted-foreground truncate">satoshi@gmx.com</p>
            </div>
         </div>
      </SidebarFooter>
    </>
  );
}
