const { sendEmail } = require("../config/emailService");

async function contactFormHandler(req, res) {
  const { from_name, phone_number, email, message } = req.body;

  if (!from_name || !phone_number || !email || !message) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const subject = "New Contact Form Submission";
    const text = `
      Name: ${from_name}
      Phone: ${phone_number}
      Email: ${email}
      Message: ${message}
    `;

    const response = await sendEmail(process.env.CONTACT_EMAIL, subject, text);

    if (response.success) {
      res.status(200).json({ message: "Your message has been sent!" });
    } else {
      res.status(500).json({ message: "Email sending failed." });
    }
  } catch (error) {
    console.error("❌ Contact form error:", error);
    res.status(500).json({ message: "Server error." });
  }
}

module.exports = { contactFormHandler };
