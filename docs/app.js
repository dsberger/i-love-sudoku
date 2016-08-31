'use strict';

var TileFactory = {

  appSolved: function appSolved(id, value, eventCallback) {
    var tile = solved(id, value);
    tile.classList.add('by-app');
    tile.addEventListener('click', eventCallback);
    return tile;
  },

  blankSelector: function blankSelector() {
    var blankSelector = document.createElement('div');
    blankSelector.classList.add('blank');
    blankSelector.innerText = '';
    return blankSelector;
  },

  unsolved: function unsolved(parentID, eventCallback) {
    var tile = document.createElement('div');
    tile.classList.add('unsolved');
    for (var i = 0; i < 3; i++) {
      tile.appendChild(row(parentID, i, eventCallback));
    }
    return tile;
  },

  userSolved: function userSolved(id, value, eventCallback) {
    var tile = solved(id, value);
    tile.classList.add('by-user');
    tile.addEventListener('click', eventCallback);
    return tile;
  }
};

function row(parentID, rowNumber, eventCallback) {
  var minNumber = rowNumber * 3 + 1;
  var row = document.createElement('div');
  row.classList.add('row');
  for (var j = minNumber; j < minNumber + 3; j++) {
    row.appendChild(numberSelector(parentID, j, eventCallback));
  }
  return row;
}

function numberSelector(parentID, value, eventCallback) {
  var selector = document.createElement('div');
  selector.classList.add('number');
  selector.id = parentID + 'v' + value;
  selector.innerText = value.toString();
  selector.addEventListener('click', eventCallback);
  return selector;
}

function solved(id, value) {
  var tile = document.createElement('div');
  tile.classList.add('solved');
  tile.innerText = value;
  tile.id = id + 'v' + value;
  return tile;
}

function View(controller) {
  // DOM INITIALIZING

  var tiles = document.getElementsByClassName('tile');
  for (var i = 0; i < tiles.length; i++) {
    var unsolvedTile = TileFactory.unsolved(tiles[i].id, userSolve);
    tiles[i].appendChild(unsolvedTile);
  }

  // API FOR CONTROLLER

  this.changeToUserSolved = function (id, value) {
    var tile = document.getElementById(id);
    var userSolvedTile = TileFactory.userSolved(id, value, clearSolve);
    tile.replaceChild(userSolvedTile, tile.firstChild);
  };

  this.changeToAppSolved = function (id, value) {
    var tile = document.getElementById(id);
    var appSolvedTile = TileFactory.appSolved(id, value, userSolve);
    tile.replaceChild(appSolvedTile, tile.firstChild);
  };

  this.changeToUnsolved = function (id) {
    var tile = document.getElementById(id);
    var unsolvedTile = TileFactory.unsolved(id, userSolve);
    tile.replaceChild(unsolvedTile, tile.firstChild);
  };

  this.snipNumberSelector = function (id) {
    var numberSelector = document.getElementById(id);
    var blankSelector = TileFactory.blankSelector();
    var row = numberSelector.parentElement;
    row.replaceChild(blankSelector, numberSelector);
  };

  // TILE LISTENERS

  function clearSolve() {
    controller.reset(this.id);
  }

  function userSolve() {
    controller.solveCell(this.id);
  }
}

