var expect = require('chai').expect
var Cell = require('../src/scripts/cell').default

describe('Cell', () => {
  describe('#userSolve', () => {
    it('returns an object the first time it\'s called by a user', (done) => {
      var cell = new Cell(1, 2)
      var solveOutput = cell.userSolve(3)
      expect(solveOutput.id).to.equal('x1y2')
      expect(solveOutput.value).to.equal(3)
      expect(solveOutput.action).to.equal('userSolved')
      done()
    })

    it('returns undefined after the first time it\'s called by a user', (done) => {
      var cell = new Cell(1, 2)
      cell.userSolve(3)
      expect(cell.userSolve(3)).to.equal(undefined)
      expect(cell.userSolve(4)).to.equal(undefined)
      done()
    })

    it('returns an object if called on a cell that\'s been solved by the app', (done) => {
      var cell = new Cell(1, 2)
      cell.appSolve(9)
      var solveOutput = cell.userSolve(9)
      expect(solveOutput.id).to.equal('x1y2')
      expect(solveOutput.value).to.equal(9)
      expect(solveOutput.action).to.equal('userSolved')
      done()
    })
  })

  describe('#appSolve', () => {
    it('returns an object the first time it\'s called', (done) => {
      var cell = new Cell(1, 2)
      var solveOutput = cell.appSolve(9)
      expect(solveOutput.id).to.equal('x1y2')
      expect(solveOutput.value).to.equal(9)
      expect(solveOutput.action).to.equal('appSolved')
      done()
    })

    it('returns undefined the second time it\'s called', (done) => {
      var cell = new Cell(1, 2)
      cell.appSolve(9)
      expect(cell.appSolve(9)).to.equal(undefined)
      expect(cell.appSolve(8)).to.equal(undefined)
      done()
    })

    it('returns undefined if called on a cell that\'s been user solved', (done) => {
      var cell = new Cell(1, 2)
      cell.userSolve(9)
      expect(cell.appSolve(9)).to.equal(undefined)
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

    it('returns undefined if the cell has had #userSolve called on it', (done) => {
      var cell = new Cell(1, 2)
      cell.userSolve(1)
      expect(cell.remove(1)).to.equal(undefined)
      expect(cell.remove(9)).to.equal(undefined)
      done()
    })

    it('returns undefined if the cell has had #appSolve called on it', (done) => {
      var cell = new Cell(1, 2)
      cell.appSolve(1)
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
})
