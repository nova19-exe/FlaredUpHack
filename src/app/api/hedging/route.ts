import { runHedgeAnalysis } from "@/app/actions";

export async function GET() {
  const result = await automatedHedgingTool();
  return Response.json(result);
}
