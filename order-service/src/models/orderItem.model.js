import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import { createId } from "@paralleldrive/cuid2";

const OrderItem = sequelize.define(
  "OrderItem",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      defaultValue: () => createId(),
    },
    order_id: {
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
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
  },
  {
    tableName: "order_items",
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

export default OrderItem;
