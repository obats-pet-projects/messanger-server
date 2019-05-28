const Message = require('../models/message-model');

const create = (req, res) => {
  try {
    const { title, message } = req.body;

    if (!title || !message) {
      return res.status(422).send('Please, fill up all fields!');
    }

    Message.create({
      title,
      message
    })
      .then(() => res.status(200).send('Messages sent'))
      .catch(error => res.status(422).send(error));
  } catch (error) {
    res.sendStatus(500);
  }
};

const getAll = (req, res) => {
  try {
    Message.findAll().then(message => res.status(200).send(message));
  } catch (error) {
    res.sendStatus(500);
  }
};

module.exports = { create, getAll };
