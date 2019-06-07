const models = require('../../models');

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

const getByCategory = (req, res) => {
  const { category } = req.query;

  models.Message.findAll({
    where: { tag: category },
    order: [['createdAt', 'DESC']]
  })
    .then(message => res.status(200).send(message))
    .catch(error => res.status(500).send(error));
};

const getOne = (req, res) => {
  const { id } = req.params;

  models.Message.findOne({
    where: { id: id }
  })
    .then(message => res.status(200).send(message))
    .catch(error => res.status(500).send(error));
};

const updateCategory = (req, res) => {
  const { messagesIds, category } = req.body;

  models.Message.update({ tag: category }, { where: { id: messagesIds } })
    .then(() => res.status(200).send(`Message(s) were marked as ${category}`))
    .catch(error => console.log(error));
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

module.exports = { create, getByCategory, getOne, updateCategory, deleteOne, deleteAll };
