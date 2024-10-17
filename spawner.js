let monsters = require(`./monsters.js`)


function checkFight(player) {
    if (player.fight) return true
    else return false
}


function getRandomMonster() {
    let keys = Object.keys(monsters)
    return Object.assign({}, monsters[keys[ keys.length * Math.random() << 0 ]])
}


function spawnMonster(player) {
    new Promise(resolve => {
        setInterval(() => {
            if (checkFight(player)) {
                return
            }
            let monster = getRandomMonster()
            player.fight = monster
            console.log(`\n=== Монстр ${monster.name} ===`)
        },
        1000
    )
        resolve()
    })
}

module.exports = spawnMonster