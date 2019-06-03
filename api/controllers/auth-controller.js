const models = require('../../models');

const signIn = (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(422).send('Please, fill up all fields!');
  }

  models.User.create({
    username,
    email,
    password
  })
    .then(() => res.status(200).send('Account created'))
    .catch(error => res.status(500).send(error));
};

module.exports = { signIn };
