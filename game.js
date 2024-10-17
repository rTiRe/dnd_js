var player = require(`./player.js`)
var locations = require(`./locations.js`)
const readline = require(`readline`)

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

function displayLocation(locationKey) {
    const location = locations[locationKey];
    console.log(`\n=== ${location.name} ===`);
    console.log(location.description);
    if (location.end) {
        console.log(`Конец игры!`);
        process.exit(0);
    }
    location.choices.forEach((choice, index) => {
        if ((!choice.min_explores || location.explores.number >= choice.min_explores) &&
            (!choice.max_usages || choice.usages < choice.max_usages)) {
            console.log(`${index + 1}. ${choice.text}`);
        }
    });
    const aborter = new AbortController();
    rl.question(`\n>>> Ваш выбор: `, { signal: aborter.signal }, (answer) => {
        handleChoice(locationKey, parseInt(answer) - 1);
    });
}

function handleChoice(locationKey, choiceIndex) {
    const location = locations[locationKey];
    const choice = location.choices[choiceIndex];

    if (!choice) {
        console.log(`Неверный выбор. Попробуйте снова.`);
        return displayLocation(locationKey);
    }

    if (choice.max_usages && choice.usages >= choice.max_usages) {
        console.log(`Вы не можете выполнить это действие.`);
        return displayLocation(locationKey);
    }

    choice.usages = (choice.usages || 0) + 1;

    if (choice.next === 'explore') {
        location.explores.number++;
        console.log(`Вы исследовали локацию! Исследования: ${location.explores.number}`);
        displayLocation(locationKey)
    }
    else if (choice.event) {
        choice.event(player);
    }
    else {
        player.location = choice.next || player.location;
        displayLocation(player.location);
    }
}

function handleFight(player, monster){
    if (Math.random(0, 1) === 1){
        console.log(`Вам повезло! Вы атакуете первым!`)
        if (Math.random(0, 100) >= monster.agility){
            console.log(`Вы попали!`)
            monster.health -= player.damage
        }
        else if (monster.health <= 0){
            console.log(`Вы одолели монстра!`)
        }
        else {
            console.log(`Мимо!`)
        }
    }
}

function startGame() {
    console.log(`Добро пожаловать в игру!`);
    displayLocation(player.location);
}

startGame();
