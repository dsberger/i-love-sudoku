function BlockOfNine (cells) {
  var unsolvedCells = cells
  var solvedCells = []

  var values = {
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
    8: false,
    9: false
  }

  this.hit = function () {
    var actions = []
    return actions
  }

  // Check to see if any new cells have been solved.
  // If yes, remove that value from all remaining cells.
  // For each unfound value, check unsolved cells to see if it's the last option for that value.
  // Check if any unsolved Cells were solved.
  // return actions
}

function Cell (x, y) {
  var id = `x${x}y${y}`
  var solvedByUser = false
  var solvedByApp = false
  var solvedValue
  var possibleValues = initializeValues()

  this.userSolve = function (value) {
    if (!isSolved() || solvedByApp) {
      var params = solve(value)
      params.action = 'userSolved'
      solvedByUser = true
      return params
    }
  }

  this.appSolve = function (value) {
    if (!isSolved()) {
      var params = solve(value)
      params.action = 'appSolved'
      solvedByApp = true
      return params
    }
  }

  this.remove = function (value) {
    if (possibleValues.length === 1) { return }

    var i = possibleValues.indexOf(value)
    if (i !== -1) {
      possibleValues.splice(i, i + 1)
      return {
        id: id,
        value: value,
        action: 'removed'
      }
    }
  }

  function solve (value) {
    solvedValue = value
    possibleValues = []
    return {
      id: id,
      value: value
    }
  }

  function isSolved () {
    return !!solvedValue
  }

  function initializeValues () {
    var collection = []
    for (var i = 1; i <= 9; i++) {
      collection.push(i)
    }
    return collection
  }
}

function Model (controller) {
  var puzzle = createPuzzle()
  var rows = createRows()
  var columns = createColumns()
  var boxes = createBoxes()

  this.solve = function (x, y, value) {
    var cell = puzzle[x][y]
    controller.makeViewChange(cell.userSolve(value))
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

var TileFactory = {

  appSolved: function (id, value, eventCallback) {
    var tile = solved(id, value)
    tile.classList.add('by-app')
    tile.addEventListener('click', eventCallback)
    return tile
  },

  blankSelector: function () {
    var blankSelector = document.createElement('div')
    blankSelector.classList.add('number')
    blankSelector.innerText = ''
    return blankSelector
  },

  unsolved: function (parentID, eventCallback) {
    var tile = document.createElement('div')
    tile.classList.add('unsolved')
    for (var i = 0; i < 3; i++) {
      tile.appendChild(row(parentID, i, eventCallback))
    }
    return tile
  },

  userSolved: function (id, value, eventCallback) {
    var tile = solved(id, value)
    tile.classList.add('by-user')
    tile.addEventListener('click', eventCallback)
    return tile
  }
}

function row (parentID, rowNumber, eventCallback) {
  var minNumber = rowNumber * 3 + 1
  var row = document.createElement('div')
  row.classList.add('row')
  for (var j = minNumber; j < minNumber + 3; j++) {
    row.appendChild(numberSelector(parentID, j, eventCallback))
  }
  return row
}

function numberSelector (parentID, value, eventCallback) {
  var selector = document.createElement('div')
  selector.classList.add('number')
  selector.id = `${parentID}v${value}`
  selector.innerText = value.toString()
  selector.addEventListener('click', eventCallback)
  return selector
}

function solved (id, value) {
  var tile = document.createElement('div')
  tile.classList.add('solved')
  tile.innerText = value
  tile.id = `${id}v${value}`
  return tile
}

function View (controller) {
  this.init = function () {
    var tiles = document.getElementsByClassName('tile')
    for (var i = 0; i < tiles.length; i++) {
      var unsolvedTile = TileFactory.unsolved(tiles[i].id, userSolve)
      tiles[i].appendChild(unsolvedTile)
    }
  }

  // DOM MANIPULATORS

  this.changeToUserSolved = function (id, value) {
    var tile = document.getElementById(id)
    var userSolvedTile = TileFactory.userSolved(id, value, clearSolve)
    tile.replaceChild(userSolvedTile, tile.firstChild)
  }

  this.changeToAppSolved = function (id, value) {
    var tile = document.getElementById(id)
    var appSolvedTile = TileFactory.appSolved(id, value, userSolve)
    tile.replaceChild(appSolvedTile, tile.firstChild)
  }

  this.changeToUnsolved = function (id) {
    var tile = document.getElementById(id)
    var unsolvedTile = TileFactory.unsolved(id, userSolve)
    tile.replaceChild(unsolvedTile, tile.firstChild)
  }

  this.snipNumberSelector = function (id) {
    var numberSelector = document.getElementById(id)
    var blankSelector = TileFactory.blankSelector()
    var row = numberSelector.parentElement
    row.replaceChild(blankSelector, numberSelector)
  }

  // TILE LISTENERS

  function clearSolve () {
    console.log('Clear solve doesn\'t work yet!')
  }

  function userSolve () {
    controller.userSolveModel(this.id)
  }
}

function Controller () {
  var viewQueue = []
  var controller = this

  var queueClearing = window.setInterval(() => {
    dequeue()
  }, 100)

  function dequeue () {
    if (viewQueue.length > 0) {
      performViewAction(viewQueue.shift())
    }
  }

  function performViewAction (params) {
    switch (params.action) {
      case 'userSolved':
        userSolveView(params.id, params.value)
        break
      case 'appSolved':
        appSolve(params.id, params.value)
        break
      case 'removed':
        snipNumberSelector(params.id, params.value)
        break
    }
  }

  // MODEL CHANGE, CALLED BY DOM

  this.userSolveModel = function (numberSelectorID) {
    var x = numberSelectorID.slice(1, 2)
    var y = numberSelectorID.slice(3, 4)
    var value = numberSelectorID.slice(5)
    this.model.solve(x, y, value)
  }

  // VIEW CHANGE, CALLED BY MODEL

  this.makeViewChange = function (params) {
    if (params) { viewQueue.push(params) }
  }

  // DOM CHANGES, CALLED BY DEQUEUER

  function userSolveView (id, value) {
    controller.view.changeToUserSolved(id, value)
  }

  function appSolve (id, value) {
    this.view.changeToAppSolved(id, value)
  }

  function snipNumberSelector (id, value) {
    var combinedID = `${id}v${value}`
    this.view.snipNumberSelector(combinedID)
  }

  // A COUPLE INIT FUNCTIONS

  this.saveModel = function (model) {
    this.model = model
  }

  this.saveView = function (view) {
    this.view = view
  }
}

var C = new Controller()
var M = new Model(C)
var V = new View(C)

V.init()
C.saveModel(M)
C.saveView(V)