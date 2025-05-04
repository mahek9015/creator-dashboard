const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

// Complete profile & earn credits
router.post('/complete', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user);

    if (user.profileCompleted) {
      return res.status(400).json({ message: 'Profile already completed' });
    }

    user.profileCompleted = true;
    user.credits += 50;  // 🎯 Reward 50 credits
    await user.save();

    res.json({ message: 'Profile completed! 50 credits added' });

  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
