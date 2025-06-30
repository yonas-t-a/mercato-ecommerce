import { Router } from "express";
import { notifyOrder } from "../controllers/notification.controller.js";

const router = Router();

router.post("/order", notifyOrder);

export default router; 