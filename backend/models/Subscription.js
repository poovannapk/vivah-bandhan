const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  plan: { type: String, enum: ['Free', 'Gold', 'Premium'], default: 'Free' },
  startDate: { type: Date, default: Date.now },
  endDate: Date,
  paymentId: String,
  status: { type: String, enum: ['active', 'expired', 'cancelled'], default: 'active' }
});

module.exports = mongoose.model('Subscription', subscriptionSchema);
