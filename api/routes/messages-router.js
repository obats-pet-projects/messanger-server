const express = require('express');
const messagesController = require('../controllers/messages-controller');

const router = new express.Router();

router.get('/:id', messagesController.getOne);
router.get('/mail/category', messagesController.getByCategory);
router.post('/', messagesController.create);
router.patch('/', messagesController.updateCategory);
router.delete('/', messagesController.deleteAll);
router.delete('/:id', messagesController.deleteOne);

module.exports = router;
