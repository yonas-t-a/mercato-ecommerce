import Product from "./product.model.js";
import Review from "./review.model.js";

Review.belongsTo(Product, { foreignKey: "product_id" });
Product.hasMany(Review, { foreignKey: "product_id" });

export { Product, Review }; 