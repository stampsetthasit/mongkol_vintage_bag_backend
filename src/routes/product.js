const express = require('express');
const router = express.Router();
const { userCreds, isAdmin } = require('../controllers/AuthController');

const ProductController = require('../controllers/ProductController');

router.get('/allproduct', userCreds, ProductController.getAllProduct);

router.post('/addProduct', userCreds, isAdmin, ProductController.addProduct);

router.patch('/editProduct', userCreds, isAdmin, ProductController.editProduct);

router.delete('/deleteProduct', userCreds, isAdmin, ProductController.deleteProduct);

module.exports = router;