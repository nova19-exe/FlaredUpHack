"use server";
import { automatedHedgingTool, AutomatedHedgingToolOutput } from "@/ai/flows/automated-hedging-tool";
import { hedgingToolSchema, type HedgingToolSchema } from "@/lib/schemas";

export async function runHedgeAnalysis(
    data: HedgingToolSchema
): Promise<{ success: boolean; message: string; result?: AutomatedHedgingToolOutput }> {
    const validatedFields = hedgingToolSchema.safeParse(data);

    if (!validatedFields.success) {
        return {
            success: false,
            message: "Invalid data provided.",
        };
    }

    try {
        const result = await automatedHedgingTool(validatedFields.data);
        return {
            success: true,
            message: "Analysis complete.",
            result,
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: "An error occurred during analysis.",
        };
    }
}
