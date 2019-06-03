const models = require('../../models');
const mod = require('../../models');

const create = (req, res) => {
  const { subject, message } = req.body;

  if (!subject || !message) {
    return res.status(422).send('Please, fill up all fields!');
  }

  models.Message.create({
    subject,
    message
  })
    .then(() => res.status(200).send('Message sent'))
    .catch(error => res.status(500).send(error));
};

const getAll = (req, res) => {
  models.Message.findAll()
    .then(message => res.status(200).send(message))
    .catch(error => res.status(500).send(error));
};

const deleteAll = (req, res) => {
  const { messagesIds } = req.body;

  models.Message.destroy({
    where: { id: messagesIds }
  })
    .then(() => res.status(200).send('Messages were successfully deleted'))
    .catch(error => res.status(500).send(error));
};

const deleteOne = (req, res) => {
  const { id } = req.params;

  models.Message.destroy({
    where: { id: id }
  })
    .then(() => res.status(200).send('Message was successfully deleted'))
    .catch(error => res.status(500).send(error));
};

module.exports = { create, getAll, deleteOne, deleteAll };
