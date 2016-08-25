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

  describe('#solve', () => {
    it('returns true the first time it\'s called', (done) => {
      var cell = new Cell(1, 2)
      expect(cell.solve(3)).to.equal(true)
      done()
    })

    it('returns false after the first time it\'s called', (done) => {
      var cell = new Cell(1, 2)
      cell.solve(3)
      expect(cell.solve(3)).to.equal(false)
      expect(cell.solve(4)).to.equal(false)
      done()
    })

    it('returns true if called on a cell that\'s been passively solved', (done) => {
      var cell = new Cell(1, 2)
      for (var i = 1; i < 9; i++) {
        cell.remove(i)
      }
      expect(cell.isSolved()).to.equal(9)
      expect(cell.solve(9)).to.equal(true)
      done()
    })
  })

  describe('#remove', () => {
    it('returns true the first time it\'s called with a given value', (done) => {
      var cell = new Cell(1, 2)
      expect(cell.remove(1)).to.equal(true)
      expect(cell.remove(2)).to.equal(true)
      done()
    })

    it('returns false after the first time it\'s called with a given value', (done) => {
      var cell = new Cell(1, 2)
      cell.remove(1)
      expect(cell.remove(1)).to.equal(false)
      cell.remove(2)
      expect(cell.remove(2)).to.equal(false)
      done()
    })

    it('returns false if the cell has had #solve called on it', (done) => {
      var cell = new Cell(1, 2)
      cell.solve(1)
      expect(cell.remove(1)).to.equal(false)
      expect(cell.remove(9)).to.equal(false)
      done()
    })

    it('returns false if all but one number has been removed', (done) => {
      var cell = new Cell(1, 2)
      for (var i = 1; i < 9; i++) {
        cell.remove(i)
      }
      expect(cell.remove(9)).to.equal(false)
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
      expect(cell.touchedByUser).to.equal(false)
      done()
    })
    it('returns false after #remove is called', (done) => {
      var cell = new Cell(1, 2)
      cell.remove(4)
      expect(cell.touchedByUser).to.equal(false)
      done()
    })

    it('returns true after #solve is called', (done) => {
      var cell = new Cell(1, 2)
      cell.solve(8)
      expect(cell.touchedByUser).to.equal(true)
      done()
    })

    it('returns false if the cell has been passively solved with 8 #remove calls', (done) => {
      var cell = new Cell(1, 2)
      for (var i = 1; i < 9; i++) {
        cell.remove(i)
      }
      expect(cell.touchedByUser).to.equal(false)
      done()
    })
  })
})
