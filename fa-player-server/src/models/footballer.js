const sequelize = require('../db/sequelize')
const { DataTypes } = require("sequelize");

const Footballer = sequelize.define('footballer', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  nationality: {
    type: DataTypes.STRING,
  },
  nationalPosition: {
    type: DataTypes.STRING,
  },
  club: {
    type: DataTypes.STRING,
  },
  clubPosition: {
    type: DataTypes.STRING,
  },
  age: {
    type: DataTypes.INTEGER,
  },
  rating: {
    type: DataTypes.INTEGER,
  }
});

module.exports = Footballer;
