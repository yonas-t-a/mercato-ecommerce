import {
  getAllProductsService,
  createProductService,
  getProductByIdService,
  addReviewToProductService,
  updateProductService,
  deleteProductService,
  deleteReviewService
} from "../services/product.service.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await getAllProductsService();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const product = await createProductService(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await getProductByIdService(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addReviewToProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id, rating, review } = req.body;
    const newReview = await addReviewToProductService(id, user_id, rating, review);
    if (!newReview) return res.status(404).json({ error: "Product not found" });
    res.status(201).json(newReview);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
export const updateProduct = async (req, res) => {
    try {
      const updated = await updateProductService(req.params.id, req.body);
      if (!updated) return res.status(404).json({ error: "Product not found" });
      res.json(updated);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
  
export const deleteProduct = async (req, res) => {
  try {
    const deleted = await deleteProductService(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Product not found" });
    res.json({ message: "Product and its reviews deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
  
export const deleteReview = async (req, res) => {
  try {
    const deleted = await deleteReviewService(req.params.reviewId);
    if (!deleted) return res.status(404).json({ error: "Review not found" });
    res.json({ message: "Review deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};