var TileFactory = {

  appSolved: function (id, value, eventCallback) {
    var tile = solved(id, value)
    tile.classList.add('by-app')
    tile.addEventListener('click', eventCallback)
    return tile
  },

  blankSelector: function () {
    var blankSelector = document.createElement('div')
    blankSelector.classList.add('blank')
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

export default TileFactory
