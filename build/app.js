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
            value: this.innerText,
            x: coords[0],
            y: coords[1]
        };
        console.log(params);
    }
};
view.init();
