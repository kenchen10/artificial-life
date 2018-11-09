function initializeArrayr4(cols, rows) {
  //creates an initial 2D array of 1 or 0 values
  let grid = make2DArray(cols, rows);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = 1;
    }
  }
  grid[int(cols/2)][int(rows/2)] = 0;
  grid[int(cols/2)+1][int(rows/2)] = 0;
  grid[int(cols/2)+2][int(rows/2)] = 0;
  grid[int(cols/2)][int(rows/2)+1] = 0;
  grid[int(cols/2)+2][int(rows/2)+1] = 0;
  grid[int(cols/2)][int(rows/2)+2] = 0;
  grid[int(cols/2)+1][int(rows/2)+2] = 0;
  grid[int(cols/2)+2][int(rows/2)+2] = 0;
  return grid;
}

function showArrayr4(grid) {
  //shows grid of cells
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * resolution;
      let y = j * resolution;
      noStroke();
      if (grid[i][j] == off && history[i][j] == true) {
        fill(140, 158, 255);
        rect(x, y, resolution, resolution);
      } else if (grid[i][j] == on) {
        fill(255, 205, 210);
        rect(x, y, resolution, resolution);
      }
    }
  }
}

function computeNextr4(grid, next) {
  // Compute next based on grid
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let state = grid[i][j];
      // Count live neighbors
      if (state == off && countNeighborsr4(grid, i, j) == 2) {
        next[i][j] = on;
        history[i][j] = true;
      } else {
        next[i][j] = off;
      }
    }
  }
}

function countNeighborsr4(grid, x, y) {
  //counts number of neighbors
  let sum = 0;
  for (let i = -2; i < 3; i++) {
    for (let j = -2; j < 3; j++) {
      let col = (x + i + cols) % cols;
      let row = (y + j + rows) % rows;
      if (grid[col][row] == on) {
        sum += 1;
      }
    }
  }
  return sum;
}

//______________________________________________________________________________

function initializeArrayr5(cols, rows) {
  //creates an initial 2D array of 1 or 0 values
  let grid = make2DArray(cols, rows);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = int(random(2));
    }
  }
  return grid;
}

function showArrayr5(grid) {
  //shows grid of cells
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * resolution;
      let y = j * resolution;
      noStroke();
      if (grid[i][j] == off && history[i][j] == true) {
        fill(140, 158, 255);
        rect(x, y, resolution, resolution);
      } else if (grid[i][j] == on) {
        fill(255, 205, 210);
        rect(x, y, resolution, resolution);
      }
    }
  }
}

function computeNextr5(grid, next) {
  // Compute next based on grid
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let state = grid[i][j];
      // Count live neighbors
      if (state == off && countNeighborsr5(grid, i, j) == 3) {
        next[i][j] = on;
        history[i][j] = true;
      } else {
        next[i][j] = off;
      }
    }
  }
}

function countNeighborsr5(grid, x, y) {
  //counts number of neighbors
  let sum = 0;
  for (let i = -2; i < 2; i++) {
    for (let j = -2; j < 2; j++) {
      let col = (x + i + cols) % cols;
      let row = (y + j + rows) % rows;
      if (grid[col][row] == on) {
        sum += 1;
      }
    }
  }
  return sum;
}

//______________________________________________________________________________
function initializeArrayr6(cols, rows, states) {
  //creates an initial 2D array of 1 or 0 values
  let grid = make2DArray(cols, rows);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = int(random(states));
    }
  }
  return grid;
}

function showArrayr6(grid, states) {
  if (identify) {
    showHelper(states, colors1);
  } else {
    showHelper(states, colors);
  }
}

function computeNextr6(grid, next, states, t, r, fn) {
  // Compute next based on grid
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let state = grid[i][j];
      // Count live neighbors
      if (fn == 1) {
        next[i][j] = moore(t, r, states, i , j);
      } else {
        next[i][j] = vn(t, r, states, i , j);
      }
    }
  }
}

function showHelper(states, color) {
  let arr = new Array(states);
  for (let i = 0; i < states; i++) {
    arr[i] = 0;
  }
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      var state = grid[i][j];
      let x = i * resolution;
      let y = j * resolution;
      noStroke();
      for (let k = 0; k < states; k++) {
        if (state == k) {
          arr[k] += 1;
          fill(color[k][0], color[k][1], color[k][2]);
          rect(x, y, resolution, resolution);
          break;
        }
      }
    }
  }
  if (!hide) {
    fill(232, 234, 246);
    rect(width/95, height/2.3, width/9.3+width/120, width/150 * (num_states+3)+height/40*6, 2);
    let w = width/9.3+width/120;
    var total = 0;
    for (let i = 0; i < arr.length; i++) {
      total += arr[i];
    }
    for (let i = 0; i < states; i++) {
      fill(color[i][0], color[i][1], color[i][2]);
      rect(width/95, height/2.3 + width/150 * (i+2)+height/40*6, int(arr[i]/total*w), width/150);
    }
  }
}

