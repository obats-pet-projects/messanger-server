'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
      .then(() => {
        return queryInterface.createTable('Messages', {
          id: {
            allowNull: false,
            autoIncrement: false,
            defaultValue: Sequelize.literal('uuid_generate_v4()'),
            primaryKey: true,
            type: Sequelize.UUID
          },
          subject: {
            allowNull: false,
            type: Sequelize.STRING
          },
          message: {
            allowNull: false,
            type: Sequelize.TEXT
          },
          tag: {
            defaultValue: 'inbox',
            type: Sequelize.STRING
          },
          deleted: {
            defaultValue: false,
            type: Sequelize.BOOLEAN
          },
          createdAt: {
            allowNull: false,
            type: Sequelize.DATE
          },
          updatedAt: {
            allowNull: false,
            type: Sequelize.DATE
          }
        });
      });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Messages');
  }
};
