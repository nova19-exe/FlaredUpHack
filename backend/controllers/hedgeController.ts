import { Request, Response } from "express";
import ftsoService from "../services/ftsoService";
import walletService from "../services/walletService";

export const hedgeBTC = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const { userAddress, fromToken, toToken, percent } = req.body;
    const btcPrice = await ftsoService.getPrice("BTC");
    const xrpPrice = await ftsoService.getPrice("XRP");

    // Example: if BTC drops >10%, hedge with XRP
    if (btcPrice.dropPercent > 10) {
      // Use SmartAccount if enabled, otherwise use default behavior
      const from = fromToken || "BTC";
      const to = toToken || "XRP";
      const hedgePercent = percent || 0.25; // default 25%
      
      await walletService.swap(from, to, hedgePercent, userAddress);
      return res.json({ message: "Hedge executed successfully" });
    }
    res.json({ message: "No hedge needed" });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return res.status(500).json({ error: message });
  }
};

export const getStatus = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const { userAddress } = req.query;
    const positions = await walletService.getPositions(userAddress as string | undefined);
    res.json({ positions });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return res.status(500).json({ error: message });
  }
};
