let grid;
let cols;
let rows;
let resolution = 7;

function setup() {
  createCanvas(windowWidth, windowHeight);
  cols = round(width / resolution);
  rows = round(height / resolution);
  //create initial array of array with random 0 or 1 value
  grid = initializeArray(cols, rows);
}

function draw() {
  //background gradient
  gradient();
  //show array
  showArray(grid);
  //update array based on rules
  let next = make2DArray(cols, rows);
  trail(grid, next);
  grid = next;
}
