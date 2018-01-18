var c = 50;
var sign = -.15;
let bool;

function make2DArray(cols, rows) {
  //creates a 2D array
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

function initializeArray(cols, rows) {
  //creates an initial 2D array of 1 or 0 values
  let grid = make2DArray(cols, rows);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = floor(random(2));
    }
  }
  return grid;
}

function showArray(grid) {
  //shows grid of cells
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * resolution;
      let y = j * resolution;
      if (grid[i][j] == 1) {
        fill(255);
        noStroke();
        rect(x, y, resolution - 1, resolution - 1);
      } //else if (bool[i][j] == true) {
      //   fill(20);
      //   stroke(0);
      //   rect(x, y, resolution - 1, resolution - 1);
      // }
    }
  }
}

function computeNext(grid, next) {
  // Compute next based on grid
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let state = grid[i][j];
      // Count live neighbors
      let neighbors = countNeighbors(grid, i, j);

      if (state == 0 && neighbors == 3) {
        next[i][j] = 1;
      } else if (state == 1 && (neighbors < 2 || neighbors > 3)) {
        next[i][j] = 0;
      } else {
        next[i][j] = state;
      }
    }
  }
}

function trail(grid, next) {
  computeNext(grid, next);
  let bool = make2DArray(cols, rows);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let state1 = grid[i][j];
      let state2 = next[i][j];

      if (state1 == 1 && state2 == 0) {
        bool[i][j] = true;
      } else {
        bool[i][j] = false;
      }
    }
  }
}

function countNeighbors(grid, x, y) {
  //counts number of neighbors
  let sum = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      let col = (x + i + cols) % cols;
      let row = (y + j + rows) % rows;
      sum += grid[col][row];
    }
  }
  sum -= grid[x][y];
  return sum;
}

//Color gradient background
function gradient() {
  if (c >= 125 || c <= 50) {
    sign *= -1;
    c += sign;
  } else {
    c += sign;
  }
  background(c, 77, c);
}
