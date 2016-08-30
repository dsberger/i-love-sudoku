import BlockOfNine from './blockOfNine'

function blocksAssembler (matrix) {
  var rows = createRows(matrix)
  var columns = createColumns(matrix)
  var boxes = createBoxes(matrix)

  return rows.concat(columns).concat(boxes)
}

function createRows (matrix) {
  var collection = []
  for (var i = 0; i < 9; i++) {
    var row = new BlockOfNine(matrix[i])
    collection.push(row)
  }
  return collection
}

function createColumns (matrix) {
  var collection = []
  for (var i = 0; i < 9; i++) {
    var cells = []
    for (var j = 0; j < 9; j++) {
      cells.push(matrix[j][i])
    }
    var column = new BlockOfNine(cells)
    collection.push(column)
  }
  return collection
}

function createBoxes (matrix) {
  var collection = []
  for (var i = 0; i < 9; i += 3) {
    for (var j = 0; j < 9; j += 3) {
      var box = new BlockOfNine(getBox(matrix, i, j))
      collection.push(box)
    }
  }
  return collection
}

function getBox (matrix, x, y) {
  var collection = []
  for (var i = x; i < x + 3; i++) {
    for (var j = y; j < y + 3; j++) {
      collection.push(matrix[i][j])
    }
  }
  return collection
}

export default blocksAssembler
