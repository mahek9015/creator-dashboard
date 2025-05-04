const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  role: { type: String, enum: ['User', 'Admin'], default: 'User' }, // 🔥 Role-based access
  credits: { type: Number, default: 0 }, // 🔥 Credit system
  profileCompleted: { type: Boolean, default: false }, // 🔥 Track profile completion
  savedPosts: [{ type: Object }], // 🔥 For saving feed posts

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
