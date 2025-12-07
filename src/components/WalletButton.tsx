"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  connectWallet,
  getWalletState,
  type WalletState,
} from "@/lib/wallet";

export default function WalletButton() {
  const [wallet, setWallet] = useState<WalletState>({
    provider: null,
    signer: null,
    address: "",
    chainId: null,
    isConnected: false,
  });

  useEffect(() => {
    async function syncWallet() {
      const state = await getWalletState();
      setWallet(state);
    }

    // Initial load
    syncWallet();

    if ((window as any).ethereum) {
      (window as any).ethereum.on("accountsChanged", syncWallet);
      (window as any).ethereum.on("chainChanged", syncWallet);
    }

    // Cleanup listeners
    return () => {
      if ((window as any).ethereum) {
        (window as any).ethereum.removeListener("accountsChanged", syncWallet);
        (window as any).ethereum.removeListener("chainChanged", syncWallet);
      }
    };
  }, []);

  async function handleConnect() {
    try {
      const state = await connectWallet();
      setWallet(state);
    } catch (err: any) {
      alert(err.message);
    }
  }

  return (
    <Button onClick={handleConnect}>
      {wallet.isConnected
        ? `Connected: ${wallet.address.slice(0, 6)}...${wallet.address.slice(-4)}`
        : "Connect Wallet"}
    </Button>
  );
}
