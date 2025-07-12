const User = require('../models/User');

exports.getProfile = async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
};

exports.updateProfile = async (req, res) => {
  const updates = req.body;
  const user = await User.findByIdAndUpdate(req.user.id, updates, { new: true });
  res.json(user);
};

exports.uploadPhoto = async (req, res) => {
  // Assume file upload middleware sets req.fileUrl
  const user = await User.findByIdAndUpdate(req.user.id, { 'personal.photo': req.fileUrl }, { new: true });
  res.json(user);
};
