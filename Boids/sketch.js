var allBoids = [];

function preload() {
	img = loadImage('images/frame_0');
}

function setup() {
	createCanvas(windowWidth, windowHeight);
}

function draw() {
	background(255);
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
