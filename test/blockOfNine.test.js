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
  describe('#isSolved', () => {
    it('is false when created', (done) => {
      var cells = nineNewCells()
      var block = new BlockOfNine(cells)
      expect(block.isSolved()).to.equal(false)
    })
  })

  describe('unfoundValues', () => {
    it('is full upon creation', (done) => {
      var cells = nineNewCells()
      var block = new BlockOfNine(cells)
      expect(block.unfoundValues()).to.deep.equal([1, 2, 3, 4, 5, 6, 7, 8, 9])
      done()
    })

    it('is missing the values that have been solved', (done) => {
      var cells = nineNewCells()
      var block = new BlockOfNine(cells)
      cells[0].solve(1)
      cells[1].solve(2)
      cells[2].solve(3)
      expect(block.unfoundValues()).to.deep.equal([4, 5, 6, 7, 8, 9])
      done()
    })

    it('is empty when all cells have been solved', (done) => {
      var cells = nineNewCells()
      var block = new BlockOfNine(cells)
      for (var i = 0; i < 9; i++) {
        cells[i].solve(i+1)
      }
      expect(block.unfoundValues()).to.deep.equal([])
      done()
    })
  })

  describe('foundValues', () => {
    it('is empty upon creation', (done) => {
      var cells = nineNewCells()
      var block = new BlockOfNine(cells)
      expect(block.foundValues()).to.deep.equal([])
      done()
    })

    it('contains the values of cells that have been solved', (done) => {
      var cells = nineNewCells()
      var block = new BlockOfNine(cells)
      cells[0].solve(1)
      cells[1].solve(2)
      cells[2].solve(3)
      expect(block.foundValues()).to.deep.equal([1, 2, 3])
      done()
    })
  })
})
