import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const sendOrderNotification = async ({ email, subject, text, html }) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: process.env.SMTP_PORT || 587,
      secure: true,
      auth: {
        user: process.env.SMTP_USER || "user@example.com",
        pass: process.env.SMTP_PASS || "password",
      },
    });

    const info = await transporter.sendMail({
      from: process.env.MAIL_FROM || 'no-reply@example.com',
      to: email,
      subject,
      text,
      html,
    });
    return { success: true, info };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
