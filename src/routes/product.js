const express = require('express');
const router = express.Router();
const { userCreds } = require('../controllers/AuthController');

const ProductController = require('../controllers/ProductController');

router.get('/allproduct', ProductController.getAllProduct);

router.post('/addProduct', ProductController.addProduct);

router.patch('/editProduct', ProductController.editProduct);

router.delete('/deleteProduct', ProductController.deleteProduct);

module.exports = router;