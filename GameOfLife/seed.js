let on = 0;
let off = 1;
function initializeArraySeed(cols, rows) {
  //creates an initial 2D array of 1 or 0 values
  let grid = make2DArray(cols, rows);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = int(random(2));
    }
  }
  return grid;
}

function showArraySeed(grid) {
  //shows grid of cells
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * resolution;
      let y = j * resolution;
      if (grid[i][j] == off && history[i][j] == true) {
        fill(255, 205, 210);
        noStroke();
        rect(x, y, resolution, resolution);
      } else if (grid[i][j] == on) {
        fill(140, 158, 255);
        noStroke();
        rect(x, y, resolution, resolution);
      }
    }
  }
}

function computeNextSeed(grid, next) {
  // Compute next based on grid
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let state = grid[i][j];
      // Count live neighbors
      if (state == off && countNeighborsSeed(grid, i, j) == 2) {
        next[i][j] = on;
        history[i][j] = true;
      } else {
        next[i][j] = off;
      }
    }
  }
}

function countNeighborsSeed(grid, x, y) {
  //counts number of neighbors
  let sum = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      let col = (x + i + cols) % cols;
      let row = (y + j + rows) % rows;
      if (grid[col][row] == on) {
        sum += 1;
      }
    }
  }
  return sum;
}
