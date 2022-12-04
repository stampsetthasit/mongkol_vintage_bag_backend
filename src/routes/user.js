const express = require('express');
const router = express.Router();
const { userCreds } = require('../controllers/AuthController');

const UserController = require('../controllers/UserController');

router.patch('/updateAddress', userCreds, UserController.updateAddress);
router.patch('/updatePoint', userCreds, UserController.updatePoint);

router.put('/addWishlist', userCreds, UserController.addWishlist);
router.patch('/removeWishlist', userCreds, UserController.removeWishlist);

module.exports = router;