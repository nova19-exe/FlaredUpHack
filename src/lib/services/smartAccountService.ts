/**
 * Frontend service for interacting with SmartAccount API endpoints
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

export interface CollateralInfo {
  available: string;
  total: string;
  locked: string;
}

export interface Settlement {
  fromToken: string;
  toToken: string;
  fromAmount: string;
  toAmount: string;
  timestamp: number;
  executed: boolean;
}

class SmartAccountService {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(error.error || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  /**
   * Deposit collateral into smart account
   */
  async depositCollateral(
    userAddress: string,
    tokenAddress: string,
    amount: string
  ): Promise<{ message: string; transactionHash: string }> {
    return this.request('/smart-account/collateral/deposit', {
      method: 'POST',
      body: JSON.stringify({ userAddress, tokenAddress, amount }),
    });
  }

  /**
   * Withdraw collateral from smart account
   */
  async withdrawCollateral(
    userAddress: string,
    tokenAddress: string,
    amount: string
  ): Promise<{ message: string; transactionHash: string }> {
    return this.request('/smart-account/collateral/withdraw', {
      method: 'POST',
      body: JSON.stringify({ userAddress, tokenAddress, amount }),
    });
  }

  /**
   * Lock collateral for a trade
   */
  async lockCollateral(
    userAddress: string,
    tokenAddress: string,
    amount: string
  ): Promise<{ message: string; transactionHash: string }> {
    return this.request('/smart-account/collateral/lock', {
      method: 'POST',
      body: JSON.stringify({ userAddress, tokenAddress, amount }),
    });
  }

  /**
   * Unlock collateral after a trade
   */
  async unlockCollateral(
    userAddress: string,
    tokenAddress: string,
    amount: string
  ): Promise<{ message: string; transactionHash: string }> {
    return this.request('/smart-account/collateral/unlock', {
      method: 'POST',
      body: JSON.stringify({ userAddress, tokenAddress, amount }),
    });
  }

  /**
   * Get collateral information
   */
  async getCollateral(
    userAddress: string,
    tokenAddress: string
  ): Promise<CollateralInfo> {
    return this.request(
      `/smart-account/collateral?userAddress=${userAddress}&tokenAddress=${tokenAddress}`
    );
  }

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
  ): Promise<{ message: string; transactionHash: string }> {
    return this.request('/smart-account/settlement/execute', {
      method: 'POST',
      body: JSON.stringify({
        userAddress,
        fromToken,
        toToken,
        fromAmount,
        minToAmount,
        dexAddress,
      }),
    });
  }

  /**
   * Execute a hedge settlement
   */
  async executeHedgeSettlement(
    userAddress: string,
    fromToken: string,
    toToken: string,
    percent: number
  ): Promise<{ message: string; transactionHash: string }> {
    return this.request('/smart-account/settlement/hedge', {
      method: 'POST',
      body: JSON.stringify({
        userAddress,
        fromToken,
        toToken,
        percent,
      }),
    });
  }

  /**
   * Get all settlements for a user
   */
  async getSettlements(userAddress: string): Promise<{ settlements: Settlement[] }> {
    return this.request(`/smart-account/settlements?userAddress=${userAddress}`);
  }

  /**
   * Get a specific settlement
   */
  async getSettlement(
    userAddress: string,
    index: number
  ): Promise<{ settlement: Settlement }> {
    return this.request(
      `/smart-account/settlement?userAddress=${userAddress}&index=${index}`
    );
  }
}

export const smartAccountService = new SmartAccountService();

