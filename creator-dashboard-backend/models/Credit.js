const mongoose = require('mongoose');

const creditSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  credits: {
    type: Number,
    default: 0
  },
  lastLogin: {
    type: Date
  },
  completedProfile: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Credit', creditSchema);
