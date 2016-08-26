function Controller () {
  var viewQueue = []
  var controller = this

  var queueClearing = window.setInterval(() => {
    dequeue()
  }, 0)

  function dequeue () {
    if (viewQueue.length > 0) {
      performViewAction(viewQueue.shift())
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

  // MODEL CHANGE, CALLED BY DOM

  this.userSolveModel = function (numberSelectorID) {
    var x = numberSelectorID.slice(1, 2)
    var y = numberSelectorID.slice(3, 4)
    var value = numberSelectorID.slice(5)
    this.model.solve(x, y, value)
  }

  // VIEW CHANGE, CALLED BY MODEL

  this.makeViewChange = function (params) {
    if (params) { viewQueue.push(params) }
  }

  // DOM CHANGES, CALLED BY DEQUEUER

  function userSolveView (id, value) {
    controller.view.changeToUserSolved(id, value)
  }

  function appSolve (id, value) {
    controller.view.changeToAppSolved(id, value)
  }

  function snipNumberSelector (id, value) {
    var combinedID = `${id}v${value}`
    controller.view.snipNumberSelector(combinedID)
  }

  // A COUPLE INIT FUNCTIONS

  this.saveModel = function (model) {
    this.model = model
  }

  this.saveView = function (view) {
    this.view = view
  }
}

export default Controller
