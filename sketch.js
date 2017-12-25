var allBoids = [];

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
	let b = new Boid(mouseX, mouseY);
	allBoids.push(b);
}
