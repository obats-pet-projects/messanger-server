const express = require('express');
const messagesController = require('../controllers/messages-controller');

const router = new express.Router();

router.get('/:category', messagesController.getByCategory);
router.post('/', messagesController.create);
router.delete('/', messagesController.deleteAll);
router.delete('/:id', messagesController.deleteOne);

module.exports = router;
