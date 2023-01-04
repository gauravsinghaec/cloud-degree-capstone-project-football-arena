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
  national_position: {
    type: DataTypes.STRING,
  },
  club: {
    type: DataTypes.STRING,
  },
  club_position: {
    type: DataTypes.STRING,
  },
  age: {
    type: DataTypes.INTEGER,
  },
  rating: {
    type: DataTypes.INTEGER,
  },
  created: {
    type: DataTypes.DATE,
    required: true,
    default: Date.now,
  },
  updated: {
    type: DataTypes.DATE,
    required: true,
    default: Date.now,
  },
});

module.exports = Footballer;
