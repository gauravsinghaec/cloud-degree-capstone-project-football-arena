const sequelize = require('../db/sequelize')
const { literal, DataTypes } = require("sequelize");

const User = sequelize.define('user', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    defaultValue: literal("nextval('users_id_seq')"),
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    required: true
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    required: true
  },
  hashPassword: {
    type: DataTypes.STRING,
  },
  imageUrl: {
    type: DataTypes.STRING,
  }
});

module.exports = User;
