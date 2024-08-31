const MAX_HEALTH = 1000
const STARTING_LEVEL = 1
const BASE_POWER = 100

class Char {
  constructor () {
    this.health = MAX_HEALTH
    this.level = STARTING_LEVEL
  }

  get isAlive() {
    return this.health > 0 
  }
  attack(target) {
    if (target === this) throw new Error('Cannot deal damage to itself')
    let power = this.getPower(target)
    target.health = Math.max(0, target.health - power) 
  }

  heal(target) {
    if (target !== this) throw new Error('Cannot heal others')
    if (!target.isAlive) return
    target.health = Math.min(1000, target.health + 100) 
  }

  getPower(target) {
    let modifier = 1
    if (target.level - this.level >= 5) modifier = 0.5
    if (this.level - target.level >= 5) modifier = 1.5
    return modifier * BASE_POWER 
  }
  
  levelUp() {
    this.level += 1
  }

  
}


module.exports = Char