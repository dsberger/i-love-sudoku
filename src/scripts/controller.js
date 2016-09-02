function Controller () {
  var viewQueue = []

  window.setInterval(() => {
    dequeue()
  }, 0)

  turnOnSolving()

  var solvepuzzle

  function turnOnSolving () {
    solvepuzzle = window.setInterval(() => {
      solveCycle()
    }, 0)
  }

  function turnOffSolving () {
    window.clearInterval(solvepuzzle)
    viewQueue = []
  }

  function solveCycle () {
    var actions = puzzle.solveCycle()
    viewQueue = viewQueue.concat(actions)
  }

  function dequeue () {
    if (viewQueue.length > 0) {
      var action = viewQueue.shift()
      performViewAction(action)
    }
  }

  function performViewAction (params) {
    switch (params.action) {
      case 'userSolved':
        userSolveTile(params.id, params.value)
        break
      case 'appSolved':
        appSolveTile(params.id, params.value)
        break
      case 'removed':
        snipNumberSelector(params.id, params.value)
        break
      case 'reset':
        resetTile(params.id)
        break
    }
  }

  // API FOR DOM LISTENERS

  this.solveCell = function (numberSelectorID) {
    var x = numberSelectorID.slice(1, 2)
    var y = numberSelectorID.slice(3, 4)
    var value = numberSelectorID.slice(5)
    viewQueue.push(puzzle.solveCell(x, y, value))
  }

  this.reset = function (id) {
    var x = id.slice(1, 2)
    var y = id.slice(3, 4)

    turnOffSolving()
    var actions = puzzle.reset(x, y)
    viewQueue = viewQueue.concat(actions)
    turnOnSolving()
  }

  // DOM CHANGES, CALLED BY DEQUEUER

  function userSolveTile (id, value) {
    view.changeToUserSolved(id, value)
  }

  function appSolveTile (id, value) {
    view.changeToAppSolved(id, value)
  }

  function snipNumberSelector (id, value) {
    var combinedID = `${id}v${value}`
    view.snipNumberSelector(combinedID)
  }

  function resetTile (id) {
    view.changeToUnsolved(id)
  }

  // INIT FUNCTIONS

  var view
  this.saveView = function (viewObject) {
    view = viewObject
  }

  var puzzle
  this.savePuzzle = function (puzzleObject) {
    puzzle = puzzleObject
  }
}

export default Controller
