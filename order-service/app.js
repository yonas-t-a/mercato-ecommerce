import express from "express";
import dotenv from "dotenv";
import sequelize from "./src/config/db.js";
import "./src/models/index.js";
import orderRoutes from "./src/routes/order.routes.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/orders", orderRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("Order Service is running");
});

// Sync DB
sequelize.sync();

export default app;
