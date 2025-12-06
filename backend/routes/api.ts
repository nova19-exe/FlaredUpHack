import { Router } from "express";
import { hedgeBTC, getStatus } from "../controllers/hedgeController";
import {
  depositCollateral,
  withdrawCollateral,
  lockCollateral,
  unlockCollateral,
  executeSettlement,
  executeHedgeSettlement,
  getCollateral,
  getSettlements,
  getSettlement,
} from "../controllers/smartAccountController";

const router = Router();

// Hedging routes
router.post("/hedge", hedgeBTC);   // Trigger hedge manually
router.get("/status", getStatus);  // Check current positions

// SmartAccount routes
router.post("/smart-account/collateral/deposit", depositCollateral);
router.post("/smart-account/collateral/withdraw", withdrawCollateral);
router.post("/smart-account/collateral/lock", lockCollateral);
router.post("/smart-account/collateral/unlock", unlockCollateral);
router.get("/smart-account/collateral", getCollateral);

router.post("/smart-account/settlement/execute", executeSettlement);
router.post("/smart-account/settlement/hedge", executeHedgeSettlement);
router.get("/smart-account/settlements", getSettlements);
router.get("/smart-account/settlement", getSettlement);

export default router;