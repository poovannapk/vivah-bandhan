const express = require('express');
const { getProfile, updateProfile, uploadPhoto } = require('../controllers/profileController');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/', auth, getProfile);
router.put('/', auth, updateProfile);
router.post('/upload-photo', auth, uploadPhoto);

module.exports = router;
