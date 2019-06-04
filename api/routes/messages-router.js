const express = require('express');
const messagesController = require('../controllers/messages-controller');

const router = new express.Router();

router.get('/:category', messagesController.getByCategory);
router.post('/', messagesController.create);

module.exports = router;
