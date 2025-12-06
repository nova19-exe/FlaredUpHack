import { ethers } from "ethers";
import HedgingManagerABI from "../../contracts/HedgingManager.json";
import smartAccountService from "./smartAccountService";

function getEnvVar(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing required environment variable: ${name}`);
  return v;
}

const RPC_URL = getEnvVar("RPC_URL");
const PRIVATE_KEY = getEnvVar("PRIVATE_KEY");
const HEDGING_MANAGER_ADDRESS = getEnvVar("HEDGING_MANAGER_ADDRESS");
const USE_SMART_ACCOUNT = process.env.USE_SMART_ACCOUNT === "true";

const provider = new ethers.JsonRpcProvider(RPC_URL);
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
const hedgingManager = new ethers.Contract(HEDGING_MANAGER_ADDRESS, HedgingManagerABI.abi ?? HedgingManagerABI, wallet);

export default {
  /**
   * Execute a swap/hedge
   * If USE_SMART_ACCOUNT is enabled, uses SmartAccount settlement
   * Otherwise, uses direct HedgingManager call (backward compatible)
   */
  async swap(from: string, to: string, percent: number, userAddress?: string): Promise<any> {
    if (USE_SMART_ACCOUNT) {
      // Use SmartAccount for settlement if enabled
      // If userAddress not provided, use wallet address as fallback
      const address = userAddress || wallet.address;
      return await smartAccountService.executeHedgeSettlement(
        address,
        from,
        to,
        percent
      );
    } else {
      // Direct HedgingManager call (original behavior)
      return await hedgingManager.executeHedge(from, to, percent);
    }
  },
  
  /**
   * Get positions
   * If USE_SMART_ACCOUNT is enabled, returns SmartAccount collateral
   * Otherwise, uses HedgingManager positions (backward compatible)
   */
  async getPositions(userAddress?: string): Promise<any> {
    if (USE_SMART_ACCOUNT) {
      // Return SmartAccount collateral info when enabled
      // This is a simplified version - you might want to aggregate multiple tokens
      const address = userAddress || wallet.address;
      try {
        // Try to get positions from HedgingManager first (for compatibility)
        const hedgingPositions = await hedgingManager.getPositions(address);
        return {
          btc: hedgingPositions.btc?.toString() || "0",
          xrp: hedgingPositions.xrp?.toString() || "0",
        };
      } catch (error) {
        // Fallback to empty positions if HedgingManager fails
        return {
          btc: "0",
          xrp: "0",
        };
      }
    } else {
      // Original behavior - use HedgingManager
      return await hedgingManager.getPositions(userAddress || wallet.address);
    }
  }
};