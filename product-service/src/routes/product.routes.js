import { Router } from "express";
import {
  getAllProducts,
  createProduct,
  getProductById,
  addReviewToProduct,
  updateProduct,
  deleteProduct,
  deleteReview,
} from "../controllers/product.controller.js";

const router = Router();

router.get("/", getAllProducts);
router.post("/", createProduct);
router.get("/:id", getProductById);
router.post("/:id/review", addReviewToProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);
router.delete("/review/:reviewId", deleteReview);

export default router;
