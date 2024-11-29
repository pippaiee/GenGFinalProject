//API ROUTES

const express = require ('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User  = require('./models/User');
const router = express.Router();

// Register User
router.post('/register', async (req, res) => {
  try {
  const { username, password } = req.body;
  
  // Checkpoint
  const existingUser = await User.findOne({ username });
  if (existingUser) {
  return res.status(400).json({ message: 'Username already exists' });
  }
  
  // Add User
  const newUser = new User({ username, password });
  await newUser.save();
  res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
  res.status(500).json({ error: err.message });
  }
  });
  module.exports = router;
 

 //Connect to MongoDB
 mongoose.connect('mongodb://localhost:27017/toko_online').then(() => {
     console.log('MongoDB connected successfully');
   }).catch((err) => {
     console.error('Connection error:', err);
   });  

  module.exports = router; // Ensure router is exported correctly