const sequelize = require('../db/sequelize')
const { DataTypes } = require("sequelize");

const User = sequelize.define('user', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    required: true,
  },
  hashPassword: {
    type: DataTypes.STRING,
  },
  imageUrl: {
    type: DataTypes.STRING,
  }
});

module.exports = User;
