const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GameSchema = new mongoose.Schema({
    name: {
        type: String,
    }
}, {
    versionKey: false
});


module.exports = mongoose.model('games', GameSchema);
