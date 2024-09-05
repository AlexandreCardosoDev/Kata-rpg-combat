const MAX_HEALTH = 1000
const STARTING_LEVEL = 1
const BASE_POWER = 100
const types = ['melee', 'ranged']

class Char {
  constructor (type, position = 1) {
    if(!types.includes(type)){
      throw new Error("Invalid character type.")
    }

    this.health = MAX_HEALTH
    this.level = STARTING_LEVEL
    this.type = type
    this.position = position
    this.factions = new Set()
  }

  get isAlive() {
    return this.health > 0 
  }

  attack(target) {
    if (target instanceof Char) {
      this.attackChar(target)
    } else {
      this.attackProp(target)
    }
     
  }

  attackChar(target) {
    if (target === this) throw new Error('Cannot deal damage to itself')
    let distance = this.getDistance(target)  
    if (this.type === 'melee' && distance > 2) throw new Error('Melee cannot attack other with a distance above 2 meters')
    if (this.type === 'ranged' && distance > 20) throw new Error('Ranged cannot attack other with a distance above 20 meters')
    if (this.isAllied(target)) throw new Error('Cannot attack an ally')
    let power = this.getPower(target)
    target.health = Math.max(0, target.health - power)
  }

  attackProp(target) {
    target.takeDamage(BASE_POWER)
  }


  heal(target = null) {
    if (target === null) target = this
    if (!(target instanceof Char)) throw new Error('Cannot heal props')
    if (target !== this && !this.isAllied(target)) throw new Error('Cannot heal others')
    if (!target.isAlive) return
    target.health = Math.min(1000, target.health + 100) 
  }

  getPower(target) {
    let modifier = 1
    if (target.level - this.level >= 5) modifier = 0.5
    if (this.level - target.level >= 5) modifier = 1.5
    return modifier * BASE_POWER 
  }

  getDistance(target){
    return Math.abs(this.position - target.position)
  }
  
  levelUp() {
    this.level += 1
  }

  joinFaction(faction) {
    this.factions.add(faction)
  }

  leaveFaction(faction) {
    this.factions.delete(faction)
  }

  isAllied(target) {
    return [...this.factions].some(faction => target.factions.has(faction))
  }

  
}


module.exports = Char