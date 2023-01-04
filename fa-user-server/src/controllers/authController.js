const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const UserModel = require('../models/users');
const config = require('../config/config');

async function create(userData) {
  const existingUser = await UserModel.findOne({ email: userData.email });
  // validate
  if (existingUser) {
    throw Error(`email "${userData.email}" is already registered.`);
  }
  const userObj = {
    email: userData.email,
    name: userData.name,
  };
  const user = new UserSchema(userObj);

  // hash password
  if (userData.password) {
    user.hashPassword = await bcrypt.hash(userData.password, 10);
  }

  // save user
  await user.save();
}

async function authenticate({ email, password }) {
  const user = await UserModel.findOne({ email });
  if (user) {
    if (await bcrypt.compare(password, user.hashPassword)) {
      const { hashPassword, ...userWithoutHash } = user;
      const token = jwt.sign({ sub: user.id, name: user.name }, config.jwt.secret);
      return {
        ...userWithoutHash,
        token,
      };
    }
    throw Error('Email or password is incorrect.');
  } else {
    throw Error(`Email "${email}" is not registered.`);
  }
}

async function getById(id) {
  const user = await UserModel.findById(id);
  return user;
}

module.exports = {
  authenticate,
  create,
  getById,
};
