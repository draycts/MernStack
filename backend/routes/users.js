const express = require('express');
const User = require('../models/user');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Get user profile
router.get('/profile', authMiddleware, async (req, res) => {
    try {
      const user = await User.findById(req.userData.userId).select('-password');
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching user profile', error: error.message });
    }
  });
  
  // Update user profile
  router.put('/profile', authMiddleware, async (req, res) => {
    try {
      const { username, email } = req.body;
      const user = await User.findByIdAndUpdate(
        req.userData.userId,
        { username, email },
        { new: true, runValidators: true }
      ).select('-password');
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: 'Error updating user profile', error: error.message });
    }
  });
  
  // Delete user account
  router.delete('/account', authMiddleware, async (req, res) => {
    try {
      await User.findByIdAndDelete(req.userData.userId);
      res.json({ message: 'User account deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting user account', error: error.message });
    }
  });
  
  module.exports = router;