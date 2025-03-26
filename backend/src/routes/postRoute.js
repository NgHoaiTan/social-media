const postController = require('../controllers/postController')
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../config/multer');

router.post('/', authMiddleware, upload.single('file'), postController.createPost);


module.exports = router;