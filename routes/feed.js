const express = require('express');
const { authenticate } = require('../middleware/auth');
const axios = require('axios');
const User = require('../models/User');
const router = express.Router();

// Get feed
router.get('/', authenticate, async (req, res) => {
  // Reddit example feed
  const reddit = await axios.get('https://www.reddit.com/r/popular.json');
  const redditPosts = reddit.data.data.children.map(post => ({
    title: post.data.title,
    url: post.data.url
  }));

  // Fake Twitter feed (simulate)
  const twitterPosts = [
    { title: "Twitter Post 1", url: "https://twitter.com/post1" },
    { title: "Twitter Post 2", url: "https://twitter.com/post2" }
  ];

  res.json([...redditPosts.slice(0, 5), ...twitterPosts]);
});

// Save feed
router.post('/save', authenticate, async (req, res) => {
  const { post } = req.body;
  await User.findByIdAndUpdate(req.user.id, { $push: { savedFeeds: post } });
  res.json({ message: 'Post saved' });
});

// Share feed (simulate)
router.post('/share', authenticate, async (req, res) => {
  res.json({ message: 'Link copied (simulated)' });
});

// Report post (simulate)
router.post('/report', authenticate, async (req, res) => {
  res.json({ message: 'Reported (simulated)' });
});

module.exports = router;
