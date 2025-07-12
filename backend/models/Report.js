const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  reportedUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  reason: String,
  contentType: { type: String, enum: ['profile', 'message', 'photo'] },
  contentId: mongoose.Schema.Types.ObjectId,
  reviewed: { type: Boolean, default: false },
  actionTaken: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Report', reportSchema);
