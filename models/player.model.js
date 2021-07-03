const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlayerSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    game_id: {
        type: Schema.Types.ObjectId
    },
    score: {
        type: Number,
        default: 0
    },
    frame_wise: {
        type: [Array]
    }
}, {
    versionKey: false
});


module.exports = mongoose.model('players', PlayerSchema);
