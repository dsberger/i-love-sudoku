function Cell (x, y) {
  this.id = `x${x}y${y}`
  this.touchedByUser = false
  var possibleValues = []

  for (var i = 1; i <= 9; i++) {
    possibleValues.push(i)
  }

  this.solve = function (value) {
    if (this.isSolved() && this.touchedByUser) {
      return false
    } else {
      possibleValues = [value]
      this.touchedByUser = true
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

export default Cell
