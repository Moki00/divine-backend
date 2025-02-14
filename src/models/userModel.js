const db = require("../config/db");
const bcrypt = require("bcrypt");

// Create a new user
async function createUser(name, email) {
  const query = "INSERT INTO users (name, email) VALUES (?, ?)";
  const [result] = await db.execute(query, [name, email]);
  return result.insertId;
}

// Get all users
async function getAllUsers() {
  try {
    const [rows] = await db.query("SELECT * FROM users");
    return rows;
  } catch (error) {
    console.error("getAllUsers query error:", error);
    throw error;
  }
}

// Get a single user by ID
async function getUserById(id) {
  const query = "SELECT * FROM users WHERE id = ?";
  const [rows] = await db.execute(query, [id]);
  return rows[0];
}

// Update a user
async function updateUser(id, name, email) {
  const query = "UPDATE users SET name = ?, email = ? WHERE id = ?";
  const [result] = await db.execute(query, [name, email, id]);
  return result.affectedRows > 0;
}

// Delete a user
async function deleteUser(id) {
  const query = "DELETE FROM users WHERE id = ?";
  const [result] = await db.execute(query, [id]);
  return result.affectedRows > 0;
}

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
