import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import { createId } from "@paralleldrive/cuid2";

const Order = sequelize.define(
  "Order",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      defaultValue: () => createId(),
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("pending", "paid", "shipped", "delivered"),
      defaultValue: "pending",
    },
    total_amount: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    payment_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "orders",
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

export default Order;
