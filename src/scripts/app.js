import Model from './model'
import View from './view'
import Controller from './controller'

var C = new Controller()
var M = new Model(C)
var V = new View(C)

V.init()
C.saveModel(M)
C.saveView(V)
