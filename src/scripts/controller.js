function Controller () {
  var view
  var model

  var viewQueue = []
  turnOn()

  // PROCESSING CONTROLS

  var solveModel
  var processViewQueue

  function turnOn () {
    solveModel = window.setInterval(() => {
      solveCycle()
    }, 0)

    processViewQueue = window.setInterval(() => {
      dequeue()
    }, 0)
  }

  function turnOff () {
    window.clearInterval(solveModel)
    window.clearInterval(processViewQueue)
    viewQueue = []
  }

  // PUZZLE MANAGEMENT

  function solveCycle () {
    var actions = model.solveCycle()
    viewQueue = viewQueue.concat(actions)
  }

  var enqueue = function (params) {
    if (params) { viewQueue.push(params) }
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
        userSolveView(params.id, params.value)
        break
      case 'appSolved':
        appSolve(params.id, params.value)
        break
      case 'removed':
        snipNumberSelector(params.id, params.value)
        break
    }
  }

  // API FOR DOM REQUESTS

  this.userSolveModel = function (numberSelectorID) {
    var x = numberSelectorID.slice(1, 2)
    var y = numberSelectorID.slice(3, 4)
    var value = numberSelectorID.slice(5)
    enqueue(model.solveCell(x, y, value))
  }

  // DOM CHANGES, CALLED BY DEQUEUER

  function userSolveView (id, value) {
    view.changeToUserSolved(id, value)
  }

  function appSolve (id, value) {
    view.changeToAppSolved(id, value)
  }

  function snipNumberSelector (id, value) {
    var combinedID = `${id}v${value}`
    view.snipNumberSelector(combinedID)
  }

  // INIT FUNCTIONS

  this.saveView = function (viewObject) {
    view = viewObject
  }

  this.saveModel = function (modelObject) {
    model = modelObject
  }
}

export default Controller
