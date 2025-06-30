import {
  getCartService,
  addToCartService,
  removeFromCartService,
  updateCartItemService,
} from "../services/cart.service.js";

export const getCart = async (req, res) => {
  try {
    const { user_id } = req.query;
    if (!user_id) return res.status(400).json({ error: "user_id is required" });
    const cart = await getCartService(user_id);
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addToCart = async (req, res) => {
  try {
    const { user_id, product_id, quantity } = req.body;
    if (!user_id || !product_id) return res.status(400).json({ error: "user_id and product_id are required" });
    const item = await addToCartService(user_id, product_id, quantity);
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const { user_id } = req.body;
    const { productId } = req.params;
    if (!user_id) return res.status(400).json({ error: "user_id is required" });
    const deleted = await removeFromCartService(user_id, productId);
    if (!deleted) return res.status(404).json({ error: "Cart item not found" });
    res.json({ message: "Item removed from cart" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateCartItem = async (req, res) => {
  try {
    const { user_id, product_id, quantity } = req.body;
    if (!user_id || !product_id || typeof quantity !== "number") return res.status(400).json({ error: "user_id, product_id, and quantity are required" });
    const item = await updateCartItemService(user_id, product_id, quantity);
    if (!item) return res.status(404).json({ error: "Cart item not found" });
    res.json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
