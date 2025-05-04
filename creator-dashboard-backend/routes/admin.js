const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

// Middleware to check admin
function adminOnly(req, res, next) {
  User.findById(req.user).then(user => {
    if (user.role !== 'Admin') {
      return res.status(403).json({ message: 'Access denied' });
    }
    next();
  });
}

// Admin updates user credits
router.post('/update-credits', auth, adminOnly, async (req, res) => {
  try {
    const { userId, credits } = req.body;

    await User.findByIdAndUpdate(userId, { credits });
    res.json({ message: 'User credits updated' });

  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
