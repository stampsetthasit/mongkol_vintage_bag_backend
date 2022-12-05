const express = require('express');
const router = express.Router();
const { userCreds } = require('../controllers/AuthController');
const OrderController = require('../controllers/OrderController');

router.get('/checkout', userCreds, OrderController.checkout);

router.patch('/checkout/success', userCreds, OrderController.checkoutComplete);

// router.get('/orders', userCreds,);

// router.get('/orders/:orderID', userCreds,);

module.exports = router;