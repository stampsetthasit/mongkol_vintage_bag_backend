const express = require('express');
const router = express.Router();
const { userCreds, isAdmin } = require('../controllers/AuthController');

const ProductController = require('../controllers/ProductController');

router.get('/allproduct', userCreds, ProductController.getAllProduct);

router.post('/addProduct', isAdmin, ProductController.addProduct);

router.patch('/editProduct', isAdmin, ProductController.editProduct);

router.delete('/deleteProduct', isAdmin, ProductController.deleteProduct);

module.exports = router;