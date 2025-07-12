const mongoose = require('mongoose');

const cmsPageSchema = new mongoose.Schema({
  slug: { type: String, unique: true },
  title: String,
  contentHtml: String,
  lastUpdatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('CMSPage', cmsPageSchema);
