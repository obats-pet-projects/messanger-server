const jwt = require('jsonwebtoken');
const Joi = require('@hapi/joi');

const minPasswordLength = 6;
const maxPasswordLength = 15;
const maxUsernameLength = 50;

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      username: { allowNull: false, unique: true, type: DataTypes.STRING },
      email: { allowNull: false, unique: true, type: DataTypes.STRING },
      password: { allowNull: false, type: DataTypes.STRING }
    },
    {}
  );

  User.validateData = data => {
    const schema = {
      username: Joi.string()
        .max(maxUsernameLength)
        .regex(/^[a-zA-Z0-9_]*$/),
      email: Joi.string().email(),
      password: Joi.string()
        .min(minPasswordLength)
        .max(maxPasswordLength)
        .regex(
          /^.*(?=.{6,15})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/
        )
    };
    return Joi.validate(data, schema);
  };

  User.generateAuthToken = id => {
    return jwt.sign({ id }, process.env.JWT_KEY, { expiresIn: '30d' });
  };

  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};
