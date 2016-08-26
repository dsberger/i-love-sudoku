import TileFactory from './tileFactory'

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

export default View
