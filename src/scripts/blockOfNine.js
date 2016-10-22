function BlockOfNine (cells) {
  var unsolvedCells = cells.slice()
  var solvedCells = []

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
  }

  function cleanUpSolvedCells () {
    for (var i = unsolvedCells.length - 1; i >= 0; i--) {
      if (unsolvedCells[i].isSolved()) {
        var cell = unsolvedCells.splice(i, 1)[0]
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
    return solvedCells.map((cell) => {
      return parseInt(cell.getSolvedValue(), 10)
    })
  }

  function unfoundValues () {
    var found = foundValues()
    var unfound = []
    for (var i = 1; i <= 9; i++) {
      if (found.indexOf(i) === -1) {
        unfound.push(i)
      }
    }
    return unfound
  }
}

export default BlockOfNine
