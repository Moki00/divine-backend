const { body, validationResult } = require("express-validator"); // Form validation
const multer = require("multer"); // File upload middleware
const path = require("path"); // directory path utility
const { sendEmail } = require("../config/emailService"); // Email service

// multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Store files in the "uploads" folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Unique filename
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1 * 1024 * 1024 }, // 1MB limit
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png|pdf|docx|txt/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype =
      filetypes.test(file.mimetype) || file.mimetype === "text/plain";

    console.log("extname:", extname, "mimetype:", mimetype);
    console.log("file.mimetype:", file.mimetype);
    console.log("file.originalname:", file.originalname);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      return cb(
        new Error(
          "Invalid file type. Only JPG, PNG, PDF, TXT and DOCX are allowed."
        )
      );
    }
  },
});

// Validation rules for the form
const validateContactForm = [
  body("from_name")
    .trim()
    .isLength({ min: 2 })
    .withMessage("Name must be at least 2 characters."),
  body("phone_number")
    .matches(/^\d{10}$/)
    .withMessage("Phone number must be 10 numbers."),
  body("email").isEmail().withMessage("Invalid email address."),
  body("message")
    .trim()
    .isLength({ min: 5 })
    .withMessage("Message must be at least 5 characters."),
];

// Handle form submission
async function contactFormHandler(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg });
  }

  const { from_name, phone_number, email, message } = req.body;
  const file = req.file ? req.file.filename : null;

  try {
    const subject = "New Contact Form Submission";
    let text = `Name: ${from_name}\nPhone: ${phone_number}\nEmail: ${email}\nMessage: ${message}`;

    if (file) {
      text += `\n\nAttached file: ${file}`;
    }

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

module.exports = { validateContactForm, upload, contactFormHandler };
