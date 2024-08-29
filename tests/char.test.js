const Char = require('../src/char')

describe('Char', () => {
  let charA
  let charB
  
  beforeEach(() => {
    charA = new Char()
    charB = new Char()
  })

  describe('All Characters when created, have ...', () => {
    it('Health, starting at 1000', () => {
      expect(charA.health).toBe(1000)
    })
    it('Level, starting at 1', () => {
      let char = new Char()
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

    describe('A Character can Heal a Character', () => {
      it('Dead characters cannot be healed', () => {
        repeat(() => charA.attack(charB), 10)
        charA.heal(charB)
        expect(charB.health).toBe(0)
        expect(charB.isAlive).toBe(false)
      })
      it('Healing cannot raise health above 1000', () => {
        repeat(() => charA.heal(charB), 10)
        expect(charB.health).toBe(1000)
      })
    })
    
  })

  function repeat(action, times) {
    for (let i = 0; i < times; i++) {
      action()      
    }
  }

})
