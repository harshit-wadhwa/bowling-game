const express = require('express');
const asyncHandler = require('express-async-handler');
const validateMiddleware = require('../middlewares/validate.middleware');
const gameController = require('../controllers/game.controller');
const gameRequest = require('../requests/game.request');
const router = express.Router();

router.route('/create').post(validateMiddleware(gameRequest['create-game'], 'body'), asyncHandler(gameController.createGame));

module.exports = router;
