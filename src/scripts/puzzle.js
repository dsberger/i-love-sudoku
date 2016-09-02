import blocksAssembler from './blocksAssembler'
import Cell from './cell'

function Puzzle () {
  var core = createCore()
  var blocks = blocksAssembler(core)

  this.solveCell = function (x, y, value) {
    var cell = core[x][y]
    return cell.userSolve(value)
  }

  this.solveCycle = function () {
    var actions = []
    blocks.forEach((block) => {
      actions = actions.concat(block.hit())
    })
    return actions
  }

  this.reset = function (x, y) {
    var actions = []
    actions.push(core[x][y].userReset())
    actions = actions.concat(appResetAllCells())
    resetBlocks()
    return actions
  }

  this.resetAll = function () {
    var actions = userResetAllCells()
    resetBlocks()
    return actions
  }

  function createCore () {
    var matrix = []
    for (var i = 0; i < 9; i++) {
      matrix.push(createRow(i))
    }
    return matrix
  }

  function createRow (i) {
    var row = []
    for (var j = 0; j < 9; j++) {
      row.push(new Cell(i, j))
    }
    return row
  }

  function appResetAllCells () {
    return resetAllCells('app')
  }

  function userResetAllCells () {
    return resetAllCells('user')
  }

  function resetAllCells (initiator) {
    var methodName = `${initiator}Reset`
    var actions = []
    core.forEach((row) => {
      row.forEach((cell) => {
        var params = cell[methodName].call()
        if (params) {
          actions.push(params)
        }
      })
    })
    return actions
  }

  function resetBlocks () {
    blocks.forEach((block) => {
      block.reset()
    })
  }
}

export default Puzzle
