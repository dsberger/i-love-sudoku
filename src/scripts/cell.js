function Cell (x, y) {
  var id = `x${x}y${y}`
  var solvedByUser = false
  var solvedValue
  var possibleValues = initializeValues()

  this.userSolve = function (value) {
    if (!solvedByUser) {
      var params = solve(value)
      params.action = 'userSolved'
      solvedByUser = true
      return params
    }
  }

  this.appSolve = function (value) {
    if (!this.isSolved()) {
      var params = solve(value)
      params.action = 'appSolved'
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

  this.userReset = function () {
    solvedByUser = false
    return reset()
  }

  this.appReset = function () {
    if (!solvedByUser) {
      return reset()
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

  function reset () {
    solvedValue = undefined
    possibleValues = initializeValues()
    return {
      id: id,
      action: 'reset'
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
