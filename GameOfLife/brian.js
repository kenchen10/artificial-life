let alive = 0;
let dying = 1;
let dead = 2;

function initializeArrayBrian(cols, rows, xval, yval) {
  //creates an initial 2D array of 1 or 0 values
  let grid = make2DArray(cols, rows);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
        grid[i][j] = int(random(3));
    }
  }
  return grid;
}

function showArrayBrian(grid) {
  //shows grid of cells
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * resolution;
      let y = j * resolution;
      noStroke();
      if (grid[i][j] == dead && history[i][j] == true) {
        fill(0);
        noStroke();
        rect(x, y, resolution, resolution);
      } else if (grid[i][j] == alive) {
        history[i][j] = true;
        noStroke();
        rect(x, y, resolution, resolution);
      } else if (grid[i][j] == dying) {
        fill(100, 205, 210);
        noStroke();
        rect(x, y, resolution, resolution);
      }
    }
  }
}

function computeNextBrian(grid, next) {
  // Compute next based on grid
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let state = grid[i][j];
      // Count live neighbors
      let neighbors = countNeighborsBrian(grid, i, j);

      if (state == dead) {
        if (countNeighborsBrian(grid, i, j) == 2) {
          next[i][j] = alive;
        } else {
          next[i][j] = dead;
        }
      } else if (state == dying) {
        next[i][j] = dead;
      } else if (state == alive) {
        next[i][j] = dying;
      }
    }
  }
}

function countNeighborsBrian(grid, x, y) {
  //counts number of neighbors
  let sum = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      let col = (x + i + cols) % cols;
      let row = (y + j + rows) % rows;
      if (grid[col][row] == alive) {
        sum += 1;
      }
    }
  }
  return sum;
}
