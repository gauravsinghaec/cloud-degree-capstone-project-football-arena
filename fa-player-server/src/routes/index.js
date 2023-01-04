const express = require('express');

const router = express.Router();
const playerRoutes = require('./api/player');

/* GET home page. */
router.get('/*', (req, res) => {
  res.render('index');
});

// Player router
router.use('/api', playerRoutes);

module.exports = router;
