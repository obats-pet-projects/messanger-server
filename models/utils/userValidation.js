const Joi = require('@hapi/joi');

const minPasswordLength = 6;
const maxPasswordLength = 15;
const maxUsernameLength = 50;

const validate = user => {
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
  return Joi.validate(user, schema);
};

module.exports = validate;
