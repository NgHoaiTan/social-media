const commentController = require('../controllers/commentController');
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

router.post('/:postId', authMiddleware, commentController.addComment);

module.exports = router;