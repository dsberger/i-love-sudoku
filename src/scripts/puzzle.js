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
}

export default Puzzle
