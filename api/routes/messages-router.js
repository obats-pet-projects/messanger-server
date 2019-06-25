const express = require('express');
const messagesController = require('../controllers/messages-controller');

const router = new express.Router();

router.get('/:id', messagesController.getOneMessage);
router.get('/mail/category', messagesController.getByCategory);
router.post('/', messagesController.createMessage);
router.patch('/', messagesController.updateCategory);
router.delete('/', messagesController.deleteAllMessages);
router.delete('/:id', messagesController.deleteOneMessage);

module.exports = router;
