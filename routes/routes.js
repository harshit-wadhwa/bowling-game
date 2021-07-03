const express = require('express');

const gameRoutes = require('./game.route');
const playerRoutes = require('./player.route');

const router = express.Router();

router.use('/', gameRoutes);
router.use('/', playerRoutes);

module.exports = router;