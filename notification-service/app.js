import express from "express";
import dotenv from "dotenv";
import notificationRoutes from "./src/routes/notification.routes.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/notify", notificationRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("Notification Service is running");
});

export default app;
