const expressJwt = require('express-jwt');
const config = require('../config/config');
const userController = require('../controllers/userController');

async function isRevoked(req, payload, done) {
  // payload will be { sub: 56777777fhf66 , iat: 53211125 }
  const user = await userController.getById(payload.sub);
  // revoke token if user no longer exists
  if (!user) {
    return done(null, true);
  }
  // if user exists then it will add it to req.user
  return done();
}

function getToken(req) {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    // Authorization: Bearer g1jipjgi1ifjioj
    // Handle token presented as a Bearer token in the Authorization header
    return req.headers.authorization.split(' ')[1];
  }
  if (req.query && req.query.token) {
    // Handle token presented as URI param
    return req.query.token;
  }
  if (req.cookies && req.cookies.token) {
    // Handle token presented as a cookie parameter
    return req.cookies.token;
  }
  // If we return null, we couldn't find a token. In this case,
  // the JWT middleware will return a 401 (unauthorized) to the client for this request
  return null;
}

function authHandler() {
  const { jwt } = config;
  return expressJwt({ secret: jwt.secret, isRevoked, getToken }).unless({
    path: [
      // auth routes that don't require authentication
      `${config.basePath}/auth/signin`,
      `${config.basePath}/auth/signup`,
      `${config.basePath}/api/getAllPlayers`,
    ],
  });
}

module.exports = authHandler;
