const sequelize = require('../db/sequelize')
const { literal, DataTypes } = require("sequelize");

const Footballer = sequelize.define('footballer', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    defaultValue: literal("nextval('footballers_id_seq')"),
  },
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
