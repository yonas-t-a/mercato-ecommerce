import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import { createId } from "@paralleldrive/cuid2";

const Cart = sequelize.define(
  "Cart",
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
  },
  {
    tableName: "carts",
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

export default Cart;
