import { Router } from "express";
import {
  getCart,
  addToCart,
  removeFromCart,
  updateCartItem,
} from "../controllers/cart.controller.js";

const router = Router();

router.get("/", getCart);
router.post("/add", addToCart);
router.delete("/remove/:productId", removeFromCart);
router.put("/update", updateCartItem);

export default router;
