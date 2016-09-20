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

  describe('#isSolved', () => {
    it('returns false before a cell has been solved', (done) => {
      var cell = new Cell(1, 2)
      expect(cell.isSolved()).to.equal(false)
      done()
    })

    it('returns true after a cell has been solved', (done) => {
      var cell = new Cell(1, 2)
      cell.userSolve(4)
      expect(cell.isSolved()).to.equal(true)
      done()
    })
  })

  describe('#getSolvedValue', () => {
    it('returns undefined before a cell has been solved', (done) => {
      var cell = new Cell(1, 2)
      expect(cell.getSolvedValue()).to.equal(undefined)
      done()
    })

    it('returns the solved value after a cell has been solved', (done) => {
      var cell = new Cell(1, 2)
      cell.userSolve(5)
      expect(cell.getSolvedValue()).to.equal(5)
      done()
    })
  })

  describe('#couldBe', () => {
    it('returns true if the given value is still a possible solved value', (done) => {
      var cell = new Cell(1, 2)
      expect(cell.couldBe(1)).to.equal(true)
      done()
    })

    it('returns true if the given value is the last possible value', (done) => {
      var cell = new Cell(1, 2)
      for (var i = 2; i <= 9; i++) {
        cell.remove(i)
      }
      expect(cell.couldBe(1)).to.equal(true)
      done()
    })

    it('returns false if that value has been removed', (done) => {
      var cell = new Cell(1, 2)
      cell.remove(3)
      expect(cell.couldBe(3)).to.equal(false)
      done()
    })
  })

  describe('#lastPossibleValue', () => {
    it('returns undefined in a new cell', (done) => {
      var cell = new Cell(1, 2)
      expect(cell.lastPossibleValue()).to.equal(undefined)
      done()
    })

    it('returns undefined when two or more possible values remain', (done) => {
      var cell = new Cell(1, 2)
      for (var i = 1; i < 8; i++) {
        cell.remove(i)
      }
      expect(cell.lastPossibleValue()).to.equal(undefined)
      done()
    })

    it('returns a value when all others have been cleared', (done) => {
      var cell = new Cell(1, 2)
      for (var i = 1; i < 9; i++) {
        cell.remove(i)
      }
      expect(cell.lastPossibleValue()).to.equal(9)
      done()
    })
  })

  describe('#getPossibleValues', () => {
    it('returns a full array in a new cell', (done) => {
      var cell = new Cell(1, 2)
      expect(cell.getPossibleValues()).to.deep.equal([1, 2, 3, 4, 5, 6, 7, 8, 9])
      done()
    })

    it('returns all values that have not been removed', (done) => {
      var cell = new Cell(1, 2)
      for (var i = 1; i < 8; i++) {
        cell.remove(i)
      }
      expect(cell.getPossibleValues()).to.deep.equal([8, 9])
      done()
    })

    it('returns an array of one when other values have been removed but the cell has not been solved', (done) => {
      var cell = new Cell(1, 2)
      for (var i = 1; i < 9; i++) {
        cell.remove(i)
      }
      expect(cell.getPossibleValues()).to.deep.equal([9])
      done()
    })

    it('returns an empty array when the cell has been solved', (done) => {
      var cell = new Cell(1, 2)
      cell.appSolve(8)
      expect(cell.getPossibleValues()).to.deep.equal([])
      done()
    })
  })

  describe('#userReset', () => {
    it('returns an action object', (done) => {
      var cell = new Cell(1, 2)
      cell.userSolve(9)
      var userResetOutput = cell.userReset()

      expect(userResetOutput.id).to.equal('x1y2')
      expect(userResetOutput.action).to.equal('reset')
      done()
    })

    it('un-solves the cell', (done) => {
      var cell = new Cell(1, 2)
      cell.userSolve(8)
      cell.userReset()
      expect(cell.isSolved()).to.equal(false)
      done()
    })

    it('makes the cell a blank slate', (done) => {
      var cell = new Cell(1, 2)
      cell.userSolve(8)
      cell.userReset()
      expect(cell.couldBe(1)).to.equal(true)
      expect(cell.couldBe(2)).to.equal(true)
      expect(cell.couldBe(3)).to.equal(true)
      expect(cell.couldBe(4)).to.equal(true)
      expect(cell.couldBe(5)).to.equal(true)
      expect(cell.couldBe(6)).to.equal(true)
      expect(cell.couldBe(7)).to.equal(true)
      expect(cell.couldBe(8)).to.equal(true)
      expect(cell.couldBe(9)).to.equal(true)
      done()
    })
  })

  describe('#appReset', () => {

    context('when the cell has been user solved', () => {
      it('returns undefined', (done) => {
        var cell = new Cell(1, 2)
        cell.userSolve(1)
        expect(cell.appReset()).to.equal(undefined)
        done()
      })

      it('the cell stays solved', (done) => {
        var cell = new Cell(1, 2)
        cell.userSolve(1)
        cell.appReset()
        expect(cell.isSolved()).to.equal(true)
        done()
      })
    })

    context('when the cell has been app solved', () => {
      it('returns an action object', (done) => {
        var cell = new Cell(1, 2)
        cell.appSolve(9)
        var appResetOutput = cell.appReset()

        expect(appResetOutput.id).to.equal('x1y2')
        expect(appResetOutput.action).to.equal('reset')
        done()
      })

      it('un-solves the cell', (done) => {
        var cell = new Cell(1, 2)
        cell.appSolve(8)
        cell.appReset()
        expect(cell.isSolved()).to.equal(false)
        done()
      })
    })

    context('when the cell has not yet been solved', () => {
      it('returns an action object', (done) => {
        var cell = new Cell(1, 2)
        cell.remove(1)
        cell.remove(2)
        cell.remove(3)
        var appResetOutput = cell.appReset()

        expect(appResetOutput.id).to.equal('x1y2')
        expect(appResetOutput.action).to.equal('reset')
        done()
      })

      it('restores removed values', (done) => {
        var cell = new Cell(1, 2)
        cell.remove(1)
        cell.remove(2)
        cell.remove(3)
        cell.appReset()

        expect(cell.couldBe(1)).to.equal(true)
        expect(cell.couldBe(2)).to.equal(true)
        expect(cell.couldBe(3)).to.equal(true)
        done()
      })
    })
  })
})
