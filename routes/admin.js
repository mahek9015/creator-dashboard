const express = require('express');
const { authenticate, checkRole } = require('../middleware/auth');
const User = require('../models/User');
const router = express.Router();

// View users
router.get('/users', authenticate, checkRole('Admin'), async (req, res) => {
  const users = await User.find().select('-passwordHash');
  res.json(users);
});

// Update credits
router.patch('/update-credits/:userId', authenticate, checkRole('Admin'), async (req, res) => {
  const { credits } = req.body;
  await User.findByIdAndUpdate(req.params.userId, { credits });
  res.json({ message: 'Credits updated' });
});

module.exports = router;
