class Obstacle {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.r = 10;
  }

  draw() {
    fill(144, 202, 249);
    noStroke();
    ellipse(this.position.x, this.position.y, this.r, this.r);
  }

  remove(array) {
    array.splice(array.length - 1, array.length);
  }
}
