import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import { createId } from "@paralleldrive/cuid2";

const Product = sequelize.define(
  "Product",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      defaultValue: () => createId(),
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    stock_quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "products",
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',

  }
);

export default Product;
