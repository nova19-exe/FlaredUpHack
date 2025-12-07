import { createConfig, http } from "wagmi";
import { injected } from "wagmi/connectors";
import { flare } from "wagmi/chains";

// ✅ Flare Coston2 Testnet Config
export const config = createConfig({
  chains: [flare],
  connectors: [
    injected({
      shimDisconnect: true,
    }),
  ],
  transports: {
    [flare.id]: http("https://coston2-api.flare.network/ext/C/rpc"),
  },
});
