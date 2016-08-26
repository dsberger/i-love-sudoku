function Cell (x, y) {
  var id = `x${x}y${y}`
  var solvedByApp = false
  var solvedValue
  var possibleValues = initializeValues()

  this.userSolve = function (value) {
    if (!this.isSolved() || solvedByApp) {
      var params = solve(value)
      params.action = 'userSolved'
      return params
    }
  }

  this.appSolve = function (value) {
    if (!this.isSolved()) {
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
      possibleValues.splice(i, 1)
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

  this.isSolved = function () {
    return !!solvedValue
  }

  this.getSolvedValue = function () {
    return solvedValue
  }

  this.lastPossibleValue = function () {
    if (possibleValues.length === 1) {
      return possibleValues[0]
    }
  }

  this.couldBe = function (value) {
    return (possibleValues.indexOf(value) !== -1)
  }

  function initializeValues () {
    var collection = []
    for (var i = 1; i <= 9; i++) {
      collection.push(i)
    }
    return collection
  }
}

export default Cell