function countNeighborsr6(grid, x, y, states) {
  //counts number of neighbors
  let sum = 0;
  let state = grid[x][y];
  let left = grid[(x - 1 + cols) % cols][(y + 0 + rows) % rows];
  let right = grid[(x + 1 + cols) % cols][(y + 0 + rows) % rows];
  let up = grid[(x + cols) % cols][(y + 1 + rows) % rows];
  let down = grid[(x + cols) % cols][(y - 1 + rows) % rows];
  if (left == (state+1)%states) {
    sum += 1;
  } if (right == (state+1)%states) {
    sum += 1;
  } if (up == (state+1)%states) {
    sum += 1;
  } if (down == (state+1)%states) {
    sum += 1;
  }
  if (sum >= 1) {
    return (grid[x][y] + 1) % states;
  }
  return grid[x][y];
}

//______________________________________________________________________________
function initializeArrayr7(cols, rows) {
  //creates an initial 2D array of 1 or 0 values
  let grid = make2DArray(cols, rows);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = int(random(3));
    }
  }
  return grid;
}

function showArrayr7(grid) {
  //shows grid of cells
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * resolution;
      let y = j * resolution;
      noStroke();
      if (grid[i][j] == 0) {
        fill(140, 158, 255);
        rect(x, y, resolution, resolution);
      } else if (grid[i][j] == 1) {
        fill(20, 205, 12);
        rect(x, y, resolution, resolution);
      } else if (grid[i][j] == 2) {
        fill(10, 205, 210);
        rect(x, y, resolution, resolution);
      }
      // else if (grid[i][j] == 3) {
      //   fill(10, 12, 210);
      //   rect(x, y, resolution, resolution);
      //}
      //else if (grid[i][j] == 4) {
      //   fill(108, 5, 210);
      //   rect(x, y, resolution, resolution);
      // } else if (grid[i][j] == 5) {
      //   fill(108, 30, 210);
      //   rect(x, y, resolution, resolution);
      // } else if (grid[i][j] == 6) {
      //   fill(108, 30, 100);
      //   rect(x, y, resolution, resolution);
      // }
    }
  }
}

function computeNextr7(grid, next) {
  // Compute next based on grid
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let state = grid[i][j];
      // Count live neighbors
      next[i][j] = countNeighborsr7(grid, i, j);
    }
  }
}

function countNeighborsr7(grid, x, y) {
  //counts number of neighbors
  let sum = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      let col = (x + i + cols) % cols;
      let row = (y + j + rows) % rows;
      if (grid[x][y] == 0 && grid[col][row] == 1) {
        sum += 1;
      } else if (grid[x][y] == 1 && grid[col][row] == 2) {
        sum += 1;
      } else if (grid[x][y] == 2 && grid[col][row] == 0) {
        sum += 1;
      }
      // else if (grid[x][y] == 3 && grid[col][row] == 4) {
      //   sum += 1;
      // } else if (grid[x][y] == 4 && grid[col][row] == 5) {
      //   sum += 1;
      // } else if (grid[x][y] == 5 && grid[col][row] == 6) {
      //   sum += 1;
      // } else if (grid[x][y] == 6 && grid[col][row] == 0) {
      //   sum += 1;
      // }
    }
  }
  if (sum >= 3) {
    return (grid[x][y] + 1) % 3;
  }
  return grid[x][y];
}


//______________________________________________________________________________
function initializeArrayr8(cols, rows) {
  //creates an initial 2D array of 1 or 0 values
  let grid = make2DArray(cols, rows);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = 0;
    }
  }
  grid[int(cols/2)][int(rows/2)] = 1;
  return grid;
}

function showArrayr8(grid) {
  //shows grid of cells
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * resolution;
      let y = j * resolution;
      if (grid[i][j] == 0) {
        fill(255);
        noStroke();
        rect(x, y, resolution, resolution);
      } else if (grid[i][j] == 1) {
        fill(0);
        noStroke();
        rect(x, y, resolution, resolution);
      }
    }
  }
}

function computeNextr8(grid, next) {
  // Compute next based on grid
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let state = grid[i][j];
      // Count live neighbors
        if (countNeighbors(grid, i, j)==0 && state == 0) {
          next[i][j] = 0;
        } else {
      next[i][j] = countNeighborsr8(grid, i, j);
      }
    }
  }
}

