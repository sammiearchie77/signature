// authRoutes.js
const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const firebaseAuthMiddleware = require('../config/firebaseAuthMiddleware');

// User Registration
router.post('/sign-up', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await admin.auth().createUser({
      email,
      password,
    });
    res.json({ message: 'Registration successful', user });
    // res.redirect('/user/edit-profile/');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// User Login
router.post('/sign-in', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await admin.auth().getUserByEmail(email);
    // Handle user login here, e.g., compare passwords
    res.json({ message: 'Login successful', user });
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized' });
  }
});

// Protected Route (Requires Authentication)
router.get('/protected', firebaseAuthMiddleware, (req, res) => {
  res.json({ message: 'Protected route accessed successfully', user: req.user });
});

module.exports = router;
