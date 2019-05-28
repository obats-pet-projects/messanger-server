const Message = require('../models/message-model');

const create = (req, res) => {
  try {
    const { title, message } = req.body;

    if (!title || !message) {
      return res.sendStatus(422).json({ message: 'Please, fill up all fields!' });
    }

    Message.create({
      title,
      message
    })
      .then(() => res.sendStatus(200))
      .catch(error => res.sendStatus(422).json(error));
  } catch (error) {
    res.sendStatus(500).json(error);
  }
};

const getAll = (req, res) => {
  try {
    Message.findAll().then(message => res.sendStatus(200).json(message));
  } catch (error) {
    res.sendStatus(500).json(error);
  }
};

module.exports = { create, getAll };
