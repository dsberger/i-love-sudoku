var Cell = (function () {
    function Cell() {
    }
    return Cell;
}());
var view = {
    init: function () {
        var numbers = document.getElementsByClassName('number');
        for (var i = 0; i < numbers.length; i++) {
            numbers[i].addEventListener('click', this.noteClick);
        }
    },
    noteClick: function () {
        var tile = this.parentElement.parentElement.parentElement;
        var coords = tile.getAttribute('coords');
        var params = {
            value: parseInt(this.innerText, 10),
            x: parseInt(coords[0], 10),
            y: parseInt(coords[1], 10)
        };
        console.log(params);
    }
};
view.init();
