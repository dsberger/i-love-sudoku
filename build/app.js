var Cell = (function () {
    function Cell() {
    }
    return Cell;
}());
var view = {
    userSolve: function (numberElement) {
        var tile = numberElement.parentElement.parentElement.parentElement;
        var coords = tile.getAttribute('coords');
        var params = {
            value: parseInt(numberElement.innerText, 10),
            x: parseInt(coords[0], 10),
            y: parseInt(coords[1], 10)
        };
        console.log(params);
    }
};
