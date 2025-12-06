import { Request, Response } from "express";
import ftsoService from "../services/ftsoService";
import walletService from "../services/walletService";

export const hedgeBTC = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const btcPrice = await ftsoService.getPrice("BTC");
    const xrpPrice = await ftsoService.getPrice("XRP");

    // Example: if BTC drops >10%, hedge with XRP
    if (btcPrice.dropPercent > 10) {
      await walletService.swap("BTC", "XRP", 0.25); // swap 25% of BTC
      return res.json({ message: "Hedge executed successfully" });
    }
    res.json({ message: "No hedge needed" });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    res.status(500).json({ error: message });
  }
};

export const getStatus = async (req: Request, res: Response): Promise<Response | void> => {
  const positions = await walletService.getPositions();
  res.json({ positions });
};