const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const axios = require('axios');
const Post = require('../models/Post');

// Get Feed
router.get('/', auth, async (req, res) => {
  try {
    const redditRes = await axios.get('https://www.reddit.com/r/popular.json?limit=5');
    const redditPosts = redditRes.data.data.children.map(post => ({
      id: post.data.id,
      source: 'Reddit',
      title: post.data.title,
      url: post.data.url
    }));

    const twitterPosts = [
      { id: 't1', source: 'Twitter', title: 'Breaking: New Tech Launch!', url: 'https://twitter.com' },
      { id: 't2', source: 'Twitter', title: 'Dev Tips for 2025 🚀', url: 'https://twitter.com' }
    ];

    const feed = [...redditPosts, ...twitterPosts];
    res.json({ feed });

  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching feed');
  }
});

// Save Post
router.post('/save', auth, async (req, res) => {
  const { postId, source, title, url } = req.body;
  try {
    const newPost = new Post({
      user: req.user,
      postId,
      source,
      title,
      url,
      action: 'saved'
    });
    await newPost.save();
    res.json({ message: 'Post saved!' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error saving post');
  }
});

// Report Post
router.post('/report', auth, async (req, res) => {
  const { postId, source, title, url } = req.body;
  try {
    const newPost = new Post({
      user: req.user,
      postId,
      source,
      title,
      url,
      action: 'reported'
    });
    await newPost.save();
    res.json({ message: 'Post reported!' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error reporting post');
  }
});

// Share Post (simulate)
router.post('/share', auth, (req, res) => {
  const { postId, source } = req.body;
  // Simulate share
  res.json({ message: `Post ${postId} from ${source} shared! (simulated)` });
});

module.exports = router;
