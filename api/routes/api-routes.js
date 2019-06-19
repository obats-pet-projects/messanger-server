const express = require('express');
const messagesRouter = require('./messages-router');
const authRouter = require('./auth-router');
const checkToken = require('../middleware/check-token');

const router = new express.Router();

router.use('/messages', checkToken, messagesRouter);
router.use('/auth', authRouter);

module.exports = router;
