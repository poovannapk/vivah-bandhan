const Message = require('../models/Message');

exports.sendMessage = async (req, res) => {
  const { to, content } = req.body;
  const from = req.user.id;
  if (!to || !content) return res.status(400).json({ error: 'Recipient and content required' });
  const message = await Message.create({ from, to, content });
  res.json(message);
};

exports.getMessages = async (req, res) => {
  const userId = req.user.id;
  const otherUserId = req.params.userId;
  const messages = await Message.find({
    $or: [
      { from: userId, to: otherUserId },
      { from: otherUserId, to: userId }
    ]
  }).sort('createdAt');
  res.json(messages);
};

exports.markAsSeen = async (req, res) => {
  const { messageId } = req.params;
  await Message.findByIdAndUpdate(messageId, { seen: true });
  res.json({ success: true });
};
