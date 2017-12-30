function setup() {
	createCanvas(windowWidth, windowHeight);
	old_array = initializeCells();
}

function draw() {
	background(0);
	showCells(old_array);
	var new_array = make2DArray(numColumns, numRows);
	new_array = updateCells(old_array, new_array);
	old_array = new_array;
}