function countNeighborsr8(grid, x, y) {
  //counts number of neighbors
  let ll = grid[(x + cols) % cols][(y-1+rows)%rows];
  let l = grid[(x + cols) % cols][(y+1+rows)%rows];
  let m = grid[(x - 1 + cols) % cols][(y+rows)%rows];
  let r = grid[(x + 1+ cols) % cols][(y+rows)%rows];
  if (ll == 0 && l == 0 && m == 0 && r == 0) {
    return rule[0];
  } else if (ll == 0 && l == 0 && m == 0 && r == 1) {
    return rule[1];
  } else if (ll == 0 && l == 0 && m == 1 && r == 0) {
    return rule[2];
  } else if (ll == 0 && l == 0 && m == 1 && r == 1) {
    return rule[3];
  } else if (ll == 0 && l == 1 && m == 0 && r == 0) {
    return rule[4];
  } else if (ll == 0 && l == 1 && m == 0 && r == 1) {
    return rule[5];
  } else if (ll == 0 && l == 1 && m == 1 && r == 0) {
    return rule[6];
  } else if (ll == 0 && l == 1 && m == 1 && r == 1) {
    return rule[7];
  } else if (ll == 1 && l == 0 && m == 0 && r == 0) {
    return rule[8];
  } else if (ll == 1 && l == 0 && m == 0 && r == 1) {
    return rule[9];
  } else if (ll == 1 && l == 0 && m == 1 && r == 0) {
    return rule[10];
  } else if (ll == 1 && l == 0 && m == 1 && r == 1) {
    return rule[11];
  } else if (ll == 1 && l == 1 && m == 0 && r == 0) {
    return rule[12];
  } else if (ll == 1 && l == 1 && m == 0 && r == 1) {
    return rule[13];
  } else if (ll == 1 && l == 1 && m == 1 && r == 0) {
    return rule[14];
  } else if (ll == 1 && l == 1 && m == 1 && r == 1) {
    return rule[15];
  }
}
//________________________________________________________________
function initializeArrayEat(cols, rows) {
  //creates an initial 2D array of 1 or 0 values
  let grid = make2DArray(cols, rows);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = int(random(6));
    }
  }
  return grid;
}

function showArrayEat(grid) {
  //shows grid of cells
  var a = 0;
  var b = 0;
  var c = 0;
  var d = 0;
  var e = 0;
  var f = 0;
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      var state = grid[i][j];
      let x = i * resolution;
      let y = j * resolution;
      noStroke();
      if (state == 0) {a+=1;}
      if (state == 1) {b+=1;}
      if (state == 2) {c+=1;}
      if (state == 3) {d+=1;}
      if (state == 4) {e+=1;}
      if (state == 5) {f+=1;}
      if (grid[i][j] == 0) {
        fill(140, 158, 255);
        rect(x, y, resolution, resolution);
      } else if (grid[i][j] == 1) {
        fill(20, 205, 12);
        rect(x, y, resolution, resolution);
      } else if (grid[i][j] == 2) {
        fill(10, 205, 210);
        rect(x, y, resolution, resolution);
      } else if (grid[i][j] == 3) {
        fill(10, 12, 210);
        rect(x, y, resolution, resolution);
      } else if (grid[i][j] == 4) {
        fill(108, 5, 210);
        rect(x, y, resolution, resolution);
      } else if (grid[i][j] == 5) {
        fill(108, 90, 210);
        rect(x, y, resolution, resolution);
      }
    }
  }
  if (!hide) {
    fill(232, 234, 246);
    rect(width/95, height/2.42, width/9.3+width/120, resolution * 12, 2);
    let w = width/9.3+width/120;
    var total = a+b+c+d+e+f;
    print(a, total);
    fill(140, 158, 255);
    rect(width/95, height/2.3 + height/40, int(a/total*w), resolution);
    fill(20, 205, 12);
    rect(width/95, height/2.3 + resolution + height/40, int(b/total*w), resolution);
    fill(10, 205, 210);
    rect(width/95, height/2.3 + 2*resolution + height/40, int(c/total*w), resolution);
    fill(10, 12, 210);
    rect(width/95, height/2.3 + 3*resolution + height/40, int(d/total*w), resolution);
    fill(108, 5, 210);
    rect(width/95, height/2.3 + 4 * resolution + height/40, int(e/total*w), resolution);
    fill(108, 90, 210);
    rect(width/95, height/2.3 + 5 * resolution + height/40, int(f/total*w), resolution);
  }
}

function computeNextEat(grid, next) {
  // Compute next based on grid
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let state = grid[i][j];
      // Count live neighbors
      next[i][j] = countNeighborsEat(grid, i, j);
    }
  }
}

function countNeighborsEat(grid, x, y) {
  //counts number of neighbors
  let sum = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      let col = (x + i + cols) % cols;
      let row = (y + j + rows) % rows;
      if (grid[x][y] == 0 && grid[col][row] == 1) {
        sum += 1;
      } else if (grid[x][y] == 1 && grid[col][row] == 2) {
        sum += 1;
      } else if (grid[x][y] == 2 && grid[col][row] == 3) {
        sum += 1;
      } else if (grid[x][y] == 3 && grid[col][row] == 4) {
        sum += 1;
      } else if (grid[x][y] == 4 && grid[col][row] == 5) {
        sum += 1;
      } else if (grid[x][y] == 5 && grid[col][row] == 0) {
        sum += 1;
      }
    }
  }
  if (sum >= 2) {
    return (grid[x][y] + 1) % 6;
  }
  return grid[x][y];
}
