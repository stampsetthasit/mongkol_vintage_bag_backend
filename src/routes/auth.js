const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController.js');
const { userCreds } = require('../controllers/AuthController');

router.post('/login', AuthController.login);
router.post('/register', AuthController.register);

// router.post('/google-login', AuthController.googleLogin);

router.post('/changepassword', userCreds, AuthController.changePassword);
router.post('/forgotpassword', AuthController.resetPassword);

module.exports = router;