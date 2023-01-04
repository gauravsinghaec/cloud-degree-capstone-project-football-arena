const express = require('express');

const router = express.Router();
const playerRoutes = require('./api/player');

// Player router
router.use('/api', playerRoutes);

module.exports = router;
