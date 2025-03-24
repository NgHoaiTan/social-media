const userController = require('../controllers/userController')
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

router.get('/profile', authMiddleware, userController.getProfile);

module.exports = router;