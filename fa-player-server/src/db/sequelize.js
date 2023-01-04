const { Sequelize } = require("sequelize");
const config = require('../config/config');

const sequelize = new Sequelize({
  'username': config.username,
  'password': config.password,
  'database': config.database,
  'host': config.host,
  'dialect': config.dialect,
  'storage': ':memory:',
});

module.exports = sequelize;
