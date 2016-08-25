function Controller () {
  var viewQueue = []
  var modelQueue = []

  this.enqueue = function (params) {
    viewQueue.push(params)
  }

  this.saveModel = function (model) {
    this.model = model
  }

  this.saveView = function (view) {
    this.view = view
  }

  this.userSolve = function (numberSelectorID) {
    var id = numberSelectorID.slice(0, 4)
    var value = numberSelectorID.slice(5)
    this.view.changeToUserSolved(id, value)
  }
}

export default Controller
