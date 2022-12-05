const express = require('express');
const router = express.Router();
const { userCreds } = require('../controllers/AuthController');

const UserController = require('../controllers/UserController');

router.patch('/updateAddress', userCreds, UserController.updateAddress);
router.patch('/updatePoint', userCreds, UserController.updatePoint);

router.put('/addWishlistItem', userCreds, UserController.addWishlistItem);
router.patch('/deleteWishlistItem', userCreds, UserController.deleteWishlistItem);

router.patch('/redeemcoupon', userCreds, UserController.coupon);

module.exports = router;