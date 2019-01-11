//Flocking algorithm described in 1986 paper by Craig Reynolds.

class Boid {
  //Boid class, describes flocking behavior of a single boid.
  constructor(x, y) {
    this.acceleration = createVector(0, 0)
    this.velocity = createVector(random(-1, 1), random(-1, 1));
    this.position = createVector(x, y);
    this.x = x;
    this.y = y;
    this.maxSpeed = 1;
    this.maxForce = .05;
    this.sepDist = 50.0;
    this.vision = 50;
    this.others = [];
    this.highlight = false;
    this.r = 6;
    this.bodyWidth = random(4, 10);
    this.bodyLength = random(10, 30)
  }

  display(allBoids) {
    let color = [this.velocity.mag() * 80, 59, 154];
    // if (this.highlight) {
    //   color = [255,0,0];
    // } else {color = [this.velocity.mag() * 80, 59, 154];}
    var angle = this.velocity.heading() + radians(90);
    push();
    translate(this.position.x, this.position.y);
    rotate(angle);
    beginShape();
    fill(color[0],color[1],color[2]);
    noStroke();
    ellipse(0, 0, this.bodyWidth, this.bodyLength);
    if (stuffOn) {
      noFill();
      stroke(230);
      ellipse(0,0,this.vision*2, this.vision*2); // vision radius
    }
    fill(255, 235, 238);
    ellipse(1.5, -5, 2, 2);
    ellipse(-1.5, -5, 2, 2);
    endShape(CLOSE);
    pop();
  }

  disp() {
    if (this.highlight) fill(255,0,0)
    else fill(0)
    ellipse(this.x, this.y, this.r, this.r)
    noFill()
    stroke(0)
    ellipse(this.x, this.y, this.vision, this.vision)
  }

  mv() {
    this.x += random(-1,1)
    this.y += random(-1,1)
  }

  run(allBoids) {
    //runs the whole thing
    this.move(allBoids);
    this.changePosition();
    this.borders();
    this.display();
  }

  applyForce(force) {
    //changes acceleration based on force enacted on boid
    this.acceleration.add(force);
  }

  move(allBoids) {
    //For each boid, calculate how much it will be moved by each of the
    //operations.
    var v1 = this.rule1(allBoids);
    var v2 = this.rule2(allBoids);
    var v3 = this.rule3(allBoids);
    var v4 = this.rule4();
    var v5 = this.rule5(allObstacles);

    v1.mult(w1Slider.value()); //Weight
    v2.mult(w2Slider.value()); //Weight
    v3.mult(w3Slider.value()); //Weight
    v4.mult(w4Slider.value()); //Weight
    v5.mult(w5Slider.value()); //weight
    //Add vectors from 3 rules to current boid velocity.
    this.applyForce(v1);
    this.applyForce(v2);
    this.applyForce(v3);
    this.applyForce(v4);
    this.applyForce(v5);
  }

  borders() {
    //torus behavior of canvas
    if (this.position.x < 0) {
      this.position.x = windowWidth;
    }
    if (this.position.x > windowWidth) {
      this.position.x = 0;
    }
    if (this.position.y < 0) {
      this.position.y = windowHeight;
    }
    if (this.position.y > windowHeight) {
      this.position.y = 0;
    }
  }

  changePosition() {
    //Updates boid position
    this.velocity.add(this.acceleration); //update velocity
    this.velocity.limit(maxSpeedToggle.value()); //limit velocity
    this.position.add(this.velocity); //update position
    this.acceleration.mult(0); //make acceleration 0
  }

  seek(target) {
    //applies a steering force
    var desiredLoc = p5.Vector.sub(target, this.position); //vector from position to target

    desiredLoc.normalize(); //normalize/scale desired
    desiredLoc.mult(maxSpeedToggle.value());
    //steer = desired - velocity
    var steer = p5.Vector.sub(desiredLoc, this.velocity);
    steer.limit(maxForceToggle.value());
    return steer;
  }

  rule1(allBoids) {
    //Boids try to fly towards the center of mass of neighboring boids.
    var pc_j = createVector(0, 0);
    var count = 0;

    for (let b of allBoids) {
      var d = p5.Vector.dist(this.position, b.position);
      if ((d > 0) && (d < this.vision)) {
        pc_j.add(b.position);
        count++;
      }
    }
    if (count > 0) {
      pc_j.div(count);
      return this.seek(pc_j);
    } else {
      return createVector(0, 0);
    }
  }

  rule2(allBoids) {
    //Boids try to keep a small distance away from other objects (including
    //other boids).
    var c = createVector(0, 0);
    var count = 0;
    //check distance from each boid between boids
    for (let b of allBoids) {
      var d = p5.Vector.dist(this.position, b.position)
      if ((d > 0) && (d < this.vision)) {
        var difference = p5.Vector.sub(this.position, b.position);
        difference.normalize();
        difference.div(d);
        c.add(difference);
        count++;
      }
    }
    if (count > 0) {
      //average
      c.div(count);
    }
    if (c.mag() > 0) {
      //steer = desired - velocity
      c.normalize();
      c.mult(maxSpeedToggle.value());
      c.sub(this.velocity);
      c.limit(maxForceToggle.value());
    }
    return c;
  }

  rule3(allBoids) {
    //Boids try to match velocity with nearby boids.
    var pv_j = createVector(0, 0);
    var count = 0;

    for (let b of allBoids) {
      var d = p5.Vector.dist(this.position, b.position)
      if ((d > 0) && (d < this.vision)) {
        pv_j.add(b.velocity);
        count++;
      }
    }
    if (count > 0) {
      pv_j.div(count);
      pv_j.normalize();
      pv_j.mult(maxSpeedToggle.value());
      var steer = p5.Vector.sub(pv_j, this.velocity);
      steer.limit(maxForceToggle.value());
      return steer;
    } else {
      return createVector(0, 0);
    }
  }

  rule4() {
    //mouse force
    var mousePos = createVector(mouseX, mouseY);
    if (p5.Vector.dist(mousePos, this.position) < this.vision) {
      return this.seek(mousePos);
    } else {
      return createVector(0, 0);
    }
  }

  rule5(allObstacles) {
    //Obstacle Avoidance
    var c = createVector(0, 0);
    var count = 0;
    //check distance from each boid between obstacles
    for (let b of allObstacles) {
      var d = p5.Vector.dist(this.position, b.position)
      if ((d > 0) && (d < this.vision)) {
        var difference = p5.Vector.sub(this.position, b.position);
        difference.normalize();
        difference.div(d);
        c.add(difference);
        count++;
      }
    }
    if (count > 0) {
      //average
      c.div(count);
    }
    if (c.mag() > 0) {
      //steer = desired - velocity
      c.normalize();
      c.mult(maxSpeedToggle.value());
      c.sub(this.velocity);
      c.limit(maxForceToggle.value());
    }
    return c;
  }

}
