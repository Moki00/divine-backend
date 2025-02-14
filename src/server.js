require("dotenv").config(); // Import dotenv
const express = require("express"); // Import Express
const cors = require("cors"); // Import CORS

const db = require("./config/db.js"); // Connect to Database
const userRoutes = require("./routes/userRoutes"); // Import user routes
const initializeDatabase = require("./config/initDB"); // Import initializeDatabase

const app = express(); // Initialize Express
const PORT = process.env.PORT || 5000; // Set Port

app.use(cors()); // Enable CORS
app.use(express.json()); // Enable req.body JSON data

app.use("/api/users", userRoutes); // Use user routes

initializeDatabase(); // Initialize Database

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
