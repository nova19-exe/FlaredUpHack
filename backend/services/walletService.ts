import { ethers } from "ethers";
import HedgingManagerABI from "../../contracts/HedgingManager.json";

function getEnvVar(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing required environment variable: ${name}`);
  return v;
}

const RPC_URL = getEnvVar("RPC_URL");
const PRIVATE_KEY = getEnvVar("PRIVATE_KEY");
const HEDGING_MANAGER_ADDRESS = getEnvVar("HEDGING_MANAGER_ADDRESS");

const provider = new ethers.JsonRpcProvider(RPC_URL);
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
const hedgingManager = new ethers.Contract(HEDGING_MANAGER_ADDRESS, HedgingManagerABI.abi ?? HedgingManagerABI, wallet);

export default {
  async swap(from: string, to: string, percent: number): Promise<any> {
    return await hedgingManager.executeHedge(from, to, percent);
  },
  async getPositions(): Promise<any> {
    return await hedgingManager.getPositions();
  }
};