function Controller() {
  var viewQueue = [];

  window.setInterval(function () {
    dequeue();
  }, 0);

  turnOnSolving();

  var solveModel;

  function turnOnSolving() {
    solveModel = window.setInterval(function () {
      solveCycle();
    }, 0);
  }

  function turnOffSolving() {
    window.clearInterval(solveModel);
    viewQueue = [];
  }

  function solveCycle() {
    var actions = model.solveCycle();
    viewQueue = viewQueue.concat(actions);
  }

  function dequeue() {
    if (viewQueue.length > 0) {
      var action = viewQueue.shift();
      performViewAction(action);
    }
  }

  function performViewAction(params) {
    switch (params.action) {
      case 'userSolved':
        userSolveTile(params.id, params.value);
        break;
      case 'appSolved':
        appSolveTile(params.id, params.value);
        break;
      case 'removed':
        snipNumberSelector(params.id, params.value);
        break;
      case 'reset':
        resetTile(params.id);
        break;
    }
  }

  // API FOR DOM LISTENERS

  this.solveCell = function (numberSelectorID) {
    var x = numberSelectorID.slice(1, 2);
    var y = numberSelectorID.slice(3, 4);
    var value = numberSelectorID.slice(5);
    viewQueue.push(model.solveCell(x, y, value));
  };

  this.reset = function (id) {
    var x = id.slice(1, 2);
    var y = id.slice(3, 4);

    turnOffSolving();
    var actions = model.reset(x, y);
    viewQueue = viewQueue.concat(actions);
    turnOnSolving();
  };

  // DOM CHANGES, CALLED BY DEQUEUER

  function userSolveTile(id, value) {
    view.changeToUserSolved(id, value);
  }

  function appSolveTile(id, value) {
    view.changeToAppSolved(id, value);
  }

  function snipNumberSelector(id, value) {
    var combinedID = id + 'v' + value;
    view.snipNumberSelector(combinedID);
  }

  function resetTile(id) {
    view.changeToUnsolved(id);
  }

  // INIT FUNCTIONS

  var view;
  this.saveView = function (viewObject) {
    view = viewObject;
  };

  var model;
  this.saveModel = function (modelObject) {
    model = modelObject;
  };
}

function BlockOfNine(cells) {
  var unsolvedCells = cells.slice();
  var solvedCells = [];

  var values = allValuesFalse();

  function allValuesFalse() {
    return {
      1: false,
      2: false,
      3: false,
      4: false,
      5: false,
      6: false,
      7: false,
      8: false,
      9: false
    };
  }

  var actions = [];

  function addToActions(params) {
    if (params) {
      actions.push(params);
    }
  }

  this.hit = function () {
    actions = [];
    cleanUpSolvedCells();
    huntForPassivelySolvedCells();
    removeFoundValuesFromUnsolvedCells();
    huntForLastRemainingUnfoundValues();
    return actions;
  };

  this.reset = function () {
    unsolvedCells = unsolvedCells.concat(solvedCells);
    solvedCells = [];
    values = allValuesFalse();
  };

  function cleanUpSolvedCells() {
    for (var i = unsolvedCells.length - 1; i >= 0; i--) {
      if (unsolvedCells[i].isSolved()) {
        var cell = unsolvedCells.splice(i, 1)[0];
        values[cell.getSolvedValue()] = true;
        solvedCells.push(cell);
      }
    }
  }

  function huntForPassivelySolvedCells() {
    unsolvedCells.forEach(function (cell) {
      var lastPossibleValue = cell.lastPossibleValue();
      if (lastPossibleValue) {
        var params = cell.appSolve(lastPossibleValue);
        addToActions(params);
      }
    });
    cleanUpSolvedCells();
  }

  function removeFoundValuesFromUnsolvedCells() {
    var found = foundValues();
    found.forEach(function (value) {
      unsolvedCells.forEach(function (cell) {
        var params = cell.remove(value);
        addToActions(params);
      });
    });
  }

  function huntForLastRemainingUnfoundValues() {
    var unfound = unfoundValues();
    unfound.forEach(function (value) {
      var mightBeThisValue = [];

      unsolvedCells.forEach(function (cell, index) {
        if (cell.couldBe(value)) {
          mightBeThisValue.push(cell);
        }
      });

      if (mightBeThisValue.length === 1) {
        var params = mightBeThisValue[0].appSolve(value);
        addToActions(params);
      }
    });
    cleanUpSolvedCells();
  }

  function foundValues() {
    var found = [];
    for (var number in values) {
      if (values[number]) {
        found.push(parseInt(number, 10));
      }
    }
    return found;
  }

  function unfoundValues() {
    var unfound = [];
    for (var number in values) {
      if (!values[number]) {
        unfound.push(parseInt(number, 10));
      }
    }
    return unfound;
  }
}

function blocksAssembler(matrix) {
  var rows = createRows(matrix);
  var columns = createColumns(matrix);
  var boxes = createBoxes(matrix);

  return rows.concat(columns).concat(boxes);
}

