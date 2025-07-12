const Subscription = require('../models/Subscription');

exports.getSubscription = async (req, res) => {
  const subscription = await Subscription.findOne({ user: req.user.id });
  res.json(subscription);
};

exports.createOrUpdateSubscription = async (req, res) => {
  const { plan, endDate, paymentId } = req.body;
  let subscription = await Subscription.findOne({ user: req.user.id });
  if (subscription) {
    subscription.plan = plan;
    subscription.endDate = endDate;
    subscription.paymentId = paymentId;
    subscription.status = 'active';
    await subscription.save();
  } else {
    subscription = await Subscription.create({ user: req.user.id, plan, endDate, paymentId });
  }
  res.json(subscription);
};
