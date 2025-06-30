import { sendOrderNotification } from "../services/email.service.js";

export const notifyOrder = async (req, res) => {
  try {
    const { email, subject, text, html } = req.body;
    if (!email || !subject || (!text && !html)) {
      return res.status(400).json({ error: "email, subject, and text or html are required" });
    }
    const result = await sendOrderNotification({ email, subject, text, html });
    res.status(result.success ? 200 : 500).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 