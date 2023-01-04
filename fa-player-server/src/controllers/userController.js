const UserModel = require('../models/users');

async function getById(id) {
  const user = await UserModel.findById(id);
  return user;
}

module.exports = {
  getById,
};
