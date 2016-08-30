import View from './view'
import Controller from './controller'
import Puzzle from './puzzle'

function ILoveSudoku () {
  var controller = new Controller()

  var view = new View(controller)
  controller.saveView(view)

  var puzzle = new Puzzle()
  controller.saveModel(puzzle)
}

var app = new ILoveSudoku()
