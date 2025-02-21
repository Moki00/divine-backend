require("dotenv").config(); // Import dotenv
const express = require("express"); // Import Express
const cors = require("cors"); // Import CORS

const userRoutes = require("./routes/userRoutes"); // Import user routes
const authRoutes = require("./routes/authRoutes"); // Import auth routes
const { initializeDatabase, alterDatabase } = require("./config/initDB"); // Import initializeDatabase and alterDatabase

const app = express(); // Initialize Express
const PORT = process.env.PORT || 5000; // Set Port

const corsOptions = {
  origin: "https://divinehomesservices.com/", // frontend URL
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
};

app.use(cors(corsOptions)); // Enable CORS with options
app.use(express.json()); // Enable req.body JSON data

app.use("/api/users", userRoutes); // Use user routes
app.use("/api/auth", authRoutes); // Use auth routes

async function setupDatabase() {
  await initializeDatabase(); // Initialize Database
  // await alterDatabase(); // Alter Database
}

setupDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
