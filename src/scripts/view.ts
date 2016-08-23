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
      value: this.innerText,
      x: coords[0],
      y: coords[1]
    }
    console.log(params)
  }
}

view.init()
