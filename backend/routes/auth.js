const crypto = require('crypto');
const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'dev-jwt-secret-change-me';
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

const hasGoogleConfig = process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET && process.env.GOOGLE_CLIENT_ID !== 'your-google-client-id';
const hasFacebookConfig = process.env.FB_CLIENT_ID && process.env.FB_CLIENT_SECRET && process.env.FB_CLIENT_ID !== 'your-facebook-app-id';
const adminEmails = (process.env.ADMIN_EMAILS || '')
  .split(',')
  .map(email => email.trim().toLowerCase())
  .filter(Boolean);
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || '';

const isAdminEmail = (email = '') => adminEmails.includes(email.toLowerCase());

const safeCompare = (value = '', expected = '') => {
  const valueBuffer = Buffer.from(value);
  const expectedBuffer = Buffer.from(expected);

  if (valueBuffer.length !== expectedBuffer.length) return false;
  return crypto.timingSafeEqual(valueBuffer, expectedBuffer);
};

const hashPassword = (password, salt = crypto.randomBytes(16).toString('hex')) => {
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${hash}`;
};

const verifyPassword = (password, storedPassword = '') => {
  const [salt, hash] = storedPassword.split(':');
  if (!salt || !hash) return false;
  const candidate = crypto.scryptSync(password, salt, 64);
  return crypto.timingSafeEqual(Buffer.from(hash, 'hex'), candidate);
};

const signToken = (user) => jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });

const toClientUser = (user) => ({
  id: user._id.toString(),
  email: user.email || '',
  firstName: user.personal?.firstName || '',
  lastName: user.personal?.lastName || '',
  dateOfBirth: user.personal?.dob ? user.personal.dob.toISOString().slice(0, 10) : '',
  gender: user.personal?.gender || 'male',
  phone: user.phone || '',
  isVerified: Boolean(user.verified),
  profileComplete: Boolean(user.personal?.firstName && user.personal?.lastName && user.personal?.gender),
  subscription: user.isPremium ? 'premium' : 'free',
  profilePicture: user.personal?.photo,
  isActive: !user.banned,
  lastSeen: new Date().toISOString(),
  joinedDate: user.createdAt ? user.createdAt.toISOString() : new Date().toISOString(),
  verificationStatus: user.verified ? 'verified' : 'pending',
  role: user.role || 'user',
});

const createAuthResponse = (user) => ({
  token: signToken(user),
  user: toClientUser(user),
});

const findOrCreateSocialUser = async ({ provider, providerId, email, firstName, lastName, photo }) => {
  const socialKey = `social.${provider}Id`;
  let user = await User.findOne({ [socialKey]: providerId });
  if (!user && email) user = await User.findOne({ email });

  if (!user) {
    user = new User({
      email,
      social: { [`${provider}Id`]: providerId },
      verified: true,
      role: isAdminEmail(email) ? 'admin' : 'user',
      personal: { firstName, lastName, photo },
    });
  } else {
    user.social = { ...(user.social || {}), [`${provider}Id`]: providerId };
    user.verified = true;
    if (isAdminEmail(user.email)) user.role = 'admin';
    user.personal = {
      ...(user.personal || {}),
      firstName: user.personal?.firstName || firstName,
      lastName: user.personal?.lastName || lastName,
      photo: user.personal?.photo || photo,
    };
  }

  await user.save();
  return user;
};

if (hasGoogleConfig) {
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL || '/api/auth/google/callback',
  }, async (_accessToken, _refreshToken, profile, done) => {
    try {
      const email = profile.emails?.[0]?.value;
      const user = await findOrCreateSocialUser({
        provider: 'google',
        providerId: profile.id,
        email,
        firstName: profile.name?.givenName || '',
        lastName: profile.name?.familyName || '',
        photo: profile.photos?.[0]?.value,
      });
      done(null, user);
    } catch (error) {
      done(error);
    }
  }));
}

if (hasFacebookConfig) {
  passport.use(new FacebookStrategy({
    clientID: process.env.FB_CLIENT_ID,
    clientSecret: process.env.FB_CLIENT_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK_URL || '/api/auth/facebook/callback',
    profileFields: ['id', 'emails', 'name', 'photos'],
  }, async (_accessToken, _refreshToken, profile, done) => {
    try {
      const user = await findOrCreateSocialUser({
        provider: 'facebook',
        providerId: profile.id,
        email: profile.emails?.[0]?.value,
        firstName: profile.name?.givenName || '',
        lastName: profile.name?.familyName || '',
        photo: profile.photos?.[0]?.value,
      });
      done(null, user);
    } catch (error) {
      done(error);
    }
  }));
}

router.post('/register', async (req, res) => {
  try {
    const { email, password, firstName, lastName, phone, gender, dateOfBirth } = req.body;
    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({ error: 'Email, password, first name, and last name are required' });
    }
    if (password.length < 8) {
      return res.status(400).json({ error: 'Password must be at least 8 characters long' });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) return res.status(409).json({ error: 'Email is already registered' });

    const normalizedEmail = email.toLowerCase();

    const user = await User.create({
      email: normalizedEmail,
      phone,
      password: hashPassword(password),
      verified: false,
      role: isAdminEmail(normalizedEmail) ? 'admin' : 'user',
      personal: {
        firstName,
        lastName,
        gender,
        dob: dateOfBirth ? new Date(dateOfBirth) : undefined,
      },
    });

    return res.status(201).json(createAuthResponse(user));
  } catch (error) {
    console.error('Registration failed:', error);

    if (error?.code === 11000) {
      const field = Object.keys(error.keyPattern || {})[0] || 'field';
      return res.status(409).json({ error: `${field} is already registered` });
    }

    if (error?.name === 'MongoNetworkError' || error?.name === 'MongooseServerSelectionError' || /buffering timed out/i.test(error?.message || '')) {
      return res.status(503).json({ error: 'Database connection failed. Check MONGO_URI and restart the backend.' });
    }

    return res.status(500).json({ error: error?.message || 'Registration failed' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email and password are required' });

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user || user.banned || !verifyPassword(password, user.password)) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    if (isAdminEmail(user.email) && user.role !== 'admin') {
      user.role = 'admin';
      await user.save();
    }

    return res.json(createAuthResponse(user));
  } catch (error) {
    return res.status(500).json({ error: 'Login failed' });
  }
});

router.post('/admin-login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const normalizedEmail = (email || '').trim().toLowerCase();
    const adminPassword = (password || '').trim();

    if (!normalizedEmail || !adminPassword) {
      return res.status(400).json({ error: 'Owner email and password are required' });
    }

    if (!isAdminEmail(normalizedEmail)) {
      return res.status(403).json({ error: 'This email is not configured as a business owner' });
    }

    if (!ADMIN_PASSWORD) {
      return res.status(500).json({ error: 'ADMIN_PASSWORD is not configured in backend/.env' });
    }

    if (!safeCompare(adminPassword, ADMIN_PASSWORD.trim())) {
      return res.status(401).json({ error: 'Invalid business owner password' });
    }

    let user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      user = await User.create({
        email: normalizedEmail,
        password: hashPassword(adminPassword),
        verified: true,
        role: 'admin',
        personal: {
          firstName: 'Business',
          lastName: 'Owner',
          gender: 'other',
        },
      });
    } else {
      user.role = 'admin';
      user.verified = true;
      if (!user.password) user.password = hashPassword(adminPassword);
      await user.save();
    }

    return res.json(createAuthResponse(user));
  } catch (error) {
    console.error('Admin login failed:', error);
    return res.status(500).json({ error: 'Business owner login failed' });
  }
});

router.get('/me', auth, (req, res) => {
  res.json({ user: toClientUser(req.user) });
});

router.post('/update-profile', auth, async (req, res) => {
  try {
    const { firstName, lastName, name, dateOfBirth, gender, phone } = req.body;
    const [fallbackFirstName = '', ...fallbackLastName] = (name || '').trim().split(/\s+/);

    req.user.phone = phone || req.user.phone;
    req.user.verified = true;
    req.user.personal = {
      ...(req.user.personal || {}),
      firstName: firstName || req.user.personal?.firstName || fallbackFirstName,
      lastName: lastName || req.user.personal?.lastName || fallbackLastName.join(' '),
      gender: gender || req.user.personal?.gender,
      dob: dateOfBirth ? new Date(dateOfBirth) : req.user.personal?.dob,
    };

    await req.user.save();

    return res.json({
      message: 'Profile updated successfully',
      user: toClientUser(req.user),
    });
  } catch (error) {
    return res.status(500).json({ error: 'Profile update failed' });
  }
});

router.get('/google', (req, res, next) => {
  if (!hasGoogleConfig) return res.status(501).json({ error: 'Google login is not configured' });
  return passport.authenticate('google', { scope: ['profile', 'email'], session: false })(req, res, next);
});

router.get('/google/callback', passport.authenticate('google', {
  failureRedirect: `${FRONTEND_URL}/login?error=social-login-failed`,
  session: false,
}), (req, res) => {
  res.redirect(`${FRONTEND_URL}/social-login-success?token=${signToken(req.user)}`);
});

router.get('/facebook', (req, res, next) => {
  if (!hasFacebookConfig) return res.status(501).json({ error: 'Facebook login is not configured' });
  return passport.authenticate('facebook', { scope: ['email'], session: false })(req, res, next);
});

router.get('/facebook/callback', passport.authenticate('facebook', {
  failureRedirect: `${FRONTEND_URL}/login?error=social-login-failed`,
  session: false,
}), (req, res) => {
  res.redirect(`${FRONTEND_URL}/social-login-success?token=${signToken(req.user)}`);
});

module.exports = router;
