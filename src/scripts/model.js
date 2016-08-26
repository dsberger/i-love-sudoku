import BlockOfNine from './blockOfNine'
import Cell from './cell'

function Model (controller) {
  var controllerQueue = []
  var puzzle = createPuzzle()

  var rows = createRows()
  var columns = createColumns()
  var boxes = createBoxes()
  var blocks = rows.concat(columns).concat(boxes)

  // CALLED BY CONTROLLER

  this.solve = function (x, y, value) {
    console.log(`model y: ${y}`)
    var cell = puzzle[x][y]
    controllerQueue.push(cell.userSolve(value))
  }

  // PUZZLE SOLVING CONTROLS

  var solving = window.setInterval(() => {
    solveCycle()
  }, 0)

  function solveCycle () {
    blocks.forEach((block) => {
      var blockActions = block.hit()
      controllerQueue = controllerQueue.concat(blockActions)
    })
  }

  // DEQUEUEING ACTIONS FOR CONTROLLER

  var queueClearing = window.setInterval(() => {
    dequeue()
  }, 0)

  function dequeue () {
    if (controllerQueue.length > 0) {
      controller.makeViewChange(controllerQueue.shift())
    }
  }

  // SETUP FUNCTIONS

  function createPuzzle () {
    var matrix = []
    for (var i = 0; i < 9; i++) {
      var row = []
      for (var j = 0; j < 9; j++) {
        var cell = new Cell(i, j)
        row.push(cell)
      }
      matrix.push(row)
    }
    return matrix
  }

  function createRows () {
    var collection = []
    for (var i = 0; i < 9; i++) {
      var row = new BlockOfNine(puzzle[i])
      collection.push(row)
    }
    return collection
  }

  function createColumns () {
    var collection = []
    for (var i = 0; i < 9; i++) {
      var cells = []
      for (var j = 0; j < 9; j++) {
        cells.push(puzzle[j][i])
      }
      var column = new BlockOfNine(cells)
      collection.push(column)
    }
    return collection
  }

  function createBoxes () {
    var collection = []
    for (var i = 0; i < 9; i += 3) {
      for (var j = 0; j < 9; j += 3) {
        var box = new BlockOfNine(getBox(i, j))
        collection.push(box)
      }
    }
    return collection
  }

  function getBox (x, y) {
    var collection = []
    for (var i = x; i < x + 3; i++) {
      for (var j = y; j < y + 3; j++) {
        collection.push(puzzle[i][j])
      }
    }
    return collection
  }
}

export default Model
