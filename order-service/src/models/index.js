import Order from "./order.model.js";
import OrderItem from "./orderItem.model.js";

Order.hasMany(OrderItem, { foreignKey: "order_id" });
OrderItem.belongsTo(Order, { foreignKey: "order_id" });
 
export { Order, OrderItem }; 