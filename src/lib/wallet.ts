import { ethers } from "ethers";

export type WalletState = {
  provider: ethers.BrowserProvider | null;
  signer: ethers.JsonRpcSigner | null;
  address: string;
  chainId: number | null;
  isConnected: boolean;
};

// ✅ Flare Coston2 Auto Switch
export async function switchToFlare() {
  const flareChain = {
    chainId: "0x2C'", // Coston2 = 114
    chainName: "Flare Testnet Coston2",
    nativeCurrency: {
      name: "FLR",
      symbol: "FLR",
      decimals: 18,
    },
    rpcUrls: ["https://coston2-api.flare.network/ext/C/rpc"],
    blockExplorerUrls: ["https://coston2-explorer.flare.network"],
  };

  try {
    await (window as any).ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: flareChain.chainId }],
    });
  } catch (switchError: any) {
    if (switchError.code === 4902) {
      await (window as any).ethereum.request({
        method: "wallet_addEthereumChain",
        params: [flareChain],
      });
    }
  }
}

// ✅ Connect Wallet (FIXED)
export async function connectWallet(): Promise<WalletState> {
  if (!(window as any).ethereum) {
    throw new Error("MetaMask not installed");
  }

  await switchToFlare();

  const provider = new ethers.BrowserProvider((window as any).ethereum);
  const signer = await provider.getSigner();
  const address = await signer.getAddress();
  const network = await provider.getNetwork();

  return {
    provider,
    signer,
    address,
    chainId: Number(network.chainId),
    isConnected: true,
  };
}

// ✅ Get Current Wallet State (FIXED)
export async function getWalletState(): Promise<WalletState> {
  if (!(window as any).ethereum) {
    return {
      provider: null,
      signer: null,
      address: "",
      chainId: null,
      isConnected: false,
    };
  }

  const accounts = await (window as any).ethereum.request({
    method: "eth_accounts",
  });

  if (accounts.length === 0) {
    return {
      provider: null,
      signer: null,
      address: "",
      chainId: null,
      isConnected: false,
    };
  }

  const provider = new ethers.BrowserProvider((window as any).ethereum);
  const signer = await provider.getSigner();
  const address = await signer.getAddress();
  const network = await provider.getNetwork();

  return {
    provider,
    signer,
    address,
    chainId: Number(network.chainId),
    isConnected: true,
  };
}
