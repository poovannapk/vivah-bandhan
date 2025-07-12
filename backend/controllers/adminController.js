const User = require('../models/User');
const Message = require('../models/Message');

exports.dashboard = async (req, res) => {
  const totalUsers = await User.countDocuments();
  // Add more stats as needed
  res.json({ totalUsers });
};

exports.getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

exports.banUser = async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, { banned: true });
  res.json({ success: true });
};

exports.verifyUser = async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, { verified: true });
  res.json({ success: true });
};

exports.deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ success: true });
};

exports.analytics = async (req, res) => {
  const totalUsers = await User.countDocuments();
  const activeToday = await User.countDocuments({ lastLogin: { $gte: new Date(Date.now() - 24*60*60*1000) } });
  // Add more: revenue, churn, etc. as needed
  res.json({ totalUsers, activeToday });
};

exports.getFlaggedMessages = async (req, res) => {
  const messages = await Message.find({ flagged: true });
  res.json(messages);
};

exports.flagMessage = async (req, res) => {
  await Message.findByIdAndUpdate(req.params.id, { flagged: true });
  res.json({ success: true });
};

exports.getFlaggedPhotos = async (req, res) => {
  const users = await User.find({ flaggedPhotos: { $exists: true, $not: { $size: 0 } } }, { personal: 1, flaggedPhotos: 1 });
  res.json(users);
};

exports.flagPhoto = async (req, res) => {
  const { userId } = req.params;
  const { photoUrl } = req.body;
  await User.findByIdAndUpdate(userId, { $addToSet: { flaggedPhotos: photoUrl } });
  res.json({ success: true });
};
