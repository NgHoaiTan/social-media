const postController = require('../controllers/postController')
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../config/multer');
const authorizationMiddleware = require('../middleware/authorizationMiddleware')

router.post('/', authMiddleware, upload.single('file'), postController.createPost);
router.get('/:id', authMiddleware, postController.getPostById);
router.delete('/:id', authMiddleware, authorizationMiddleware('Post'), postController.deletePost);
router.get('/', authMiddleware, postController.getPosts);


module.exports = router;