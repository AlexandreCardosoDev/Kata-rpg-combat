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

 

})
