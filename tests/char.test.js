const Char = require('../src/char')

describe('Char', () => {
  describe('All Characters when created, have ...', () => {
    it('Health, starting at 1000', () => {
      let char = new Char()
      expect(char.health).toBe(1000)
    })
    it('Level, starting at 1', () => {
      let char = new Char()
      expect(char.level).toBe(1)
    })
    it('starting status Alive', () => {
      let char = new Char()
      expect(char.isAlive).toBe(true)
    })
  })

  describe('Characters can Deal Damage to Characters', () => {
    it('Damage is subtracted from Health', () => {
      let charA = new Char()
      let charB = new Char()

      charA.attack(charB)

      expect(charB.health).toBe(900)
    })
    it('When damage received exceeds current Health, Health becomes 0 and the character dies', () => {
      let charA = new Char()
      let charB = new Char()

      repeat(() => charA.attack(charB), 10)

      expect(charB.health).toBe(0)
      expect(charB.isAlive).toBe(false)
    })

    describe('A Character can Heal a Character', () => {
      it('Dead characters cannot be healed', () => {
        let charA = new Char()
        let charB = new Char()
        repeat(() => charA.attack(charB), 10)
        charA.heal(charB)
        expect(charB.health).toBe(0)
        expect(charB.isAlive).toBe(false)
      })
      it('Healing cannot raise health above 1000', () => {
        let charA = new Char()
        let charB = new Char()
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