function createRows(matrix) {
  var collection = [];
  for (var i = 0; i < 9; i++) {
    var row = new BlockOfNine(matrix[i]);
    collection.push(row);
  }
  return collection;
}

function createColumns(matrix) {
  var collection = [];
  for (var i = 0; i < 9; i++) {
    var cells = [];
    for (var j = 0; j < 9; j++) {
      cells.push(matrix[j][i]);
    }
    var column = new BlockOfNine(cells);
    collection.push(column);
  }
  return collection;
}

function createBoxes(matrix) {
  var collection = [];
  for (var i = 0; i < 9; i += 3) {
    for (var j = 0; j < 9; j += 3) {
      var box = new BlockOfNine(getBox(matrix, i, j));
      collection.push(box);
    }
  }
  return collection;
}

function getBox(matrix, x, y) {
  var collection = [];
  for (var i = x; i < x + 3; i++) {
    for (var j = y; j < y + 3; j++) {
      collection.push(matrix[i][j]);
    }
  }
  return collection;
}

function Cell(x, y) {
  var id = 'x' + x + 'y' + y;
  var solvedByUser = false;
  var solvedValue;
  var possibleValues = initializeValues();

  this.userSolve = function (value) {
    if (!this.isSolved() || !solvedByUser) {
      var params = solve(value);
      params.action = 'userSolved';
      solvedByUser = true;
      return params;
    }
  };

  this.appSolve = function (value) {
    if (!this.isSolved()) {
      var params = solve(value);
      params.action = 'appSolved';
      return params;
    }
  };

  this.remove = function (value) {
    if (possibleValues.length === 1) {
      return;
    }

    var i = possibleValues.indexOf(value);
    if (i !== -1) {
      possibleValues.splice(i, 1);
      return {
        id: id,
        value: value,
        action: 'removed'
      };
    }
  };

  this.userReset = function () {
    solvedByUser = false;
    return reset();
  };

  this.appReset = function () {
    if (!solvedByUser) {
      return reset();
    }
  };

  function solve(value) {
    solvedValue = value;
    possibleValues = [];
    return {
      id: id,
      value: value
    };
  }

  function reset() {
    solvedValue = undefined;
    possibleValues = initializeValues();
    return {
      id: id,
      action: 'reset'
    };
  }

  this.isSolved = function () {
    return !!solvedValue;
  };

  this.getSolvedValue = function () {
    return solvedValue;
  };

  this.lastPossibleValue = function () {
    if (possibleValues.length === 1) {
      return possibleValues[0];
    }
  };

  this.couldBe = function (value) {
    return possibleValues.indexOf(value) !== -1;
  };

  function initializeValues() {
    var collection = [];
    for (var i = 1; i <= 9; i++) {
      collection.push(i);
    }
    return collection;
  }
}

function Puzzle() {
  var core = createCore();
  var blocks = blocksAssembler(core);

  this.solveCell = function (x, y, value) {
    var cell = core[x][y];
    return cell.userSolve(value);
  };

  this.solveCycle = function () {
    var actions = [];
    blocks.forEach(function (block) {
      actions = actions.concat(block.hit());
    });
    return actions;
  };

  this.reset = function (x, y) {
    var actions = [];
    actions.push(core[x][y].userReset());
    actions = actions.concat(resetCells());
    resetBlocks();
    return actions;
  };

  function createCore() {
    var matrix = [];
    for (var i = 0; i < 9; i++) {
      matrix.push(createRow(i));
    }
    return matrix;
  }

  function createRow(i) {
    var row = [];
    for (var j = 0; j < 9; j++) {
      row.push(new Cell(i, j));
    }
    return row;
  }

  function resetCells() {
    var actions = [];
    core.forEach(function (row) {
      row.forEach(function (cell) {
        var params = cell.appReset();
        if (params) {
          actions.push(params);
        }
      });
    });
    return actions;
  }

  function resetBlocks() {
    blocks.forEach(function (block) {
      block.reset();
    });
  }
}

function ILoveSudoku() {
  var controller = new Controller();

  var view = new View(controller);
  controller.saveView(view);

  var puzzle = new Puzzle();
  controller.saveModel(puzzle);
}

var app = new ILoveSudoku();