// Import Dependencies and Initialize Express App
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const PORT = process.env.PORT || 5000;

const app = express();

// Import Routes
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const contactRoutes = require("./routes/contactRoutes");

// Middleware
const corsOptions = {
  origin: ["http://127.0.0.1:5501", "https://divinehomesservices.com"], // Allow local and live frontend
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
};

app.use(cors(corsOptions)); // Enable CORS with options
app.use(express.json()); // Enable req.body JSON data

// rateLimit
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 1, // limit each IP to 1 request per windowMs
  message: {
    message: "Too many contact form submissions, please try again in a minute",
  },
});
app.use("/api/contact", limiter);

app.use("/api/users", userRoutes); // Use user Routes
app.use("/api/auth", authRoutes); // Use auth Routes
app.use("/api", contactRoutes); // Use contact Routes

// Database
const { initializeDatabase, alterDatabase } = require("./config/initDB");

async function setupDatabase() {
  await initializeDatabase(); // Initialize Database
  // await alterDatabase(); // Alter Database
}

setupDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
