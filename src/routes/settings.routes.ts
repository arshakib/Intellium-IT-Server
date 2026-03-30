import { Router } from "express";
import { getSettings, updateSettings } from "../controllers/settings.controller.js";

const router = Router();

router.get("/data", getSettings);
router.post("/", updateSettings);

export default router;