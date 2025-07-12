const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, sparse: true },
  phone: { type: String, unique: true, sparse: true },
  otp: String,
  otpExpires: Date,
  password: String,
  social: { googleId: String, facebookId: String },
  verified: { type: Boolean, default: false },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  // Profile fields
  personal: {
    firstName: String, lastName: String, gender: String, dob: Date, photo: String,
  },
  education: {
    degree: String, college: String, year: Number,
  },
  occupation: {
    jobTitle: String, company: String, income: String,
  },
  lifestyle: {
    diet: String, smoking: String, drinking: String,
  },
  religion: {
    religion: String, caste: String, community: String, horoscope: Object,
  },
  documents: [String], // S3/Cloudinary URLs
  preferences: Object,
  matches: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  shortlisted: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  ignored: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  subscription: { type: mongoose.Schema.Types.ObjectId, ref: 'Subscription' },
  privacy: {
    showPhoto: Boolean, showContact: Boolean, showLocation: Boolean,
  },
  flaggedPhotos: [String],
  isPremium: { type: Boolean, default: false },
  banned: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
