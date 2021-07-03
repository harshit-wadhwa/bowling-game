const express = require('express');
const asyncHandler = require('express-async-handler');
const validateMiddleware = require('../middlewares/validate.middleware');
const playerController = require('../controllers/player.controller');
const playerRequest = require('../requests/player.request');
const router = express.Router();

router.route('/player-registration').post(validateMiddleware(playerRequest['players-registration'], 'body'), asyncHandler(playerController.registerPlayer));
router.route('/play/:game_id/player/:player_id').post(validateMiddleware(playerRequest['play-game'], 'body'), asyncHandler(playerController.playGame));
router.route('/score/:game_id/player/:player_id').get(asyncHandler(playerController.getScore));

module.exports = router;
