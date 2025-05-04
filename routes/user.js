const express = require('express');
const { authenticate } = require('../middleware/auth');
const User = require('../models/User');
const router = express.Router();

// Get credits
router.get('/credits', authenticate, async (req, res) => {
  const user = await User.findById(req.user.id);
  res.json({ credits: user.credits });
});

// Earn credits
router.post('/earn', authenticate, async (req, res) => {
  const { action } = req.body;
  let creditEarned = 0;

  switch (action) {
    case 'daily_login': creditEarned = 10; break;
    case 'complete_profile': creditEarned = 20; break;
    case 'save_content': creditEarned = 5; break;
    case 'share_content': creditEarned = 2; break;
  }

  await User.findByIdAndUpdate(req.user.id, {
    $inc: { credits: creditEarned },
    $push: { activityLog: `${action} (+${creditEarned} credits)` }
  });

  res.json({ message: 'Credits updated' });
});

module.exports = router;
