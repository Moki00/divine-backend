const mongoose = require("mongoose");

// Define the schema for the contact
const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

// Create the model for the contact
const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
