import { Router } from "express";
import { getWorkOrders } from "../controllers/workOrder.controller";

const router = Router();

router.get("/", getWorkOrders);

export default router;