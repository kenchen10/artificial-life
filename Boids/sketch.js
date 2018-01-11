var allBoids = [];
var c = 50;
var sign = -.15

function setup() {
	createCanvas(windowWidth, windowHeight);
}

function draw() {
	//background gradient
  gradient();
	for (let b of allBoids) {
		b.run(allBoids);
	}
	fill(0);
}

function mouseDragged() {
	//create a new boid on mouse drag
	let b = new Boid(mouseX, mouseY);
	allBoids.push(b);
}

//Color gradient background
function gradient() {
  if (c >= 125 || c <= 50) {
    sign *= -1;
    c += sign;
  }
  else {
    c += sign;
  }
  background(c, 77, c);
}
