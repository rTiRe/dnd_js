var player = require(`./player.js`)
var rl = require(`./reader.js`)


function add_item(item) {
    if (player.inventory.length >= 10) {
        console.log(`Инвентарь переполнен. Вы не можете добавить этот предмет.`)
        return
    }
    player.inventory.push(item)
}


function show_item(index) {
    let item = player.inventory[index]
    console.log(`${item.name}`)
    console.log(`0. Назад`)
    console.log(`1. Использовать`)
    console.log(`2. Выбросить`)
    rl.question(`\n>>> Ваш выбор: `, (answer) => {
        if (answer == '0') {
            show_inventory()
        }
        else if (answer == '1') {
            if (item.type == 'potion') {
                item.event(player)
            }
            else if (item.type == 'weapon') {
                player.inventory[index] = player.weapon
                player.weapon = item
            }
            show_inventory()
        }
        else if (answer == '2') {
            player.inventory.splice(index, 1)
            console.log(`Вы выбросили ${item.name}`)
            show_inventory()
        }
        else {
            console.log(`Неверный выбор. Попробуйте снова.`)
        }
    })
}


function show_inventory() {
    console.log(`0. Выйти`)
    for (let i = 0; i < player.inventory.length; i++) {
        console.log(`[${i+1}] ${player.inventory[i].name}`)
    }
    rl.question(`\n>>> Выберите предмет для использования: `, (answer) => {
        if (answer == '0') {
            return
        }
        else {
            let index = parseInt(answer) - 1
            if (index >= 0 && index < player.inventory.length) {
                show_item()
            }
            else {
                console.log(`Неверный выбор. Попробуйте снова.`);
            }
        }
    })
}

module.exports = {
    add_item: add_item,
    show_inventory: show_inventory,
    show_item: show_item,
}
