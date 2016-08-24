function View (controller) {
  this.init = function () {
    var tiles = document.getElementsByClassName('tile')
    for (var i = 0; i < tiles.length; i++) {
      var coords = tiles[i].id
      var x = parseInt(coords[1], 10)
      var y = parseInt(coords[3], 10)
      tiles[i].appendChild(unsolvedTileFactory(x, y))
    }
  }

  function userSolve () {
    controller.userSolve(this.id)
  }

  function unsolvedTileFactory (x, y) {
    var element = document.createElement('div')
    element.classList.add('unsolved')
    for (var i = 0; i < 3; i++) {
      element.appendChild(rowFactory(x, y, i))
    }
    return element
  }

  function rowFactory (x, y, rowNumber) {
    var minNumber = rowNumber * 3 + 1
    var row = document.createElement('div')
    row.classList.add('row')
    for (var j = minNumber; j < minNumber + 3; j++) {
      row.appendChild(numberSelectorFactory(x, y, j))
    }
    return row
  }

  function numberSelectorFactory (x, y, value) {
    var selector = document.createElement('div')
    selector.classList.add('number')
    selector.id = `x${x}y${y}v${value}`
    selector.innerText = value.toString()
    selector.addEventListener('click', userSolve)
    return selector
  }
}

function Controller () {
  this.userSolve = function (numberSelectorID) {
    console.log(numberSelectorID)
  }
}

var C = new Controller()
var V = new View(C)

V.init()