// controllers/usersController.js
const User = require('../models/user.model');

// Controller for retrieving user profile
async function getUserProfile(req, res) {
  try {
    const user = await User.findById(req.user._id); // Assuming you have a user ID in the authentication payload
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Add more controllers for user registration, login, and other user-related actions as needed

module.exports = {
  getUserProfile,
  // Add other user-related controllers here
};
