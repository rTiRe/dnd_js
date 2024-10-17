let items = require('./items.js');

let monsters = {
    szlachta: {
        name: 'Шляхта',
        damage: 8,
        appearance_messages: [
            'Шляхта приближается!',
            'Стоящий неподалеку шляхта не внушает доверия.',
            'Вы слышите жуткое мычание сзади...',
        ],
        drop: [
            {item: items.old_sword, chance: 0.05},
            {item: items.stick, chance: 0.93},
            {item: items.health_potion, chance: 0.02},
        ],
        drop_chance: 1,
    }
}

module.exports = monsters
