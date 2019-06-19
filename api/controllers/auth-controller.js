const bcrypt = require('bcrypt');
const models = require('../../models');

const signUp = async (req, res) => {
  try {
    const { error } = models.User.validateData(req.body);
    if (error) {
      return res.status(400).send('Incorrect values');
    }

    let { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(422).send('Please, fill up all fields!');
    }

    username = username.trim();
    email = email.trim();

    let user = await models.User.findOne({
      where: { username: username }
    });

    if (user) {
      return res.status(422).json({ message: 'User with such username is already exist!' });
    }

    user = await models.User.findOne({
      where: { email: email }
    });

    if (user) {
      return res.status(422).json({ message: 'User with such email is already exist!' });
    }

    user = await models.User.create({
      username,
      email,
      password
    });

    const salt = bcrypt.genSaltSync(10);
    user.password = await bcrypt.hashSync(password, salt);
    await user.save();

    const token = models.User.generateAuthToken(user.id);

    res
      .header('access-token', token)
      .status(200)
      .json({
        message: 'User created!',
        user: { username, email }
      });
  } catch (error) {
    res.status(500).send(error);
  }
};

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(422).json({ message: 'Email and password are required!' });
    }

    let user = await models.User.findOne({
      where: { email: email }
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password!' });
    }

    const validPassword = await bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: 'Invalid email or password!' });
    }

    const token = models.User.generateAuthToken();

    res
      .header('access-token', token)
      .status(200)
      .json({ user });
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = { signUp, signIn };
