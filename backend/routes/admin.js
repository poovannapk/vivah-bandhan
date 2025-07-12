const express = require('express');
const { dashboard, banUser, verifyUser, deleteUser, getUsers, analytics, getFlaggedMessages, flagMessage, getFlaggedPhotos, flagPhoto } = require('../controllers/adminController');
const adminAuth = require('../middleware/adminAuth');
const router = express.Router();

router.get('/dashboard', adminAuth, dashboard);
router.get('/users', adminAuth, getUsers);
router.post('/ban/:id', adminAuth, banUser);
router.post('/verify/:id', adminAuth, verifyUser);
router.delete('/user/:id', adminAuth, deleteUser);
router.get('/analytics', adminAuth, require('../controllers/adminController').analytics);
router.get('/flagged-messages', adminAuth, require('../controllers/adminController').getFlaggedMessages);
router.post('/flag-message/:id', adminAuth, require('../controllers/adminController').flagMessage);
router.get('/flagged-photos', adminAuth, require('../controllers/adminController').getFlaggedPhotos);
router.post('/flag-photo/:userId', adminAuth, require('../controllers/adminController').flagPhoto);


/**
 * @swagger
 * /api/users/register/send-otp:
 *   post:
 *     summary: Send OTP to phone number
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *                 example: "9876543210"
 *     responses:
 *       200:
 *         description: OTP sent successfully
 */
router.post('/register/send-otp', async (req, res) => { ... });

/**
 * @swagger
 * /api/users/register/verify-otp:
 *   post:
 *     summary: Verify OTP and create user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *                 example: "9876543210"
 *               otp:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: User created and OTP verified
 */
router.post('/register/verify-otp', async (req, res) => { ... });
s
module.exports = router;
