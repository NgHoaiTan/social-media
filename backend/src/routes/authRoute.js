const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController')


router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);

router.get('/auth/google', authController.googleLogin);
router.get('/auth/google/callback', authController.googleCallback);
router.get('/logout', authController.logout);

module.exports = router;