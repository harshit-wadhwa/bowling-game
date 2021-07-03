const rules = {
    'players-registration': {
        game_id: 'required|alpha_num',
        players: 'required|array',
        'players.*': 'alpha_dash'
    },
    'play-game': {
        score: 'required|array',
        'score.*': 'numeric'
    }
};

module.exports = rules;