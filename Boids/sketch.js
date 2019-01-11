var allBoids = [];
var c = 65;
var sign = -.095;
var allObstacles = []
var ft;
let w1;
let w2;
let w3;
let w4;
let gui;
let mouseOn;
var w1Slider, w2Slider, w3Slider, w4Slider, w5Slider, numBoidsSlider, toggleStuff;
let stuffOn;
var maxSpeedToggle, maxForceToggle;

//preload font
function preload() {
  ft = loadFont('/fonts/SourceSansPro-ExtraLight.otf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < 100; i++) {
    let b = new Boid(random(width), random(height));
    allBoids.push(b);
  }
  // create sliders
  w1Slider = createSlider(0, 5, 0.9);
  w1Slider.position(20, 20);
  w2Slider = createSlider(0, 10, 2);
  w2Slider.position(20, 50);
  w3Slider = createSlider(0, 10, 1);
  w3Slider.position(20, 80);
  w4Slider = createSlider(0, 10, 0);
  w4Slider.position(20, 110);
  w5Slider = createSlider(0, 20, 10);
  w5Slider.position(20, 140);
  numBoidsSlider = createSlider(0, 200, 100);
  numBoidsSlider.position(20, 170);
  maxSpeedToggle = createSlider(0, 10, 3);
  maxSpeedToggle.position(20, 200);
  maxForceToggle = createSlider(0, .3, .05);
  maxForceToggle.position(20, 230);
  w1Slider.elt.step = .1;
  w2Slider.elt.step = .1;
  w3Slider.elt.step = .1;
  w4Slider.elt.step = .1;
  w5Slider.elt.step = .1;
  maxSpeedToggle.elt.step = .1;
  maxForceToggle.elt.step = .01;
  toggleStuff = createButton('toggle info');
  toggleStuff.position(w5Slider.x, maxForceToggle.y + 30);
  toggleStuff.mousePressed(() => stuffOn = !stuffOn);
  //mouseOn = new Button(width/70, height/70, width/19, height/30, "mouse");
  stuffOn = false;
}

function draw() {
  //background gradient
  //gradient();
  let boundary = new Rectangle(width / 2, height / 2, width / 2, height / 2);
  qtree = new QuadTree(boundary, 4);
  background(255);
  fill(0);
  textFont('SourceSansPro-ExtraLight');
  text("cohesion: " + w1Slider.value(), w1Slider.x * 2 + w1Slider.width, 30);
  text("separation: " + w2Slider.value(), w2Slider.x * 2 + w2Slider.width, 60);
  text("alignment: " + w3Slider.value(), w3Slider.x * 2 + w3Slider.width, 90);
  text("mouse: " + w4Slider.value(), w2Slider.x * 2 + w2Slider.width, 120);
  text("obstacle (space/r): " + w5Slider.value(), w3Slider.x * 2 + w3Slider.width, 150);
  text("number of boids: " + numBoidsSlider.value(), numBoidsSlider.x * 2 + numBoidsSlider.width, 180);
  text("max speed: " + maxSpeedToggle.value(), maxSpeedToggle.x * 2 + maxSpeedToggle.width, 210);
  text("max force: " + maxForceToggle.value(), maxForceToggle.x * 2 + maxForceToggle.width, 240);
  for (let b of allBoids) {
    let point = new Point(b.x, b.y, b);
    qtree.insert(point);
  }
  let numSlider = numBoidsSlider.value();
  let n = allBoids.length;
  if (numSlider != n) {
    if (n < numSlider) {
      let diff = numSlider - n;
      for (let i = 0; i < diff; i++) {
        let b = new Boid(random(width), random(height));
        allBoids.push(b);
      }
    } else {
      let diff = n - numSlider;
      for (let i = 0; i < diff; i++) {
        allBoids.pop();
      }
    }
  }

  for (let p of allBoids) {

    let range = new Circle(p.x, p.y, p.vision/2);

    let points = qtree.query(range);
    for (let point of points) {
      let other = point.userData;
      if (p != other) {
        let d = dist(p.x, p.y, other.x, other.y);
        if (d < p.vision + other.vision) {
          p.others.push(other);
          p.highlight = true;
        }
      }
    }
  }


  for (let p of allBoids) {
    for (let o of p.others) {
      o.highlight = true;
    }
    // p.disp()
    // p.mv();
    p.run(allBoids);
  }

  for (let p of allBoids) {
    p.highlight = false;
    p.others = [];
  }

  // for (let b of allBoids) {
  //   b.run(allBoids);
  // }
  for (let o of allObstacles) {
    o.draw(allObstacles);
  }

}

// function mouseDragged() {
//   //create a new boid on mouse drag
//   let b = new Boid(mouseX, mouseY);
//   allBoids.push(b);
// }

function keyTyped() {
  let o = new Obstacle(mouseX, mouseY);
  if (key === ' ') {
    //create a new obstacle on space press
    allObstacles.push(o);
  }
  if (key === 'r') {
    //remove obstacle by pressing r
    o.remove(allObstacles);
  }
}

//Color gradient background
function gradient() {
  if (c >= 100 || c <= 65) {
    sign *= -1;
    c += sign;
  } else {
    c += sign;
  }
  background(77, c, 77);
}

function textBox() {
  textFont('SourceSansPro-ExtraLight');
  fill('black');
  textSize(14);
  text('Drag your mouse to put down some Boids.', 10, 40);
  textSize(14);
  text('Press \'space\' to put down an obstacle.', 10, 70);
  textSize(14);
  text('Press \'r\' to get rid of an obstacle.', 10, 85);
}
