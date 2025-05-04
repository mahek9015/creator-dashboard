const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  passwordHash: String,
  role: { type: String, default: 'User' },
  credits: { type: Number, default: 0 },
  savedFeeds: [Object],
  activityLog: [String]
});

module.exports = mongoose.model('User', userSchema);
