let player = require(`./player.js`)
let locations = require(`./locations.js`)
let fight = require(`./fight.js`)


function checkFight(player) {
    if (player.fight) return true
    else return false
}


function getRandomMonster(monsterList) {
    
}


function getRandomMonster() {
    let location = locations[player.location]
    if (location.monster_spawn_chance <= Math.random()) {
        let monsters = location.monsters
        let rnd = Math.random()
        let monster = null
        let cumulativeChance = 0
        for (var i = 0; i < monsters.length; i++) {
            cumulativeChance += monsters[i].chance
            if (rnd < cumulativeChance) {
                monster = monsters[i].monster
            }
        }
        if (monster) {
            return Object.assign({}, monster)
        }
    }
}


function spawnMonster(player) {
    new Promise(resolve => {
        setInterval(() => {
            if (checkFight(player)) {
                return
            }
            let monster = getRandomMonster()
            player.fight = monster
            fight(player, Object.assign({}, monster))
        },
        1000
        )
        resolve()
    })
}

module.exports = spawnMonster