const db = require("./db");

async function initializeDatabase() {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

  try {
    await db.execute(createTableQuery);
    console.log("✅ Users table is ready!");
  } catch (error) {
    console.error("❌ Error creating users table:", error.message);
  }
}

module.exports = initializeDatabase;
