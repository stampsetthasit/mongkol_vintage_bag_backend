const express = require('express');
const router = express.Router();
const { isAdmin } = require('../controllers/AuthController');

const FileController = require('../controllers/FileController');

router.post('/upload', isAdmin, FileController.uploadImage);

module.exports = router;