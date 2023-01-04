const express = require('express');

const router = express.Router();
const authRoutes = require('./api/auth');

router.use('/auth', authRoutes);

router.get('/', async (req, res) => {
  res.send('/auth');
});

module.exports = router;
