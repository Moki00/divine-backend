require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: process.env.SMTP_PORT || 587,
  secure: false, // Use `true` for port 465, `false` for 587
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

async function sendEmail(to, subject, text) {
  try {
    const mailOptions = {
      from: `"Divine Backend" <${process.env.SMTP_USER}>`,
      to,
      subject,
      text,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent: ", info.messageId);
    return { success: true, message: "Email sent successfully!" };
  } catch (error) {
    console.error("❌ Email sending error: ", error);
    return { success: false, message: "Failed to send email." };
  }
}

module.exports = { sendEmail };
