var arrayWidth = windowWidth;
var arrayHeight = windowHeight;
var density = 10;
var numColumns = arrayWidth / density;
var numRows = arrayHeight / density;

function make2DArray(columns, rows) {
  //Creates an array of arrays with 'rows' number of rows and 'columns' number of columns.
  var array = new Array(columns);
  for (let i = 0; i < array.length; i++) {
    array[i] = new Array(rows);
  }
  return array;
}

function countNumNeighbors(array, x_current, y_current) {
  //Computes number of cells that neighbor the current cell.
  var sum = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      var column = (x_current + i + numColumns) %  numColumns;
      var row = (y_current + i + numRows) %  numRows;
      sum += array[column][row];
    }
  }
  sum -= array[x_current, y_current];
  return sum;
}

function initializeCells() {
  //Creates initial random cell locations.
  var array = make2DArray(numColumns, numRows);
  for (let i = 0; i < numColumns; i++) {
    for (let j = 0; j < numRows; j++) {
      array[i][j] = floor(random(2));
    }
  }
  return array;
}

function showCells(array) {
  //Shows cells.
  for (let i = 0; i < numColumns; i++) {
    for (let j = 0; j < numRows; j++) {
      var length = i * density;
      var width = j * density;
      if (array[i][j] == 1) {
        fill(255);
        stroke(0);
        rect(length, width, density, density);
      }
    }
  }
}

function updateCells(old_array, new_array) {
  /* Computes the new array based on rules described by Conway:
  1.Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
  2.Any live cell with two or three live neighbours lives on to the next generation.
  3.Any live cell with more than three live neighbours dies, as if by overpopulation.
  4.Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction. */
  for (let i = 0; i < numColumns; i++) {
    for (let j = 0; j < numRows; j++) {
      var array_value = array[i][j];
      var sum = 0;
      var num_neighbors = countNumNeighbors(old_array, i, j);

      if (array_value == 0 && num_neighbors == 3) {
        new_array[i][j] = 1;
      }
      else if (array_value == 1 && (num_neighbors < 2 || num_neighbors > 3)) {
        new_array[i][j] = 0;
      }
      else {
        new_array[i][j] = array_value;
      }
      }
    }
  }
  return new_array;
}
