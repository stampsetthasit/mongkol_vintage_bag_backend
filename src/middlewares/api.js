const express = require('express');
const router = express.Router();
require('../db');

router.use('/auth', require('../routes/auth'));
router.use('/user', require('../routes/user'));
router.use('/admin', require('../routes/admin'));
router.use('/product', require('../routes/product'));
router.use('/file', require('../routes/file'));
router.use('/order', require('../routes/order'));

module.exports = router;