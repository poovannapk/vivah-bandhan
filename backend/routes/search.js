const express = require('express');
const { searchProfiles } = require('../controllers/searchController');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/', auth, searchProfiles);

module.exports = router;
