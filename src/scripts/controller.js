function Controller () {
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
