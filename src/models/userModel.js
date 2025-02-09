const db = require("../config/db");

async function getAllUsers() {
  try {
    const [rows] = await db.query("SELECT * FROM users");
    return rows;
  } catch (error) {
    console.error("Database query error:", error);
    throw error;
  }
}

module.exports = { getAllUsers };
