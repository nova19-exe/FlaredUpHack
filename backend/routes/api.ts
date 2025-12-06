import { Router } from "express";
import { hedgeBTC, getStatus } from "../controllers/hedgeController";

const router = Router();

router.post("/hedge", hedgeBTC);   // Trigger hedge manually
router.get("/status", getStatus);  // Check current positions

export default router;