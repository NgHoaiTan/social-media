const messageController = require('../controllers/messageController');
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

router.post('/:receiverId', authMiddleware, messageController.sendMessage);

module.exports = router;