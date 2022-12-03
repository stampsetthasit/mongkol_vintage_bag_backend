const express = require('express');
const router = express.Router();

const { isAdmin } = require('../controllers/AuthController');

router.get('/dashboard', isAdmin);

module.exports = router;