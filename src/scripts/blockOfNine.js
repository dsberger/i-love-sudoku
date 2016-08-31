function BlockOfNine (cells) {
  var unsolvedCells = cells.slice()
  var solvedCells = []

  var values = allValuesFalse()

  function allValuesFalse () {
    return {
      1: false,
      2: false,
      3: false,
      4: false,
      5: false,
      6: false,
      7: false,
      8: false,
      9: false
    }
  }

  var actions = []

  function addToActions (params) {
    if (params) { actions.push(params) }
  }

  this.hit = function () {
    actions = []
    cleanUpSolvedCells()
    huntForPassivelySolvedCells()
    removeFoundValuesFromUnsolvedCells()
    huntForLastRemainingUnfoundValues()
    return actions
  }

  this.reset = function () {
    unsolvedCells = unsolvedCells.concat(solvedCells)
    solvedCells = []
    values = allValuesFalse()
  }

  function cleanUpSolvedCells () {
    for (var i = unsolvedCells.length - 1; i >= 0; i--) {
      if (unsolvedCells[i].isSolved()) {
        var cell = unsolvedCells.splice(i, 1)[0]
        values[cell.getSolvedValue()] = true
        solvedCells.push(cell)
      }
    }
  }

  function huntForPassivelySolvedCells () {
    unsolvedCells.forEach((cell) => {
      var lastPossibleValue = cell.lastPossibleValue()
      if (lastPossibleValue) {
        var params = cell.appSolve(lastPossibleValue)
        addToActions(params)
      }
    })
    cleanUpSolvedCells()
  }

  function removeFoundValuesFromUnsolvedCells () {
    var found = foundValues()
    found.forEach((value) => {
      unsolvedCells.forEach((cell) => {
        var params = cell.remove(value)
        addToActions(params)
      })
    })
  }

  function huntForLastRemainingUnfoundValues () {
    var unfound = unfoundValues()
    unfound.forEach((value) => {
      var mightBeThisValue = []

      unsolvedCells.forEach((cell, index) => {
        if (cell.couldBe(value)) {
          mightBeThisValue.push(cell)
        }
      })

      if (mightBeThisValue.length === 1) {
        var params = mightBeThisValue[0].appSolve(value)
        addToActions(params)
      }
    })
    cleanUpSolvedCells()
  }

  function foundValues () {
    var found = []
    for (var number in values) {
      if (values[number]) {
        found.push(parseInt(number, 10))
      }
    }
    return found
  }

  function unfoundValues () {
    var unfound = []
    for (var number in values) {
      if (!values[number]) {
        unfound.push(parseInt(number, 10))
      }
    }
    return unfound
  }
}

export default BlockOfNine
