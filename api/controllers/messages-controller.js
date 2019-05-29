const Message = require('../models/message-model');

const create = (req, res) => {
  const { title, message } = req.body;

  if (!title || !message) {
    return res.status(422).send('Please, fill up all fields!');
  }

  Message.create({
    title,
    message
  })
    .then(() => res.status(200).send('Message sent'))
    .catch(error => res.status(500).send(error));
};

const getAll = (req, res) => {
  Message.findAll()
    .then(message => res.status(200).send(message))
    .catch(error => res.status(500).send(error));
};

module.exports = { create, getAll };
