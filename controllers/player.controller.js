const Player = require('../models/player.model');
const mongoose = require('mongoose');

async function registerPlayer(req, res) {
    let players = req.body.players;
    const game_id = req.body.game_id;
    let playersArray = [];
    for (let player of players) {
        playersArray.push({
            name: player,
            game_id
        });
    }
    players = await Player.create(playersArray);
    playersArray = [];
    for (let player of players) {
        playersArray.push({
            name: player.name,
            id: player._id
        });
    }
    return res.json(playersArray);
}

async function playGame(req, res) {
    let errorMessage = {
       error: 'Some error occurred!',
       ok: false
    };

    try {
        const score = req.body.score;
        const player = await Player.findOne({
            game_id: mongoose.Types.ObjectId(req.params.game_id),
            _id: mongoose.Types.ObjectId(req.params.player_id)
        });

        const playerScores = player['frame_wise'];

        if (playerScores.length === 10) {
            errorMessage.error = 'game is over for this player';
            return res.json(errorMessage);
        }

        let frameScore;

        if (!score[0] && score[0] !== 0) {
            errorMessage.error = 'invalid input, score should be entered for atleast 1 shot';
            return res.json(errorMessage);
        }

        if (playerScores.length === 9) {
            if (score[0] === 10) {
                if ((!score[1] && score[1] !== 0) || (!score[2] && score[2] !== 0)) {
                    errorMessage.error = 'invalid input, enter score for 3 shots';
                    return res.json(errorMessage);
                }
                frameScore = score[0] + score[1] + score[2];
            } else if (score[0] + score[1] === 10) {
                if (!score[2]) {
                    errorMessage.error = 'invalid input, enter score for 3 shots';
                    return res.json(errorMessage);
                }
                frameScore = 10 + score[2];
            } else {
                if (!score[1] && score[1] !== 0) {
                    errorMessage.error = 'invalid input, enter score for 2 shots';
                    return res.json(errorMessage);
                }
                if (score[0] + score[1] > 10) {
                    errorMessage.error = 'invalid input, sum of scores for 2 shots cannot be more than 10';
                    return res.json(errorMessage);
                }
                frameScore = score[0] + score[1];
            }
        } else {
            if (score[0] === 10) {
                frameScore = 10;
            } else {
                if (!score[1] && score[1] !== 0) {
                    errorMessage.error = 'invalid input, enter score for 2 shots';
                    return res.json(errorMessage);
                }
                if (score[0] + score[1] > 10) {
                    errorMessage.error = 'invalid input, sum of scores for 2 shots cannot be more than 10';
                    return res.json(errorMessage);
                }
                frameScore = score[0] + score[1];
            }
        }

        if (playerScores.length > 0 && playerScores.length < 10) {
            const playerLastScore = playerScores.slice(-1)[0];
            if (playerLastScore && playerLastScore[0]) {
                if (playerLastScore[0] === 10) {
                    frameScore *= 2;
                } else if (playerLastScore[1] && (playerLastScore[0] + playerLastScore[1]) === 10) {
                    frameScore += score[0];
                }
            }
        }

        await Player.updateOne({
            game_id: mongoose.Types.ObjectId(req.params.game_id),
            _id: mongoose.Types.ObjectId(req.params.player_id)
        }, {
            $push: {frame_wise: score},
            $inc: {score: frameScore}
        });

        const players = await Player.aggregate([{
            $match: {
                game_id: mongoose.Types.ObjectId(req.params.game_id)
            },
        }, {
            $project: {
                player_id: '$_id',
                score: 1,
                _id: 0
            }
        }]);
        return res.json(players);
    } catch (error) {
        errorMessage.error = error;
        return res.status(500).json(errorMessage);
    }
}

async function getScore(req, res) {
    const players = await Player.aggregate([{
        $match: {
            game_id: mongoose.Types.ObjectId(req.params.game_id),
            _id: mongoose.Types.ObjectId(req.params.player_id)
            }
        },
        {
            $project: {
                frame_wise: 1,
                total_score: '$score',
                _id: 0
            }
        }]);
    return res.json(players);
}

module.exports = {
    registerPlayer,
    playGame,
    getScore
};
