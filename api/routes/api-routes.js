const express = require('express');
const messagesRouter = require('./messages-router');
const authRouter = require('./auth-router');

const router = new express.Router();

router.use('/messages', messagesRouter);
router.use('/auth', authRouter);

module.exports = router;
