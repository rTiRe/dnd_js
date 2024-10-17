function random_list(list){
    var random = Math.floor(Math.random() * list.length);
    return list[random];
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

function handleFight(player, monster){
    aborter.abort();
    while (player.health > 0 || monster.health > 0){
        console.log(`==== ${monster.name} =====`)
        console.log(random_list(monster.appearance_messages))
        console.log(`Что делать? (1 - атаковать, 0 - открыть инвентарь)`)
        if (rl.question(`\n>>> Ваш выбор: `, { signal: aborter.signal }, (answer) => {}) === 0)
        {
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
            if (Math.random(0, 1) <= player.weapon.attack_chance){
                console.log(`Вы попали!`)
                monster.health -= player.weapon.damage
            }
            else if (monster.health <= 0){
                console.log(`Вы одолели монстра!`)
                break
            }
            else if (player.health <= 0){
                console.log(`Гаме овер!`)
                break
            }
            else {
                console.log(`Мимо!`)
            }
        }
        else {
            //
        }
    }
}

module.exports = handleFight
