const UserModel = require('../models/users');

async function getById(id) {
  const user = await UserModel.findByPk(id);
  return user;
}

module.exports = {
  getById,
};
