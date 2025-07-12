const express = require('express');
const { sendMessage, getMessages, markAsSeen } = require('../controllers/messageController');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/', auth, sendMessage);
router.get('/:userId', auth, getMessages); // Get chat with a user
router.post('/seen/:messageId', auth, markAsSeen);

module.exports = router;
