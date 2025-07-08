import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { body, validationResult } from 'express-validator';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import User, { IUser } from '../models/User';
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import rateLimit from 'express-rate-limit';

dotenv.config();

// MongoDB connection
mongoose.connect(process.env.MONGO_URI || '', { useNewUrlParser: true, useUnifiedTopology: true } as mongoose.ConnectOptions)
  .then(() => console.log('MongoDB connected'))
  .catch((err: unknown) => console.error('MongoDB connection error:', err));

const router = Router();

// Define a minimal profile type for Google/Facebook
interface OAuthProfile {
  emails?: { value: string }[];
  displayName?: string;
}

// Passport Google Strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID || '',
  clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
  callbackURL: '/api/auth/google/callback',
}, async (
  accessToken: string,
  refreshToken: string,
  profile: OAuthProfile,
  done: (error: Error | null, user?: IUser | false) => void
) => {
  try {
    const email = profile.emails && profile.emails[0] && profile.emails[0].value;
    if (!email) return done(new Error('No email from Google'), false);
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ email, password: '', name: profile.displayName });
    }
    return done(null, user);
  } catch (err) {
    return done(err as Error, false);
  }
}));

// Passport Facebook Strategy
passport.use(new FacebookStrategy({
  clientID: process.env.FB_CLIENT_ID || '',
  clientSecret: process.env.FB_CLIENT_SECRET || '',
  callbackURL: '/api/auth/facebook/callback',
  profileFields: ['id', 'displayName', 'emails']
}, async (
  accessToken: string,
  refreshToken: string,
  profile: OAuthProfile,
  done: (error: Error | null, user?: IUser | false) => void
) => {
  try {
    const email = profile.emails && profile.emails[0] && profile.emails[0].value;
    if (!email) return done(new Error('No email from Facebook'), false);
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ email, password: '', name: profile.displayName });
    }
    return done(null, user);
  } catch (err) {
    return done(err as Error, false);
  }
}));

// Rate limiting middleware
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 10 requests per windowMs
  message: 'Too many attempts, please try again later.'
});

// Email sender utility
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendVerificationEmail(email: string, token: string) {
  const url = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;
  await transporter.sendMail({
    to: email,
    subject: 'Verify your email',
    html: `<p>Click <a href="${url}">here</a> to verify your email.</p>`
  });
}

async function sendResetPasswordEmail(email: string, token: string) {
  const url = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
  await transporter.sendMail({
    to: email,
    subject: 'Reset your password',
    html: `<p>Click <a href="${url}">here</a> to reset your password.</p>`
  });
}

// Register with email verification
router.post('/register', authLimiter,
  body('name').notEmpty().withMessage('Name is required.'),
  body('email').isEmail().withMessage('Valid email is required.'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters.'),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(409).json({ error: 'User already exists.' });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const verificationToken = crypto.randomBytes(32).toString('hex');
      user = await User.create({ name, email, password: hashedPassword, verificationToken });
      await sendVerificationEmail(email, verificationToken);
      return res.status(201).json({ message: 'User registered. Please check your email to verify your account.' });
    } catch {
      return res.status(500).json({ error: 'Server error.' });
    }
  }
);

// Email verification endpoint
router.get('/verify-email', async (req: Request, res: Response) => {
  const { token } = req.query;
  if (!token || typeof token !== 'string') {
    return res.status(400).json({ error: 'Invalid token.' });
  }
  const user = await User.findOne({ verificationToken: token });
  if (!user) {
    return res.status(400).json({ error: 'Invalid or expired token.' });
  }
  user.isVerified = true;
  user.verificationToken = undefined;
  await user.save();
  return res.json({ message: 'Email verified successfully.' });
});

// Login (only allow if verified)
router.post('/login', authLimiter,
  body('email').isEmail().withMessage('Valid email is required.'),
  body('password').notEmpty().withMessage('Password is required.'),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user || !user.isVerified) {
        return res.status(401).json({ error: 'Invalid credentials or email not verified.' });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid credentials.' });
      }
      const token = jwt.sign(
        { email: user.email, name: user.name, role: user.role },
        process.env.JWT_SECRET || 'secret',
        { expiresIn: '1h' }
      );
      return res.json({ token, user: { name: user.name, email: user.email, role: user.role } });
    } catch {
      return res.status(500).json({ error: 'Server error.' });
    }
  }
);

