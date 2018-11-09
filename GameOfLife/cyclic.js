function moore(t, r, states, x, y) {
  let sum = 0;
  for (let i = -r; i < r + 1; i ++) {
    for (let j = -r; j < r + 1; j++) {
      let col = (x + i + cols) % cols;
      let row = (y + j + rows) % rows;
      let state = grid[x][y];
      if (grid[col][row] == (state + 1) % states) {
        sum += 1;
      }
    }
  }
  if (sum >= t) {
    return (grid[x][y] + 1) % states;
  }
  return grid[x][y];
}

function vn(t, r, states, x, y) {
  let k = r;
  let sum = 0;
  for (let i = 0; i < r + 1; i++) {
    for (let j = -r + i; j < r - i + 1; j++) {
      let col = (x + i + cols) % cols;
      let row = (y + j + rows) % rows;
      let state = grid[x][y];
      if (grid[col][row] == (state + 1) % states) {
        sum += 1;
      }
    }
  }
  for (let i = -1; i > -r - 1; i--) {
    for (let j = -r - i; j < r + i + 1; j++) {
      let col = (x + i + cols) % cols;
      let row = (y + j + rows) % rows;
      let state = grid[x][y];
      if (grid[col][row] == (state + 1) % states) {
        sum += 1;
      }
    }
  }
  if (sum >= t) {
    return (grid[x][y] + 1) % states;
  }
  return grid[x][y];
}
