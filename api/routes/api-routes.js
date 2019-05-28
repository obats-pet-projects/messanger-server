const express = require('express');
const messagesRouter = require('./messages-router');

const router = new express.Router();

router.use('/messages', messagesRouter);

module.exports = router;
