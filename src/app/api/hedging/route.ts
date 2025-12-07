import { runHedgeAnalysis } from "@/app/actions";

export async function GET() {
const result = await runHedgeAnalysis();
  return Response.json(result);
}
