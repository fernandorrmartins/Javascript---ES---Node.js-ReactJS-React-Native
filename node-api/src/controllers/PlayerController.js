const mongoose = require('mongoose');

const Player = mongoose.model('Player');

// Player.create({
//     name: 'Henrique Martins',
//     level: 100,
// });

module.exports = {
    async index(req, res) {
        const players = await Player.find();

        return res.json(players);
    },

    async store(req, res) {
        const player = await Player.create(req.body);

        return res.json(player);
    },
};