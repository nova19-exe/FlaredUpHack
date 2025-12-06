import { http, createConfig } from 'wagmi';
import { flare } from 'wagmi/chains';
import { coinbaseWallet, injected, walletConnect } from 'wagmi/connectors';

export const config = createConfig({
  chains: [flare],
  connectors: [
    injected({ target: 'metaMask' }),
    coinbaseWallet({ appName: 'FlareTrade' }),
    walletConnect({ projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID! }),
  ],
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
