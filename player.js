let items = require('./items.js')

module.exports = {
    name: 'Player',
    health: 100,
    inventory: [],
    location: 'start',
    weapon: items.stick,
    fight: null,
}
