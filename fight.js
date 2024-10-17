let inventory = require(`./inventory.js`)
const readline = require(`readline`)

function random_list(list){
    var random = Math.floor(Math.random() * list.length);
    return list[random];
}

function getRandomDrop(dropList) {
    let rnd = Math.random()
    let cumulativeChance = 0
    for (var i = 0; i < dropList.length; i++) {
        cumulativeChance += dropList[i].chance
        if (rnd < cumulativeChance) return dropList[i].item
    }
    return false
}


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

function handleFight(player, monster){
    aborter.abort();
    console.log(`==== ${monster.name} =====`)
    console.log(random_list(monster.appearance_messages))
    while (player.health > 0 || monster.health > 0){
        if (player.health <= 0){
            console.log(`Гаме овер!`)
            break
        }
        if (monster.health <= 0){
            break
        }
        if (Math.random(0, 1) >= monster.attack_chance) {
            player.health -= monster.damage
            msg = random_list(monster.success_attack_messages)
            console.log(msg)
        }
        else {
            player.health -= monster.damage
            msg = random_list(monster.miss_attack_messages)
            console.log(msg)
        }
        console.log(`Ваша очередь!`)
        console.log(`Что делать? (1 - атаковать, 0 - открыть инвентарь)`)
        rl.question(`\n>>> Ваш выбор: `, { signal: aborter.signal }, (answer) => {
            if (answer == '0') {
                if (Math.random(0, 1) <= player.weapon.attack_chance){
                    console.log(`Вы попали!`)
                    monster.health -= player.weapon.damage
                }
                else if (monster.health <= 0){
                    console.log(`Вы одолели монстра!`)
                    if (Math.random(0, 1) > monster.drop_chance){
                        dropped = getRandomDrop(monster.drop)
                        console.log(`Вам выпало - `, dropped.item)
                        player.addItem(dropped)
                    }
                    else {
                        console.log(`Ничего не выпало, печалька(`)
                    }
                    player.addItem()
                }
                else {
                    console.log(`Мимо!`)
                }
            }
            else if (answer == '1') {
                inventory.show_inventory()
            }
        })
    }
}

module.exports = handleFight
