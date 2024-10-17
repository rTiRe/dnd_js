function random_list(list){
    var random = Math.floor(Math.random() * list.length);
    return list[random];
}


function handleFight(player, monster){
    aborter.abort();
    if (Math.random(0, 1) <= player.weapon.attack_chance){
        console.log(`Вы попали!`)
        monster.health -= player.weapon.damage
    }
    else if (monster.health <= 0){
        console.log(`Вы одолели монстра!`)
    }
    else {
        console.log(`Мимо!`)
        console.log(`==== ${monster.name} =====`)
        console.log(random_list(monster.appearance_messages))
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
    }
}

module.exports = handleFight
