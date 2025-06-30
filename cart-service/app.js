import express from "express";
import dotenv from "dotenv";
import sequelize from "./src/config/db.js";
import "./src/models/index.js";
import cartRoutes from "./src/routes/cart.routes.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/cart", cartRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("Cart Service is running");
});

// Sync DB
sequelize.sync();

export default app;
