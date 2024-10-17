let monsters = require(`./monsters.js`)

let locations = {
    start: {
        name: `Подземное плато`,
        description: `Луч света пробивается сквозь слой камня... Подземный тунель уходит вглубь...`,
        choices: [
            {text: `Исследовать`, next: `explore`, max_usages: 24, usages: 0},
            {text: `Карабкаться по стенам`, next: `light_forest`, max_usages: 9, usages: 0},
            {text: `Остаться на месте`, next: `stay`, max_usages: 12, usages: 0},
            {text: `Идти вглубь`, next: `tunnel`},
        ],
        explores: {number: 0},
    },
    tunnel: {
        name: `Подземный тунель`,
        description: `Из глубин подземелья доносится зловещий скрежет. У вас плохое предчувствие.`,
        choices: [
            {text: `Исследовать`, next: `explore`, max_usages: 1, usages: 0},
            {text: `Вернуться обратно`, next: `start`},
            {text: `Идти вглубь`, next: `old_mineshaft`},
        ],
        explores: {number: 0},
        monsters: [
            {monster: monsters.szlachta, chance: 1},
        ],
        monster_spawn_chance: 0.3,
    },
    old_mineshaft: {
        name: `Старая шахта`,
        description: `Спускаясь все глубже вы наткнулись на страую шахту. В надежде, что рельсы выведут вас отсюда, вы наполяетесь решимостью!`,
        choices: [
            {text: `Исследовать`, next: `explore`, max_usages: 3, usages: 0},
            {text: `Вернуться обратно`, next: `tunnel`},
            {text: `Воспользоваться вагонеткой`, next: `minecart`, min_explores: 1},
            {text: `Тянуть рычаг`, next: `old_mineshaft_2`, min_explores: 2, max_usages: 1, usages: 0},
            {text: `Идти вглубь`, next: `old_mineshaft_3`, min_explores: 3},
        ],
        explores: {number: 0},
    },
    old_mineshaft_2: {
        name: `Старая шахта`,
        description: `Вы слышите, что привели в движение какой-то механизм...`,
        choices: [],
        explores: {},
    },
    old_mineshaft_3: {
        name: `Старая шахта`,
        description: `Вы слышите, что привели в движение какой-то механизм...`,
        choices: [],
        explores: {},
    },
    minecart: {
        name: `Американские горки!?`,
        description: `Несясь на старой вагонетке по не менее старым путям в шахте, вы осознаете, что прочность этих конструкций уже не та...`,
        end: true,
    },
    minecraft: {
        name: `Ааа, где я, кажется я в мире Майнкрафта, похоже на то!`,
        description: `Вы теперь Michael Schuma... Socks, а мир Майнкрафта оказался в мирном режиме, короче Гаме Овер`,
        end: true,
    },
    light_forest: {
        name: `Лесная опушка`,
        description: `Вы вышли на Лесную опушку. Солнышко, птички, красота...`,
        choices: [
            {text: `Исследовать`, next: `explore`, max_usages: 1, usages: 0},
            {text: `Вернуться обратно`, next: `start`},
            {text: `Идти вглубь`, next: `forest`},
            {text: `Отдохнуть`, max_usages: 3, usages: 0, event: (player) => {player.health += 10; console.log(`Вы отдохнули и получили +10hp`)}, next: `light_forest`}
        ],
        explores: {number: 0},
    },
    forest: {
        name: `Лес`,
        description: `Вы зашли в лес, это место выглядит достаточно спокойно`,
        choices: [
            {text: `Исследовать`, next: `explore`, max_usages: 1, usages: 0},
            {text: `Вернуться обратно`, next: `light_forest`},
            {text: `Идти вглубь`, next: `old_mineshaft`},
            {text: `Подобрать подозрительный гриб`, max_usages: 1, usages: 0, event: (player) => {player.health += Math.random(-5, 5); console.log(`Вы скушали гриб, но у него был странный вкус... На вашем месте я бы проверил запас HP`)}, next: `forest`}
        ],
        explores: {number: 0},
    },
    dark_forest: {
        name: `Темный Лес`,
        description: `Вы зашли в глубь леса, уверены что здесь безопасно?`,
        choices: [
            {text: `Исследовать`, next: `explore`, max_usages: 1, usages: 0},
            {text: `Вернуться обратно`, next: `forest`},
            {text: `Идти вглубь`, next: `deep_dark_forest`},
            {text: `Подобрать подозрительный гриб`, max_usages: 1, usages: 0, event: (player) => {player.health += Math.random(-5, 5); console.log(`Вы скушали гриб, но у него был странный вкус... На вашем месте я бы проверил запас HP`)}, next: `forest`}
        ],
        explores: {number: 0},
    },
    deep_dark_forest: {
        name: `Оооочень темный и дремучий лес`,
        description: `Кажется пора возвращаться обратно...`,
        choices: [
            {text: `Исследовать`, next: `explore`, max_usages: 1, usages: 0},
            {text: `Вернуться обратно`, next: `dark_forest`},
            {text: `Идти вглубь`, next: `weird_portal`, min_explores: 10},
        ],
        explores: {number: 0},
    },
    weird_portal: {
        name: `Обветший обсидиановый портал`,
        description: `Старый обсидиановый портал... Интересно куда же он ведет?`,
        choices: [
            {text: `Прикоснуться`, event: () => {console.log(`Ооойой куда же меня несеееет`)}, next: `minecraft`},
            {text: `Вернуться обратно`, next: `deep_dark_forest`},
        ]
    }
}
locations.old_mineshaft_2.choices = locations.old_mineshaft.choices
locations.old_mineshaft_2.explores = locations.old_mineshaft.explores

module.exports = locations