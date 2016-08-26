var expect = require('chai').expect
var Cell = require('../src/scripts/cell').default

describe('Cell', () => {
  describe('#id', () => {
    it('returns a formatted string', (done) => {
      var cell = new Cell(1, 2)
      expect(cell.id).to.equal('x1y2')
      done()
    })
  })

  describe('#getPossibleValues', () => {
    it('returns an array of 1 to 9 when the cell is new', (done) => {
      var cell = new Cell(1, 2)
      expect(cell.getPossibleValues()).to.deep.equal([1, 2, 3, 4, 5, 6, 7, 8, 9])
      done()
    })

    it('is missing any numbers that have been called by #remove', (done) => {
      var cell = new Cell(1, 2)
      cell.remove(1)
      cell.remove(2)
      cell.remove(3)
      expect(cell.getPossibleValues()).to.deep.equal([4, 5, 6, 7, 8, 9])
      done()
    })

    it('returns false when the cell has been solved', (done) => {
      var cell = new Cell(1, 2)
      cell.solve(8)
      expect(cell.getPossibleValues()).to.equal(false)
      done()
    })
  })

  describe('#solve', () => {
    it('returns an object the first time it\'s called', (done) => {
      var cell = new Cell(1, 2)
      var solveOutput = cell.solve(3)
      expect(solveOutput.id).to.equal('x1y2')
      expect(solveOutput.value).to.equal(3)
      expect(solveOutput.action).to.equal('userSolved')
      done()
    })

    it('returns undefined after the first time it\'s called', (done) => {
      var cell = new Cell(1, 2)
      cell.solve(3)
      expect(cell.solve(3)).to.equal(undefined)
      expect(cell.solve(4)).to.equal(undefined)
      done()
    })

    it('returns an object if called on a cell that\'s been passively solved', (done) => {
      var cell = new Cell(1, 2)
      for (var i = 1; i < 9; i++) {
        cell.remove(i)
      }
      var solveOutput = cell.solve(9)
      expect(solveOutput.id).to.equal('x1y2')
      expect(solveOutput.value).to.equal(9)
      expect(solveOutput.action).to.equal('userSolved')
      done()
    })
  })

  describe('#remove', () => {
    it('returns an object the first time it\'s called with a given value', (done) => {
      var cell = new Cell(1, 2)
      var removeOutputOne = cell.remove(1)
      var removeOutputTwo = cell.remove(2)
      expect(removeOutputOne.id).to.equal('x1y2')
      expect(removeOutputOne.value).to.equal(1)
      expect(removeOutputOne.action).to.equal('removed')
      expect(removeOutputTwo.id).to.equal('x1y2')
      expect(removeOutputTwo.value).to.equal(2)
      expect(removeOutputTwo.action).to.equal('removed')
      done()
    })

    it('returns undefined after the first time it\'s called with a given value', (done) => {
      var cell = new Cell(1, 2)
      cell.remove(1)
      expect(cell.remove(1)).to.equal(undefined)
      cell.remove(2)
      expect(cell.remove(2)).to.equal(undefined)
      done()
    })

    it('returns undefined if the cell has had #solve called on it', (done) => {
      var cell = new Cell(1, 2)
      cell.solve(1)
      expect(cell.remove(1)).to.equal(undefined)
      expect(cell.remove(9)).to.equal(undefined)
      done()
    })

    it('returns undefined if all but one number has been removed', (done) => {
      var cell = new Cell(1, 2)
      for (var i = 1; i < 9; i++) {
        cell.remove(i)
      }
      expect(cell.remove(9)).to.equal(undefined)
      done()
    })
  })

  describe('#isSolved', () => {
    it('returns false when the cell is new', (done) => {
      var cell = new Cell(1, 2)
      expect(cell.isSolved()).to.equal(false)
      done()
    })

    it('returns the solution after #solve has been called', (done) => {
      var cell = new Cell(1, 2)
      cell.solve(7)
      expect(cell.isSolved()).to.equal(7)
      done()
    })

    it('returns false if less that eight numbers have been removed', (done) => {
      var cell = new Cell(1, 2)
      for (var i = 1; i < 8; i++) {
        cell.remove(i)
      }
      expect(cell.isSolved()).to.equal(false)
      done()
    })

    it('returns the remaining numebr if eight numbers have been removed', (done) => {
      var cell = new Cell(1, 2)
      for (var i = 1; i < 9; i++) {
        cell.remove(i)
      }
      expect(cell.isSolved()).to.equal(9)
      done()
    })
  })

  describe('#touchedByUser', () => {
    it('returns false on a new cell', (done) => {
      var cell = new Cell(1, 2)
      expect(cell.touchedByUser()).to.equal(false)
      done()
    })
    it('returns false after #remove is called', (done) => {
      var cell = new Cell(1, 2)
      cell.remove(4)
      expect(cell.touchedByUser()).to.equal(false)
      done()
    })

    it('returns true after #solve is called', (done) => {
      var cell = new Cell(1, 2)
      cell.solve(8)
      expect(cell.touchedByUser()).to.equal(true)
      done()
    })

    it('returns false if the cell has been passively solved with 8 #remove calls', (done) => {
      var cell = new Cell(1, 2)
      for (var i = 1; i < 9; i++) {
        cell.remove(i)
      }
      expect(cell.touchedByUser()).to.equal(false)
      done()
    })
  })
})
