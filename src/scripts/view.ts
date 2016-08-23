let view = {
  init: function () {
    var numbers = document.getElementsByClassName('number')

    for (var i = 0; i < numbers.length; i++) {
      numbers[i].addEventListener('click', this.noteClick)
    }
  },

  noteClick: function () {
    const tile = this.parentElement.parentElement.parentElement
    const coords = tile.getAttribute('coords')
    const params = {
      value: parseInt(this.innerText, 10),
      x: parseInt(coords[0], 10),
      y: parseInt(coords[1], 10)
    }
    console.log(params)
  }
}

view.init()
