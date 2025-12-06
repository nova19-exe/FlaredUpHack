'use server';

/**
 * @fileOverview An automated hedging tool that analyzes BTC price data and executes hedge swaps.
 *
 * - automatedHedgingTool - A function that initiates the automated hedging process.
 * - AutomatedHedgingToolInput - The input type for the automatedHedgingTool function.
 * - AutomatedHedgingToolOutput - The return type for the automatedHedgingTool function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AutomatedHedgingToolInputSchema = z.object({
  btcPrice: z.number().describe('The current price of Bitcoin (BTC).'),
  entryPrice: z.number().describe('The initial entry price of the BTC holding.'),
  triggerThreshold: z
    .number()
    .describe(
      'The percentage drop from the entry price that triggers the hedging action (e.g., 10 for a 10% drop).'
    ),
  hedgePercentage: z
    .number()
    .describe(
      'The percentage of BTC holdings to hedge into stablecoins when the trigger condition is met (e.g., 30 for 30%).'
    ),
  hedgeAssets: z
    .array(z.enum(['USDT', 'USDC', 'DAI', 'XRP']))
    .describe(
      'An array of stablecoins to hedge into (e.g., ["USDT", "USDC"]). XRP can be included but is not a stablecoin.'
    ),
  autoExecute: z
    .boolean()
    .describe(
      'A boolean indicating whether the hedge should be automatically executed or require manual confirmation.'
    ),
  userSmartAccountAddress: z
    .string()
    .describe('The address of the user smart account to use.'),
});

export type AutomatedHedgingToolInput = z.infer<typeof AutomatedHedgingToolInputSchema>;

const AutomatedHedgingToolOutputSchema = z.object({
  hedgeProposed: z.boolean().describe('Whether a hedge is proposed.'),
  swapDetails: z
    .string()
    .optional()
    .describe('Details of the swap to execute, if a hedge is proposed.'),
  transactionDetails: z
    .string()
    .optional()
    .describe('Transaction details for the hedge execution, if autoExecute is true.'),
  message: z.string().describe('Explanation of LLM choice'),
});

export type AutomatedHedgingToolOutput = z.infer<typeof AutomatedHedgingToolOutputSchema>;

export async function automatedHedgingTool(
  input: AutomatedHedgingToolInput
): Promise<AutomatedHedgingToolOutput> {
  return automatedHedgingToolFlow(input);
}

const automatedHedgingToolPrompt = ai.definePrompt({
  name: 'automatedHedgingToolPrompt',
  input: {schema: AutomatedHedgingToolInputSchema},
  output: {schema: AutomatedHedgingToolOutputSchema},
  prompt: `You are an AI-powered hedging tool that helps users protect their BTC holdings from significant price drops. You will analyze BTC price data from FTSO and, when trigger conditions are met, you will propose or automatically submit transactions through Smart Accounts to execute hedge swaps into user-selected assets (USDT, USDC, DAI, XRP).

  Here's the input data:
  - Current BTC Price: {{{btcPrice}}}
  - Entry Price: {{{entryPrice}}}
  - Trigger Threshold: {{{triggerThreshold}}}%
  - Hedge Percentage: {{{hedgePercentage}}}%
  - Hedge Assets: {{{hedgeAssets}}}
  - Auto Execute: {{{autoExecute}}}
  - Smart Account Address: {{{userSmartAccountAddress}}}

  Consider these conditions:
  1.  Has the BTC price dropped by more than the trigger threshold percentage from the entry price?
  2.  Is auto-execute enabled?

  Based on the analysis, determine whether a hedge should be proposed or automatically executed. If the BTC price has dropped below the threshold, calculate the amount of BTC to hedge into the specified stablecoins.

  Output the decision in JSON format with the following fields:
  - hedgeProposed: true if a hedge is proposed, false otherwise.
  - swapDetails: Details of the swap to execute, including the amount of BTC to swap and the target stablecoins.  This should only be populated if hedgeProposed is true.
  - transactionDetails: Transaction details for the hedge execution. This should only be populated if autoExecute is true AND hedgeProposed is true. Include instructions to build batched transaction: approve -> swap.  Also, include instructions to use a paymaster / relayer pattern (if applicable) for gas. Also include information that the transaction will use the user smart account address {{{userSmartAccountAddress}}}.
  - message: Briefly explain the reasoning behind your decision. For example: "Hedge proposed because the BTC price dropped by X%, which is more than the trigger threshold of Y%." Or: "No hedge proposed because the BTC price has not dropped below the trigger threshold."
  `,
});

const automatedHedgingToolFlow = ai.defineFlow(
  {
    name: 'automatedHedgingToolFlow',
    inputSchema: AutomatedHedgingToolInputSchema,
    outputSchema: AutomatedHedgingToolOutputSchema,
  },
  async input => {
    const {output} = await automatedHedgingToolPrompt(input);
    return output!;
  }
);
