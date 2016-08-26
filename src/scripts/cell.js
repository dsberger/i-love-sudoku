function Cell (x, y) {
  this.id = `x${x}y${y}`
  var touchedByUser = false
  var possibleValues = []

  for (var i = 1; i <= 9; i++) {
    possibleValues.push(i)
  }

  this.solve = function (value) {
    if (!this.isSolved() || !touchedByUser) {
      possibleValues = [value]
      touchedByUser = true
      return {
        id: this.id,
        action: 'userSolved',
        value: value
      }
    }
  }

  this.remove = function (value) {
    if (!this.isSolved()) {
      var i = possibleValues.indexOf(value)
      if (i !== -1) {
        possibleValues.splice(i, i + 1)
        return {
          id: this.id,
          value: value,
          action: 'removed'
        }
      }
    }
  }

  this.isSolved = function () {
    if (possibleValues.length === 1) {
      return possibleValues[0]
    } else {
      return false
    }
  }

  this.getPossibleValues = function () {
    if (this.isSolved()) {
      return false
    } else {
      return possibleValues
    }
  }

  this.touchedByUser = function () {
    return touchedByUser
  }
}

export default Cell
