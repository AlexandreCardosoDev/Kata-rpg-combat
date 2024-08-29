class Char {
  

  constructor () {
    this.health = 1000
    this.level = 1
  }

  get isAlive() {
    return this.health > 0 
  }
  attack(target) {
    let damage = 100
    target.health = Math.max(0, target.health - damage) 
  }

  heal(target) {
    if (!target.isAlive) return
    target.health = Math.min(1000, target.health + 100) 
  }
}


module.exports = Char