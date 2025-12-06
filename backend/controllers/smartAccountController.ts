import { Request, Response } from "express";
import smartAccountService from "../services/smartAccountService";

export const depositCollateral = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    const { userAddress, tokenAddress, amount } = req.body;

    if (!userAddress || !tokenAddress || !amount) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const result = await smartAccountService.depositCollateral(
      userAddress,
      tokenAddress,
      amount
    );

    return res.json({
      message: "Collateral deposited successfully",
      transactionHash: result.hash,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return res.status(500).json({ error: message });
  }
};

export const withdrawCollateral = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    const { userAddress, tokenAddress, amount } = req.body;

    if (!userAddress || !tokenAddress || !amount) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const result = await smartAccountService.withdrawCollateral(
      userAddress,
      tokenAddress,
      amount
    );

    return res.json({
      message: "Collateral withdrawn successfully",
      transactionHash: result.hash,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return res.status(500).json({ error: message });
  }
};

export const lockCollateral = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    const { userAddress, tokenAddress, amount } = req.body;

    if (!userAddress || !tokenAddress || !amount) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const result = await smartAccountService.lockCollateral(
      userAddress,
      tokenAddress,
      amount
    );

    return res.json({
      message: "Collateral locked successfully",
      transactionHash: result.hash,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return res.status(500).json({ error: message });
  }
};

export const unlockCollateral = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    const { userAddress, tokenAddress, amount } = req.body;

    if (!userAddress || !tokenAddress || !amount) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const result = await smartAccountService.unlockCollateral(
      userAddress,
      tokenAddress,
      amount
    );

    return res.json({
      message: "Collateral unlocked successfully",
      transactionHash: result.hash,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return res.status(500).json({ error: message });
  }
};

export const executeSettlement = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    const {
      userAddress,
      fromToken,
      toToken,
      fromAmount,
      minToAmount,
      dexAddress,
    } = req.body;

    if (
      !userAddress ||
      !fromToken ||
      !toToken ||
      !fromAmount ||
      !minToAmount ||
      !dexAddress
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const result = await smartAccountService.executeSettlement(
      userAddress,
      fromToken,
      toToken,
      fromAmount,
      minToAmount,
      dexAddress
    );

    return res.json({
      message: "Settlement executed successfully",
      transactionHash: result.hash,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return res.status(500).json({ error: message });
  }
};

export const executeHedgeSettlement = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    const { userAddress, fromToken, toToken, percent } = req.body;

    if (!userAddress || !fromToken || !toToken || !percent) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const result = await smartAccountService.executeHedgeSettlement(
      userAddress,
      fromToken,
      toToken,
      percent
    );

    return res.json({
      message: "Hedge settlement executed successfully",
      transactionHash: result.hash,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return res.status(500).json({ error: message });
  }
};

export const getCollateral = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    const { userAddress, tokenAddress } = req.query;

    if (!userAddress || !tokenAddress) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const [available, total, locked] = await Promise.all([
      smartAccountService.getAvailableCollateral(
        userAddress as string,
        tokenAddress as string
      ),
      smartAccountService.getTotalCollateral(
        userAddress as string,
        tokenAddress as string
      ),
      smartAccountService.getLockedCollateral(
        userAddress as string,
        tokenAddress as string
      ),
    ]);

    return res.json({
      available,
      total,
      locked,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return res.status(500).json({ error: message });
  }
};

export const getSettlements = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    const { userAddress } = req.query;

    if (!userAddress) {
      return res.status(400).json({ error: "Missing userAddress" });
    }

    const settlements = await smartAccountService.getAllSettlements(
      userAddress as string
    );

    return res.json({ settlements });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return res.status(500).json({ error: message });
  }
};

export const getSettlement = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    const { userAddress, index } = req.query;

    if (!userAddress || index === undefined) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const settlement = await smartAccountService.getSettlement(
      userAddress as string,
      Number(index)
    );

    return res.json({ settlement });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return res.status(500).json({ error: message });
  }
};

