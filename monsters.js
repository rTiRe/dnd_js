let items = require('./items.js');

let monsters = {
    szlachta: {
        name: 'Шляхта',
        health: 5,
        damage: 5,
        attack_chance: 0.8,
        appearance_messages: [
            'Шляхта приближается!',
            'Стоящий неподалеку шляхта не внушает доверия.',
            'Вы слышите жуткое мычание сзади...',
        ],
        success_attack_messages: [
            'Щляхта делает кусь за жопу.',
            'Шляха плюется.',
            'Живот шляхты урчит и пугает вас...',
        ],
        miss_attack_messages: [
            'Шляхта промахивается.',
            'Шляхта отпрыгнул.',
            'Шляхта упал на землю.',
        ],
        drop: [
            {item: items.old_sword, chance: 0.05},
            {item: items.stick, chance: 0.93},
            {item: items.health_potion, chance: 0.02},
        ],
        drop_chance: 0.3,
    },
    sceleton: {
        name: 'Скелет',
        health: 10,
        damage: 8,
        attack_chance: 0.7,
        appearance_messages: [
            'Скелет приближается!',
            'Груда костей внезапно собралаась во что-то единое!',
            'Жуткий череп вдруг появляется перед вами...',
        ],
        success_attack_messages: [
            'Скелет делает кусь за жопу.',
            'Скелет кидает в вас кость.',
            'Громыхание костей пугает вас...',
        ],
        miss_attack_messages: [
            'Скелет промахивается.',
            'Скелет рассыпался.',
            'Скелет упал на землю.',
        ],
        drop: [
            {item: items.sword, chance: 0.25},
            {item: items.stick, chance: 0.7},
            {item: items.health_potion, chance: 0.05},
        ],
        drop_chance: 0.35,
    },
    spider: {
        name: 'Паук',
        health: 15,
        damage: 12,
        attack_chance: 0.5,
        appearance_messages: [
            'Паук приближается!',
            'Огромный паук неподалеку с интересом разглядывает вас.',
            'К ваше руке прилипает огромная паутина!',
        ],
        success_attack_messages: [
            'Паук делает кусь за жопу.',
            'Паук стреляет вам в глаза паутиной',
            'Злобное постукивание хелицер приводит вас в ужас.',
        ],
        miss_attack_messages: [
            'Паук промахивается.',
            'Паук отвлекается.',
            'Паук упал на землю.',
        ],
        drop: [
            {item: items.axe, chance: 0.15},
            {item: items.stick, chance: 0.8},
            {item: items.health_potion, chance: 0.05},
        ],
        drop_chance: 0.4,
    }
}

module.exports = monsters
