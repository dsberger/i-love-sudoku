import View from './view'
import Controller from './controller'

var C = new Controller()
var V = new View(C)

V.init()
C.saveView(V)
