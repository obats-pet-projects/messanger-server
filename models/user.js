const jwt = require('jsonwebtoken');

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

  User.generateAuthToken = function() {
    const token = jwt.sign(
      {
        id: this._id
      },
      process.env.JWT_KEY,
      { expiresIn: '30d' }
    );
    return token;
  };

  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};
