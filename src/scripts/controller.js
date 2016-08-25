function Controller () {
  this.saveModel = function (model) {
    this.model = model
  }

  this.saveView = function (view) {
    this.view = view
  }

  // DOM AND MODEL CHANGE, CALLED BY DOM
  this.userSolve = function (numberSelectorID) {
    var id = numberSelectorID.slice(0, 4)
    var x = numberSelectorID.slice(1, 2)
    var y = numberSelectorID.slice(3, 4)
    var value = numberSelectorID.slice(5)
    if (this.model.solve(x, y, value)) {
      this.view.changeToUserSolved(id, value)
    }
  }

  // DOM CHANGES, CALLED BY MODEL

  this.appSolve = function (id, value) {
    this.view.changeToAppSolved(id, value)
  }

  this.snipNumberSelector = function (id, value) {
    var combinedID = `${id}v${value}`
    this.view.snipNumberSelector(combinedID)
  }
}

export default Controller
