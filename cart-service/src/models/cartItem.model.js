import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import { createId } from "@paralleldrive/cuid2";

const CartItem = sequelize.define(
  "CartItem",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      defaultValue: () => createId(),
    },
    cart_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    product_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
  },
  {
    tableName: "cart_items",
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

export default CartItem;
