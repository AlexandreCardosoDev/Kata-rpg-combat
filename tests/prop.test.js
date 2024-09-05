const Prop = require('../src/prop')
const Char = require('../src/char')

describe('Prop', () => {
  it('creating a tree with 2000 health', () => {
    const tree = new Prop(2000)
    expect(tree.health).toBe(2000)
  })
  it('Props can be destroyed', () => {
    const char = new Char('melee')
    const tree = new Prop(100)
    char.attack(tree)
    expect(tree.health).toBe(0)
    expect(tree.isDestroyed).toBe(true)
  })
})
