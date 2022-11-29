const express = require('express');
const router = express.Router();
const { userCreds } = require('../controllers/AuthController');

const UserController = require('../controllers/UserController');

// router.patch('/updateAddress', userCreds, UserController.updateAddress);
router.patch('/updateAddress', UserController.updateAddress);

module.exports = router;