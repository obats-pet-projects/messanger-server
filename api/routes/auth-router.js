const express = require('express');
const authController = require('../controllers/auth-controller');
const checkToken = require('../middleware/check-token');

const router = new express.Router();

router.get('/validate', checkToken, authController.validateUser);
router.post('/signup', authController.signUp);
router.post('/signin', authController.signIn);

module.exports = router;
