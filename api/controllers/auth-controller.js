const bcrypt = require('bcrypt');
const Sequelize = require('sequelize');
const models = require('../../models');

const Op = Sequelize.Op;

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
    email = email.trim().toLowerCase();

    let user = await models.User.findOne({
      where: {
        [Op.or]: [{ username }, { email }]
      }
    });

    if (user) {
      return res
        .status(422)
        .json({ message: 'User with such username or email is already exist!' });
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
      .json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Server error. Please try again later' });
  }
};

const signIn = async (req, res) => {
  try {
    let { email, password } = req.body;

    if (!email || !password) {
      return res.status(422).json({ message: 'Email and password are required!' });
    }

    email = email.trim().toLowerCase();

    const user = await models.User.findOne({
      where: { email }
    });

    if (!user) {
      return res.status(422).json({ message: 'Invalid email or password!' });
    }

    const validPassword = await bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(422).json({ message: 'Invalid email or password!' });
    }

    delete user.dataValues.password;

    const token = models.User.generateAuthToken(user.id);

    res
      .header('access-token', token)
      .status(200)
      .json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Server error. Please try again later' });
  }
};

const validateUser = async (req, res) => {
  const { id } = req.decoded;

  const user = await models.User.findOne({
    where: { id }
  });

  if (!user) {
    return res.status(400).json({ message: 'Token is not valid' });
  }

  delete user.dataValues.password;

  res.status(200).json(user);
};

module.exports = { signUp, signIn, validateUser };
