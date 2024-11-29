//USER LOGIN ROUTE

const express = require ('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User  = require('./models/User');
const router = express.Router();

//LOAD .ENV
require('dotenv').config();


//LOGIN
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        //User check
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found'});
        }
            //password verification
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid credentials'});
            }

            //JWT TOKEN
            const token = jwt.sign(
                { id: user._id, username: user.username}, process.env.JWT_SECRET,
                { expiresIn: process.env.JWT_EXPIRES_IN }
            );
            res.status(200).json({ message: 'Login successful', token});
        } catch (err) {
            res.status(500).json({ error: err.message});
        }
    });
    module.exports = router; // Ensure router is exported correctly