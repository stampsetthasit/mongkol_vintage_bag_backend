const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController.js');

router.post('/login', AuthController.login);
router.post('/register', AuthController.register);
// router.post('/google-login', AuthController.googleLogin);

router.post('/forgotpassword', AuthController.resetPassword);

module.exports = router;