import { Order, OrderItem } from "../models/index.js";
import { createId } from "@paralleldrive/cuid2";

export const createOrderService = async (user_id, items, total_amount, payment_id) => {
  const order = await Order.create({ user_id, total_amount, payment_id });
  const orderItems = await Promise.all(
    items.map(item =>
      OrderItem.create({
        order_id: order.id,
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.price,
      })
    )
  );
  return { order, orderItems };
};

export const getOrdersByUserService = async (user_id) => {
  return await Order.findAll({ where: { user_id }, include: OrderItem });
};

export const updateOrderService = async (orderId, data) => {
  const order = await Order.findByPk(orderId);
  if (!order) return null;
  await order.update(data);
  return order;
};

export const deleteOrderService = async (orderId) => {
  const order = await Order.findByPk(orderId);
  if (!order) return null;
  await OrderItem.destroy({ where: { order_id: orderId } });
  await order.destroy();
  return true;
};
