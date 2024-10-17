let items = {
    old_sword: {
        type: 'weapon',
        name: 'Меч',
        description: 'Старый потрепаный меч',
        damage: 5,
        success_chance: 0.8,
    },
    sword: {
        type: 'weapon',
        name: 'Меч',
        description: 'Блестит...',
        damage: 8,
        success_chance: 0.8,
    },
    old_axe: {
        type: 'weapon',
        name: 'Топор',
        description: 'Разваливающийся топор',
        damage: 9,
        success_chance: 0.3,
    },
    axe: {
        type: 'weapon',
        name: 'Топор',
        description: 'Такие новые топоры с одного удара деревья рубят.',
        damage: 15,
        success_chance: 0.3,
    },
    stick: {
        type: 'weapon',
        name: 'Палка',
        description: 'Палочка-выручалочка.',
        damage: 3,
        success_chance: 1,
    },
    hammer: {
        type: 'weapon',
        name: 'Молот',
        description: 'Молот, но не тора.',
        damage: 13,
        success_chance: 0.5,
    },
    health_potion: {
        type: 'potion',
        name: 'Зелье здоровья',
        description: 'Восстанавливает 50 едениц здоровья за 100 секунд.', 
        event: (player) => { for (let i = 0; i < 100; i++) { new Promise(resolve => { setTimeout(() => { player.health += 0.5 }, 1000); resolve() }) } },
    },
    boosted_health_potion: {
        type: 'potion',
        name: 'Зелье здоровья',
        description: 'Восстанавливает 50 едениц здоровья моментально',
        event: (player) => { player.health += 50 }
    },
    super_health_potion: {
        type: 'potion',
        name: 'Зелье здоровья',
        description: 'Восстанавливает все здоровье',
        event: (player) => { player.health = 100 }
    },
    power_potion: {
        type: 'potion',
        name: 'Зелье силы',
        description: 'Увеличивает урон на 30% на 60 секунд.',
        event: (player) => {
            let damage = player.weapon.damage
            player.weapon.damage = damage * 1.3
            setTimeout(() => {
                player.weapon.damage = damage
            }, 60000)
        }
    },
}

module.exports = items
