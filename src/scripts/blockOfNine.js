function BlockOfNine (cells) {

  this.isSolved = function () {
  }

  this.foundValues = function () {
    var collection = []
    cells.forEach((cell) => {
      var value = cell.isSolved()
      if (value) { collection.push(value) }
    })
    return collection
  }

  this.unfoundValues = function () {
    var collection = []
    var foundValues = this.foundValues()
    for (var i = 1; i <= 9; i++) {
      if (foundValues.indexOf(i) === -1) {
        collection.push(i)
      }
    }
    return collection
  }
}

export default BlockOfNine
