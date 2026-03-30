import { Router } from "express";
import { getSettings, updateSettings } from "../controllers/settings.controller";

const router = Router();

router.get("/data", getSettings);
router.post("/", updateSettings);

export default router;