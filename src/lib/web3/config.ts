'use client';
import { http, createConfig } from 'wagmi';
import { flare } from 'wagmi/chains';
import { coinbaseWallet, injected, walletConnect } from 'wagmi/connectors';

const projectId = process.env.NEXT_PUBLIC_WC_PROJECT_ID || "";

const connectors = [
  injected({ target: 'metaMask' }),
  coinbaseWallet({ appName: 'FlareTrade' }),
];

if (projectId) {
  connectors.push(walletConnect({ projectId }));
}


export const config = createConfig({
  chains: [flare],
  connectors,
  ssr: true,
  transports: {
    [flare.id]: http(),
  },
});

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}
