import app from "./app.js";

const PORT = process.env.PORT || 3005;

app.listen(PORT, () => {
  console.log(`Notification service running on port ${PORT}`);
});
