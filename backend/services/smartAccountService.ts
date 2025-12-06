import { ethers } from "ethers";
import SmartAccountABI from "../../contracts/SmartAccount.json";

function getEnvVar(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing required environment variable: ${name}`);
  return v;
}

const RPC_URL = getEnvVar("RPC_URL");
const PRIVATE_KEY = getEnvVar("PRIVATE_KEY");
const SMART_ACCOUNT_ADDRESS = process.env.SMART_ACCOUNT_ADDRESS || "";

const provider = new ethers.JsonRpcProvider(RPC_URL);
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

let smartAccountContract: ethers.Contract | null = null;

if (SMART_ACCOUNT_ADDRESS) {
  try {
    smartAccountContract = new ethers.Contract(
      SMART_ACCOUNT_ADDRESS,
      SmartAccountABI.abi ?? SmartAccountABI,
      wallet
    );
  } catch (error) {
    console.warn("SmartAccount contract not initialized:", error);
  }
}

export default {
  /**
   * Deposit collateral into smart account
   */
  async depositCollateral(
    userAddress: string,
    tokenAddress: string,
    amount: string
  ): Promise<any> {
    if (!smartAccountContract) {
      throw new Error("SmartAccount contract not deployed");
    }

    // For user deposits, we need to use the user's wallet
    // This is a simplified version - in production, users would sign transactions
    // For now, we'll use the service wallet to simulate
    const userWallet = new ethers.Wallet(PRIVATE_KEY, provider);
    const contract = new ethers.Contract(
      SMART_ACCOUNT_ADDRESS,
      SmartAccountABI.abi ?? SmartAccountABI,
      userWallet
    );

    const tx = await contract.depositCollateral(tokenAddress, amount);
    return await tx.wait();
  },

  /**
   * Withdraw collateral from smart account
   */
  async withdrawCollateral(
    userAddress: string,
    tokenAddress: string,
    amount: string
  ): Promise<any> {
    if (!smartAccountContract) {
      throw new Error("SmartAccount contract not deployed");
    }

    const userWallet = new ethers.Wallet(PRIVATE_KEY, provider);
    const contract = new ethers.Contract(
      SMART_ACCOUNT_ADDRESS,
      SmartAccountABI.abi ?? SmartAccountABI,
      userWallet
    );

    const tx = await contract.withdrawCollateral(tokenAddress, amount);
    return await tx.wait();
  },

  /**
   * Lock collateral for a trade
   */
  async lockCollateral(
    userAddress: string,
    tokenAddress: string,
    amount: string
  ): Promise<any> {
    if (!smartAccountContract) {
      throw new Error("SmartAccount contract not deployed");
    }

    const userWallet = new ethers.Wallet(PRIVATE_KEY, provider);
    const contract = new ethers.Contract(
      SMART_ACCOUNT_ADDRESS,
      SmartAccountABI.abi ?? SmartAccountABI,
      userWallet
    );

    const tx = await contract.lockCollateral(tokenAddress, amount);
    return await tx.wait();
  },

  /**
   * Unlock collateral after a trade
   */
  async unlockCollateral(
    userAddress: string,
    tokenAddress: string,
    amount: string
  ): Promise<any> {
    if (!smartAccountContract) {
      throw new Error("SmartAccount contract not deployed");
    }

    const userWallet = new ethers.Wallet(PRIVATE_KEY, provider);
    const contract = new ethers.Contract(
      SMART_ACCOUNT_ADDRESS,
      SmartAccountABI.abi ?? SmartAccountABI,
      userWallet
    );

    const tx = await contract.unlockCollateral(tokenAddress, amount);
    return await tx.wait();
  },

  /**
   * Execute a settlement (swap)
   */
  async executeSettlement(
    userAddress: string,
    fromToken: string,
    toToken: string,
    fromAmount: string,
    minToAmount: string,
    dexAddress: string
  ): Promise<any> {
    if (!smartAccountContract) {
      throw new Error("SmartAccount contract not deployed");
    }

    const userWallet = new ethers.Wallet(PRIVATE_KEY, provider);
    const contract = new ethers.Contract(
      SMART_ACCOUNT_ADDRESS,
      SmartAccountABI.abi ?? SmartAccountABI,
      userWallet
    );

    const tx = await contract.executeSettlement(
      fromToken,
      toToken,
      fromAmount,
      minToAmount,
      dexAddress
    );
    return await tx.wait();
  },

  /**
   * Execute a hedge settlement
   */
  async executeHedgeSettlement(
    userAddress: string,
    fromToken: string,
    toToken: string,
    percent: number
  ): Promise<any> {
    if (!smartAccountContract) {
      throw new Error("SmartAccount contract not deployed");
    }

    const userWallet = new ethers.Wallet(PRIVATE_KEY, provider);
    const contract = new ethers.Contract(
      SMART_ACCOUNT_ADDRESS,
      SmartAccountABI.abi ?? SmartAccountABI,
      userWallet
    );

    const tx = await contract.executeHedgeSettlement(fromToken, toToken, percent);
    return await tx.wait();
  },

  /**
   * Get available collateral
   */
  async getAvailableCollateral(
    userAddress: string,
    tokenAddress: string
  ): Promise<string> {
    if (!smartAccountContract) {
      throw new Error("SmartAccount contract not deployed");
    }

    const result = await smartAccountContract.getAvailableCollateral(
      userAddress,
      tokenAddress
    );
    return result.toString();
  },

  /**
   * Get total collateral
   */
  async getTotalCollateral(
    userAddress: string,
    tokenAddress: string
  ): Promise<string> {
    if (!smartAccountContract) {
      throw new Error("SmartAccount contract not deployed");
    }

    const result = await smartAccountContract.getTotalCollateral(
      userAddress,
      tokenAddress
    );
    return result.toString();
  },

  /**
   * Get locked collateral
   */
  async getLockedCollateral(
    userAddress: string,
    tokenAddress: string
  ): Promise<string> {
    if (!smartAccountContract) {
      throw new Error("SmartAccount contract not deployed");
    }

    const result = await smartAccountContract.getLockedCollateral(
      userAddress,
      tokenAddress
    );
    return result.toString();
  },

  /**
   * Get settlement count
   */
  async getSettlementCount(userAddress: string): Promise<number> {
    if (!smartAccountContract) {
      throw new Error("SmartAccount contract not deployed");
    }

    const result = await smartAccountContract.getSettlementCount(userAddress);
    return Number(result);
  },

  /**
   * Get settlement by index
   */
  async getSettlement(
    userAddress: string,
    index: number
  ): Promise<{
    fromToken: string;
    toToken: string;
    fromAmount: string;
    toAmount: string;
    timestamp: number;
    executed: boolean;
  }> {
    if (!smartAccountContract) {
      throw new Error("SmartAccount contract not deployed");
    }

    const settlement = await smartAccountContract.getSettlement(userAddress, index);
    return {
      fromToken: settlement.fromToken,
      toToken: settlement.toToken,
      fromAmount: settlement.fromAmount.toString(),
      toAmount: settlement.toAmount.toString(),
      timestamp: Number(settlement.timestamp),
      executed: settlement.executed,
    };
  },

  /**
   * Get all settlements for a user
   */
  async getAllSettlements(userAddress: string): Promise<any[]> {
    if (!smartAccountContract) {
      throw new Error("SmartAccount contract not deployed");
    }

    const count = await this.getSettlementCount(userAddress);
    const settlements = [];

    for (let i = 0; i < count; i++) {
      const settlement = await this.getSettlement(userAddress, i);
      settlements.push(settlement);
    }

    return settlements;
  },
};

