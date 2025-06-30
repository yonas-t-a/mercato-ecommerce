import { Router } from "express";
import {
  createOrder,
  getOrdersByUser,
  updateOrder,
  deleteOrder,
} from "../controllers/order.controller.js";

const router = Router();

router.post("/", createOrder);
router.get("/:userId", getOrdersByUser);
router.put("/:orderId", updateOrder); // optional
router.delete("/:orderId", deleteOrder); // optional

export default router;
