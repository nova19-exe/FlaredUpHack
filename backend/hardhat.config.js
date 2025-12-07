import "dotenv/config";
import "@nomicfoundation/hardhat-toolbox";

const config = {
  solidity: "0.8.20",

  networks: {
    flare: {
      url: "https://coston2-api.flare.network/ext/C/rpc",
      accounts: ["0xdb162b7ce0da6d19909695c379fc0f7e16033f97bd4ba9a27b671496a954f735"],
    },
  },

  paths: {
    sources: "./contracts",
    artifacts: "./artifacts",
  },
};

export default config;
