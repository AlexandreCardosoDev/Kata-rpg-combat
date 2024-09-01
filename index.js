const Char = require('./src/char')

let charA = new Char('melee')
let charB = new Char('melee')


charA.attack(charB)
charA.joinFaction('fac_1')
charB.joinFaction('fac_1')
charA.heal(charB)