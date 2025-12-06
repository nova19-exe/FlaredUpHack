import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Toaster } from "@/components/ui/toaster";
import { Web3Provider } from "@/components/providers/web3-provider";

export const metadata: Metadata = {
  title: "FlareTrade",
  description: "Trade Smarter on Flare.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <Web3Provider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 p-4 md:p-6 lg:p-8">{children}</main>
          </div>
          <Toaster />
        </Web3Provider>
      </body>
    </html>
  );
}
