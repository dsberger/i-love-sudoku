function Cell (x, y) {
  var id = `x${x}y${y}`
  var solvedByUser = false
  var solvedByApp = false
  var solvedValue
  var possibleValues = initializeValues()

  this.userSolve = function (value) {
    if (!isSolved() || solvedByApp) {
      var params = solve(value)
      params.action = 'userSolved'
      solvedByUser = true
      return params
    }
  }

  this.appSolve = function (value) {
    if (!isSolved()) {
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
      possibleValues.splice(i, i + 1)
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

  function isSolved () {
    return !!solvedValue
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
