const express = require("express");
const router = express.Router();
const { contactFormHandler } = require("../controllers/contactController");

router.post("/contact", contactFormHandler);

module.exports = router;
