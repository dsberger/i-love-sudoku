import TileFactory from './tileFactory'

function View (controller) {
  // DOM INITIALIZING

  var tiles = document.getElementsByClassName('tile')
  for (var i = 0; i < tiles.length; i++) {
    var unsolvedTile = TileFactory.unsolved(tiles[i].id, userSolve)
    tiles[i].appendChild(unsolvedTile)
  }

  var newPuzzleButton = document.getElementById('new-puzzle')
  newPuzzleButton.addEventListener('click', () => {
    controller.newPuzzle()
  })

  // API FOR CONTROLLER

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
    controller.reset(this.id)
  }

  function userSolve () {
    controller.solveCell(this.id)
  }
}

export default View
