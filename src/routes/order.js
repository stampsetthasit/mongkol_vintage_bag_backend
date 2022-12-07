const express = require('express');
const router = express.Router();
const { userCreds } = require('../controllers/AuthController');
const OrderController = require('../controllers/OrderController');

router.patch('/checkout', userCreds, OrderController.checkout, OrderController.checkoutComplete, OrderController.sendMail);

// router.patch('/checkout/success', userCreds, );

// router.get('/orders', userCreds,);

// router.get('/orders/:orderID', userCreds,);

module.exports = router;