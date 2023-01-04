const express = require('express');

const router = express.Router();
const authController = require('../../controllers/authController');

module.exports = router;

function authenticate(req, res, next) {
  authController.authenticate(req.body)
    .then(user => res.json(user))
    .catch(err => next(err));
}

function register(req, res, next) {
  authController.create(req.body)
    .then(() => res.json({}))
    .catch(err => next(err));
}

router.post('/signin', authenticate);
router.post('/signup', register);

// auth ROOT URI calls
router.get('/', async (req, res) => {
  res.send('HTTP POST to /signin, /signup');
});