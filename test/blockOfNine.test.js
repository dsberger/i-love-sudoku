var expect = require('chai').expect
var Cell = require('../src/scripts/cell').default
var BlockOfNine = require('../src/scripts/blockOfNine').default

function nineNewCells () {
  var collection = []
  for (var i = 0; i < 9; i++) {
    collection.push(new Cell(0, i))
  }
  return collection
}

describe('BlockOfNine', () => {
  describe('hit', () => {
    it('returns an array', (done) => {
      var blockOfNine = new BlockOfNine(nineNewCells())
      expect(blockOfNine.hit()).to.be.a('array')
      done()
    })

    it('returns eight actions if one cell has been actively solved', (done) => {
      var cells = nineNewCells()
      var blockOfNine = new BlockOfNine(cells)
      cells[0].solve(1)
      var actions = blockOfNine.hit()
      expect(actions.length).to.equal(8)
      expect(actions[0].action).to.equal('removed')
      expect(actions[0].value).to.equal(1)
      done()
    })

    it('returns one action if one cell has been passively solved by being the last of its value', (done) => {
      var cells = nineNewCells()
      var blockOfNine = new BlockOfNine(cells)

      for (var i = 0; i < 8; i++) {
        cells[i].remove(4)
      }

      var actions = blockOfNine.hit()
      expect(actions.length).to.equal(1)
      expect(actions[0].action).to.equal('appSolved')
      expect(actions[0].value).to.equal(4)
      done()
    })
  })
})
