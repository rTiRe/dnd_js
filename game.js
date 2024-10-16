var player = require(`./player.js`)
var locations = require(`./locations.js`)
var spawner = require(`./spawner.js`)
var rl = require(`./reader.js`)

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



function startGame() {
    console.log(`Добро пожаловать в игру!`);
    displayLocation(player.location);
}

startGame()
spawner(player)
