const Char = require('../src/char')

describe('Char', () => {
  let charA
  let charB
  
  beforeEach(() => {
    charA = new Char('melee')
    charB = new Char('melee')
  })

  describe('All Characters when created, have ...', () => {
    it('Health, starting at 1000', () => {
      expect(charA.health).toBe(1000)
    })
    it('Level, starting at 1', () => {
      expect(charA.level).toBe(1)
    })
    it('starting status Alive', () => {
      expect(charA.isAlive).toBe(true)
    })
  })

  describe('Characters can Deal Damage to Characters', () => {
    it('Damage is subtracted from Health', () => {
      charA.attack(charB)

      expect(charB.health).toBe(900)
    })
    it('When damage received exceeds current Health, Health becomes 0 and the character dies', () => {
      repeat(() => charA.attack(charB), 10)

      expect(charB.health).toBe(0)
      expect(charB.isAlive).toBe(false)
    })
    it('A Character cannot Deal Damage to itself', () => {
      expect(() => charA.attack(charA)).toThrow()
    })
    it('If the target is 5 or more Levels above the attacker, Damage is reduced by 50%', () => {
      repeat(() => charA.levelUp(), 5)
      charB.attack(charA)

      expect(charA.level).toBe(6)
      expect(charB.level).toBe(1)
      expect(charA.health).toBe(950)
    })
    it('If the target is 5 or more Levels below the attacker, Damage is increased by 50%', () => {
      repeat(() => charA.levelUp(), 5)
      charA.attack(charB)

      expect(charA.level).toBe(6)
      expect(charB.level).toBe(1)
      expect(charB.health).toBe(850)
    })
    it('melee fighters cannot attack with target is more than 2 meters', () => {
      charA = new Char('melee', 1)
      charB = new Char('melee', 4)

      expect(() => charA.attack(charB)).toThrow()
    })
    it('ranged fighters cannot attack with target is more than 20 meters', () => {
      charA = new Char('ranged', 1)
      charB = new Char('melee', 22)

      expect(() => charA.attack(charB)).toThrow()
    })

    it('Allies cannot Deal Damage to one another', () => {
      charA.joinFaction('fac_1')
      charB.joinFaction('fac_1')
      expect(() => charA.attack(charB)).toThrow()
    })
  })

  describe('A Character can Heal a Character', () => {
    it('Dead characters cannot be healed', () => {
      repeat(() => charA.attack(charB), 10)
      charB.heal(charB)
      expect(charB.health).toBe(0)
      expect(charB.isAlive).toBe(false)
    })
    it('Healing cannot raise health above 1000', () => {
      repeat(() => charA.heal(charA), 10)
      expect(charA.health).toBe(1000)
    })
    it('A Character can Heal itself.', () => {
      charB.attack(charA)
      charA.heal()
      expect(charA.health).toBe(1000)
    })
    it('A Character cannot Heal others.', () => {
      expect(() => charA.heal(charB)).toThrow()
    })
    it('A Character can Heal Allies.', () => {
      charA.attack(charB)
      charA.joinFaction('fac_1')
      charB.joinFaction('fac_1')
      charA.heal(charB)
      expect(charB.health).toBe(1000)
    })
  })
  
  describe('A Character can belong to one or more Factions', () => {
    it("Newly characters don't have factions", () => {
      expect(charA.factions.size).toBe(0)
    })

    it("Characters can join factions", () => {
      charA.joinFaction('fac_1')
      charA.joinFaction('fac_1')
      expect(charA.factions.size).toBe(1)
      charA.joinFaction('fac_2')
    })

    it("Characters can join one or more factions", () => {
      charA.joinFaction('fac_1')
      charA.joinFaction('fac_2')
      expect(charA.factions.size).toBe(2)
    })

    it("Characters can join one or leave factions", () => {
      charA.joinFaction('fac_1')
      charA.joinFaction('fac_2')
      charA.leaveFaction('fac_2')
      expect(charA.factions.size).toBe(1)
    })

    it("Characters can be allies if both are in the same faction", () => {
      charA.joinFaction('fac_1')
      charB.joinFaction('fac_1')
      expect(charA.isAllied(charB)).toBe(true)
    })

    it("Characters are enemies if both are in different faction", () => {
      charA.joinFaction('fac_1')
      charB.joinFaction('fac_2')
      expect(charA.isAllied(charB)).toBe(false)
    })

    
  })
  

  function repeat(action, times) {
    for (let i = 0; i < times; i++) {
      action()      
    }
  }

})
