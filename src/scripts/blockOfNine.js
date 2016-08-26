function BlockOfNine (cells) {
  var unsolvedCells = cells
  var solvedCells = []

  var values = {
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

  this.hit = function () {
    var actions = []
    return actions
  }

  // Check to see if any new cells have been solved.
  // If yes, remove that value from all remaining cells.
  // For each unfound value, check unsolved cells to see if it's the last option for that value.
  // Check if any unsolved Cells were solved.
  // return actions
}

export default BlockOfNine
