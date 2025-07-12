const express = require('express');
const { getSubscription, createOrUpdateSubscription } = require('../controllers/subscriptionController');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/', auth, getSubscription);
router.post('/', auth, createOrUpdateSubscription);

module.exports = router;
