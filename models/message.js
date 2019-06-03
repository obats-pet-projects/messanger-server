'use strict';

module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define(
    'Message',
    {
      subject: { allowNull: false, type: DataTypes.STRING },
      message: { allowNull: false, type: DataTypes.TEXT },
      tag: { defaultValue: 'inbox', type: DataTypes.STRING },
      deleted: { defaultValue: false, type: DataTypes.BOOLEAN }
    },
    {}
  );
  Message.associate = function(models) {
    // Message.belongsTo(models.User);
  };
  return Message;
};
