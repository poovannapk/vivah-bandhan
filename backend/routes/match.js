const express = require('express');
const { getMatches, getCompatibility } = require('../controllers/matchController');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/', auth, getMatches);
router.post('/compatibility', auth, getCompatibility);

module.exports = router;
