// const express = require('express');
// const router = express.Router();
// const auth = require('../middleware/auth');
// const Post = require('../models/Post');

// // GET /api/posts
// router.get('/', auth, async (req, res) => {
//   try {
//     const posts = await Post.find().sort({ date: -1 });
//     res.json(posts);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Server error');
//   }
// });

// module.exports = router;

// const express = require('express');
// // const router = express.Router();
// const Post = require('../models/Post');

// // Add Dummy Posts
// router.post('/addDummy', async (req, res) => {
//   try {
//     const dummyPosts = [
//       { title: 'Post 1', description: 'This is post 1', type: 'public', createdAt: new Date() },
//       { title: 'Post 2', description: 'This is post 2', type: 'public', createdAt: new Date() },
//       { title: 'Post 3', description: 'This is post 3', type: 'public', createdAt: new Date() },
//     ];

//     await Post.insertMany(dummyPosts);
//     res.json({ message: 'Dummy posts added!' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Server error');
//   }
// });

// module.exports = router;


const router = require('express').Router();
const Post = require('../models/Post');
const verifyToken = require('../middleware/auth');

// GET all posts
router.get('/', verifyToken, async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Failed to load posts' });
  }
});

module.exports = router;
