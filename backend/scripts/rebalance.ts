import cron from "node-cron";
import { Request, Response } from "express";
import { hedgeBTC } from "../controllers/hedgeController";

cron.schedule("*/5 * * * *", async () => {
  console.log("Running auto-hedge check...");

  // Create minimal mock Request/Response for calling controller handler from a script.
  const fakeReq = {} as Request;

  const fakeRes: Partial<Response> = {
    status(code: number) {
      console.log("Response status:", code);
      return this as unknown as Response;
    },
    json(payload: any) {
      console.log("Response json:", payload);
      return this as unknown as Response;
    },
  };

  try {
    await hedgeBTC(fakeReq, fakeRes as Response);
  } catch (err) {
    console.error("Auto-hedge failed:", err);
  }
});