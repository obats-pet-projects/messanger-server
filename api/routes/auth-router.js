const express = require('express');
const authController = require('../controllers/auth-controller');

const router = new express.Router();

router.post('/signup', authController.signUp);

module.exports = router;
