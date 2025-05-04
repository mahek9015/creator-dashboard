const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Credit = require('../models/Credit');

// ✅ Daily login endpoint
router.post('/daily-login', auth, async (req, res) => {
  try {
    let creditDoc = await Credit.findOne({ userId: req.user });

    if (!creditDoc) {
      creditDoc = new Credit({ userId: req.user, credits: 10, lastLogin: new Date() });
    } else {
      // Check if already claimed today
      const today = new Date().toDateString();
      const lastLogin = creditDoc.lastLogin?.toDateString();

      if (today !== lastLogin) {
        creditDoc.credits += 10;
        creditDoc.lastLogin = new Date();
      } else {
        return res.json({ message: 'Already claimed today!', credits: creditDoc.credits });
      }
    }

    await creditDoc.save();
    res.json({ message: 'Daily login credits added!', credits: creditDoc.credits });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Complete profile endpoint
router.post('/complete-profile', auth, async (req, res) => {
  try {
    let creditDoc = await Credit.findOne({ userId: req.user });

    if (!creditDoc) {
      creditDoc = new Credit({ userId: req.user });
    }

    if (!creditDoc.completedProfile) {
      creditDoc.credits += 50; // reward for completing profile
      creditDoc.completedProfile = true;
      await creditDoc.save();
      res.json({ message: 'Profile completed! Credits awarded.', credits: creditDoc.credits });
    } else {
      res.json({ message: 'Profile already completed!', credits: creditDoc.credits });
    }

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get current credits
router.get('/balance', auth, async (req, res) => {
  try {
    const creditDoc = await Credit.findOne({ userId: req.user });
    res.json({ credits: creditDoc?.credits || 0 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