// Forgot password
router.post('/forgot-password', async (req: Request, res: Response) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(200).json({ message: 'If that email exists, a reset link has been sent.' });
  const resetToken = crypto.randomBytes(32).toString('hex');
  user.resetPasswordToken = resetToken;
  user.resetPasswordExpires = new Date(Date.now() + 3600000); // 1 hour
  await user.save();
  await sendResetPasswordEmail(email, resetToken);
  return res.json({ message: 'If that email exists, a reset link has been sent.' });
});

// Reset password
router.post('/reset-password', async (req: Request, res: Response) => {
  const { token, password } = req.body;
  const user = await User.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: new Date() } });
  if (!user) return res.status(400).json({ error: 'Invalid or expired token.' });
  user.password = await bcrypt.hash(password, 10);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();
  return res.json({ message: 'Password reset successful.' });
});

// Extend Express Request type for user (merge with Passport's User type)
import { JwtPayload } from 'jsonwebtoken';
import { IUser } from '../models/User';

declare module 'express-serve-static-core' {
  interface Request {
    user?: (JwtPayload & { email: string; role: string }) | IUser;
  }
}

// Auth middleware
function authMiddleware(req: Request, res: Response, next: () => void) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'No token provided.' });
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as JwtPayload & { email: string; role: string };
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid token.' });
  }
}

// Role middleware
function requireRole(role: string) {
  return (req: Request, res: Response, next: () => void) => {
    const user = req.user as IUser | (JwtPayload & { email: string; role: string });
    const userRole = (user as IUser).role || (user as JwtPayload & { role: string }).role;
    if (!user || userRole !== role) return res.status(403).json({ error: 'Forbidden' });
    next();
  };
}

// Get current user profile
router.get('/me', authMiddleware, async (req: Request, res: Response) => {
  const userData = req.user as IUser | (JwtPayload & { email: string; role: string });
  const email = (userData as IUser).email || (userData as JwtPayload & { email: string }).email;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ error: 'User not found.' });
  return res.json({ name: user.name, email: user.email, role: user.role });
});

// Update profile
router.post('/update-profile', authMiddleware, async (req: Request, res: Response) => {
  const userData = req.user as IUser | (JwtPayload & { email: string; role: string });
  const email = (userData as IUser).email || (userData as JwtPayload & { email: string }).email;
  const { name, dateOfBirth, gender, phone } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ error: 'User not found.' });

  if (name) user.name = name;
  if (dateOfBirth) user.dateOfBirth = dateOfBirth;
  if (gender) user.gender = gender;
  if (phone) user.phone = phone;

  // Check if all required fields are present for profile completion
  user.profileComplete = Boolean(user.name && user.dateOfBirth && user.gender && user.phone);

  await user.save();
  return res.json({ message: 'Profile updated.', profileComplete: user.profileComplete });
});

// Example admin-only route
router.get('/admin', authMiddleware, requireRole('admin'), (req: Request, res: Response) => {
  res.json({ message: 'Welcome, admin!' });
});

// Google OAuth endpoints
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { session: false, failureRedirect: '/login' }), (req: Request, res: Response) => {
  const user = req.user as IUser;
  const token = jwt.sign(
    { email: user.email, name: user.name },
    process.env.JWT_SECRET || 'secret',
    { expiresIn: '1h' }
  );
  // Redirect or respond with token
  res.redirect(`/social-login-success?token=${token}`);
});

// Facebook OAuth endpoints
router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));
router.get('/facebook/callback', passport.authenticate('facebook', { session: false, failureRedirect: '/login' }), (req: Request, res: Response) => {
  const user = req.user as IUser;
  const token = jwt.sign(
    { email: user.email, name: user.name },
    process.env.JWT_SECRET || 'secret',
    { expiresIn: '1h' }
  );
  res.redirect(`/social-login-success?token=${token}`);
});

export = router;

// In your main app file (e.g., app.ts or server.ts), use the auth routes