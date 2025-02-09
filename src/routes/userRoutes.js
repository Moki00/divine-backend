const express = require('express');
const { getAllUsers } = require('../models/userModel');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
});

module.exports = router;
