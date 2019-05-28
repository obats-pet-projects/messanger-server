const express = require('express');
const messagesController = require('../controllers/messages-controller');

const router = new express.Router();

router.get('/', messagesController.getAll);
router.post('/create-message', messagesController.create);

module.exports = router;
