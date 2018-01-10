var font;
var vehicles = [];
var c = 0;
var sign = -.2;
var txt1 = "kenny chen";
var txt2 = "about";
var txt3 = "contact";
var txt4 = "projects";
var txt5 = "resume";
var presses = 0;
var configuration = 1;
var about, resume, contact, projects;

function preload() {
  font = loadFont('AvenirNextLTPro-Demi.otf');
}

function setup() {
  createCanvas(windowWidth, windowHeight - windowHeight / 12);

  var points = font.textToPoints(txt1, windowWidth / 20, windowHeight / 4.6, windowWidth/8, {
    sampleFactor: 0.13
  });

  for (pt of points) {
    var vehicle = new Vehicle(pt.x, pt.y);
    vehicles.push(vehicle);
  }

  dom();
}

function draw() {
  gradient();
  for (let v of vehicles) {
    v.behaviors();
    v.update();
    v.show();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
