let view = {
  userSolve: function (numberElement) {
    const tile = numberElement.parentElement.parentElement.parentElement
    const coords = tile.getAttribute('coords')
    const params = {
      value: parseInt(numberElement.innerText, 10),
      x: parseInt(coords[0], 10),
      y: parseInt(coords[1], 10)
    }
    console.log(params)
  }
}
