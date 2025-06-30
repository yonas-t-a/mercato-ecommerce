import {
  createOrderService,
  getOrdersByUserService,
  updateOrderService,
  deleteOrderService,
} from "../services/order.service.js";

export const createOrder = async (req, res) => {
  try {
    const { user_id, items, total_amount, payment_id } = req.body;
    if (!user_id || !items || !total_amount || !payment_id) {
      return res.status(400).json({ error: "user_id, items, total_amount, and payment_id are required" });
    }
    const result = await createOrderService(user_id, items, total_amount, payment_id);
    // TODO: Emit ORDER_PLACED event to Notification Service here
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await getOrdersByUserService(userId);
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const updated = await updateOrderService(orderId, req.body);
    if (!updated) return res.status(404).json({ error: "Order not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const deleted = await deleteOrderService(orderId);
    if (!deleted) return res.status(404).json({ error: "Order not found" });
    res.json({ message: "Order and its items deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
