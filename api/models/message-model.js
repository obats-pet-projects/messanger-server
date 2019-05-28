const Sequelize = require('sequelize');
const db = require('../../config/database');

const Message = db.define('message', {
  title: {
    type: Sequelize.STRING
  },
  message: {
    type: Sequelize.TEXT
  }
});

module.exports = Message;
