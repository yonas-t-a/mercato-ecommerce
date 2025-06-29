import express from "express";
import dotenv from "dotenv";
import sequelize from "./src/config/db.js";
import "./src/models/index.js";
import productRoutes from "./src/routes/product.routes.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/products", productRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("Product Service is running");
});

// Sync DB
sequelize.sync();

export default app;
