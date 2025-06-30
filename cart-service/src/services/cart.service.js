import { Cart, CartItem } from "../models/index.js";
import { createId } from "@paralleldrive/cuid2";

export const getCartService = async (user_id) => {
  let cart = await Cart.findOne({ where: { user_id }, include: CartItem });
  if (!cart) {
    cart = await Cart.create({ user_id });
  }
  return cart;
};

export const addToCartService = async (user_id, product_id, quantity = 1) => {
  let cart = await Cart.findOne({ where: { user_id } });
  if (!cart) {
    cart = await Cart.create({ user_id });
  }
  let item = await CartItem.findOne({ where: { cart_id: cart.id, product_id } });
  if (item) {
    item.quantity += quantity;
    await item.save();
  } else {
    item = await CartItem.create({ cart_id: cart.id, product_id, quantity });
  }
  return item;
};

export const removeFromCartService = async (user_id, product_id) => {
  const cart = await Cart.findOne({ where: { user_id } });
  if (!cart) return null;
  const item = await CartItem.findOne({ where: { cart_id: cart.id, product_id } });
  if (!item) return null;
  await item.destroy();
  return true;
};

export const updateCartItemService = async (user_id, product_id, quantity) => {
  const cart = await Cart.findOne({ where: { user_id } });
  if (!cart) return null;
  const item = await CartItem.findOne({ where: { cart_id: cart.id, product_id } });
  if (!item) return null;
  item.quantity = quantity;
  await item.save();
  return item;
};
