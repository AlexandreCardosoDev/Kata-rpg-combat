class Prop {
  constructor(health){
    this.health = health
  }

  get isDestroyed() {
    return this.health === 0 
  }

  takeDamage(power) {
    this.health = Math.max(0, this.health - power)
  }
}


module.exports = Prop