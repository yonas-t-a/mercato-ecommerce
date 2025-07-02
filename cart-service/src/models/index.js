import Cart from "./cart.model.js";
import CartItem from "./cartItem.model.js";

Cart.hasMany(CartItem, { foreignKey: "cart_id" });
CartItem.belongsTo(Cart, { foreignKey: "cart_id" });
 
export { Cart, CartItem }; 