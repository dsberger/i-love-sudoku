var view = {

  init: function (controller) {
    // this.controller = controller
    var tiles = document.getElementsByClassName('tile')
    for (var i = 0; i < tiles.length; i++) {
      var coords = tiles[i].id
      var x = parseInt(coords[1], 10)
      var y = parseInt(coords[3], 10)
      tiles[i].appendChild(this.unsolvedTileFactory(x, y))
    }
  },

  userSolve: function () {
    // controller.userSolve(this.id)
    const coords = this.id
    const params = {
      x: parseInt(coords[1], 10),
      y: parseInt(coords[3], 10),
      value: parseInt(coords[5], 10)
    }
    console.log(params)
  },

  unsolvedTileFactory: function (x, y) {
    var element = document.createElement('div')
    element.classList.add('unsolved')
    for (var i = 0; i < 3; i++) {
      element.appendChild(this.rowFactory(x, y, i))
    }
    return element
  },

  rowFactory: function (x, y, rowNumber) {
    var minNumber = rowNumber * 3 + 1
    var row = document.createElement('div')
    row.classList.add('row')
    for (var j = minNumber; j < minNumber + 3; j++) {
      row.appendChild(this.numberSelectorFactory(x, y, j))
    }
    return row
  },

  numberSelectorFactory: function (x, y, value) {
    var selector = document.createElement('div')
    selector.classList.add('number')
    selector.id = `x${x}y${y}v${value}`
    selector.innerText = value.toString()
    selector.addEventListener('click', this.userSolve)
    return selector
  }
}

export default view
