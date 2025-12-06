import { z } from "zod";

export const HedgeAssetEnum = z.enum(['USDT', 'USDC', 'DAI', 'XRP']);

export const hedgingToolSchema = z.object({
  btcPrice: z.coerce.number().gt(0, "BTC price must be positive."),
  entryPrice: z.coerce.number().gt(0, "Entry price must be positive."),
  triggerThreshold: z.coerce.number().min(0.1, "Threshold must be at least 0.1%.").max(100, "Threshold cannot exceed 100%."),
  hedgePercentage: z.coerce.number().min(1, "Hedge percentage must be at least 1%.").max(100, "Hedge percentage cannot exceed 100%."),
  hedgeAssets: z.array(HedgeAssetEnum).min(1, "You must select at least one hedge asset."),
  autoExecute: z.boolean(),
  userSmartAccountAddress: z.string().regex(/^0x[a-fA-F0-9]{40}$/, "Invalid smart account address."),
});

export type HedgingToolSchema = z.infer<typeof hedgingToolSchema>;
