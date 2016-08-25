function BlockOfNine (cells) {
}

function Cell (x, y) {
  this.id = `x${x}y${y}`

  var possibleValues = []

  for (var i = 1; i <= 9; i++) {
    possibleValues.push(i)
  }

  this.solve = function (value) {
    if (this.isSolved()) {
      return false
    } else {
      possibleValues = [value]
      return true
    }
  }

  this.remove = function (value) {
    if (this.isSolved()) {
      return false
    } else {
      return removeFromPossibleValues(value)
    }
  }

  this.isSolved = function () {
    if (possibleValues.length === 1) {
      return possibleValues[0]
    } else {
      return false
    }
  }

  function removeFromPossibleValues (value) {
    var i = possibleValues.indexOf(value)
    if (i === -1) {
      return false
    } else {
      possibleValues.splice(i, 1)
      return true
    }
  }
}

function Model (controller) {
  var puzzle = createPuzzle()
  var rows = createRows()
  var columns = createColumns()
  var boxes = createBoxes()

  console.log(rows.length)
  console.log(columns.length)
  console.log(boxes.length)

  this.solve = function (x, y, value) {
    var cell = puzzle[x][y]
    if (cell.solve(value)) {
      var params = {
        action: 'solve',
        source: 'model',
        id: cell.id,
        value: value
      }
      controller.enqueue(params)
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

function View (controller) {
  this.init = function () {
    var tiles = document.getElementsByClassName('tile')
    for (var i = 0; i < tiles.length; i++) {
      tiles[i].appendChild(unsolvedTileFactory(tiles[i].id))
    }
  }

  // DOM MANIPULATORS

  this.changeToUserSolved = function (id, value) {
    var tile = document.getElementById(id)
    var userSolvedTile = userSolvedTileFactory(id, value)
    tile.replaceChild(userSolvedTile, tile.firstChild)
  }

  this.changeToAppSolved = function (id, value) {
    var tile = document.getElementById(id)
    var appSolvedTile = appSolvedTileFactory(id, value)
    tile.replaceChild(appSolvedTile, tile.firstChild)
  }

  this.changeToUnsolved = function (id) {
    var tile = document.getElementById(id)
    var unsolvedTile = unsolvedTileFactory(id)
    tile.replaceChild(unsolvedTile, tile.firstChild)
  }

  this.snipNumberSelector = function (id) {
    var numberSelector = document.getElementById(id)
    var blankSelector = blankSelectorFactory()
    var row = numberSelector.parentElement
    row.replaceChild(blankSelector, numberSelector)
  }

  // TILE LISTENERS

  function clearSolve () {
    console.log('Clear solve doesn\'t work yet!')
  }

  function userSolve () {
    controller.userSolve(this.id)
  }

  // TILE FACTORIES

  function unsolvedTileFactory (parentID) {
    var element = document.createElement('div')
    element.classList.add('unsolved')
    for (var i = 0; i < 3; i++) {
      element.appendChild(rowFactory(parentID, i))
    }
    return element
  }

  function rowFactory (parentID, rowNumber) {
    var minNumber = rowNumber * 3 + 1
    var row = document.createElement('div')
    row.classList.add('row')
    for (var j = minNumber; j < minNumber + 3; j++) {
      row.appendChild(numberSelectorFactory(parentID, j))
    }
    return row
  }

  function numberSelectorFactory (parentID, value) {
    var selector = document.createElement('div')
    selector.classList.add('number')
    selector.id = `${parentID}v${value}`
    selector.innerText = value.toString()
    selector.addEventListener('click', userSolve)
    return selector
  }

  function solvedTileFactory (id, value) {
    var tile = document.createElement('div')
    tile.classList.add('solved')
    tile.innerText = value
    tile.id = `${id}v${value}`
    return tile
  }

  function userSolvedTileFactory (id, value) {
    var tile = solvedTileFactory(id, value)
    tile.classList.add('by-user')
    tile.addEventListener('click', clearSolve)
    return tile
  }

  function appSolvedTileFactory (id, value) {
    var tile = solvedTileFactory(id, value)
    tile.classList.add('by-app')
    tile.addEventListener('click', userSolve)
    return tile
  }

  function blankSelectorFactory () {
    var blankSelector = document.createElement('div')
    blankSelector.classList.add('number')
    blankSelector.innerText = ''
    return blankSelector
  }
}

function Controller () {
  var viewQueue = []
  var modelQueue = []

  this.enqueue = function (params) {
    viewQueue.push(params)
  }

  this.saveModel = function (model) {
    this.model = model
  }

  this.saveView = function (view) {
    this.view = view
  }

  this.userSolve = function (numberSelectorID) {
    var id = numberSelectorID.slice(0, 4)
    var value = numberSelectorID.slice(5)
    this.view.changeToUserSolved(id, value)
  }
}

var C = new Controller()
var M = new Model(C)
var V = new View(C)

V.init()
C.saveModel(M)
C.saveView(V)