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
var V = new View(C)

V.init()
C.saveView(V)