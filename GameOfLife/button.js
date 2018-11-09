class Button {
  constructor(xx, yy, ww, hh, tt) {
    this.x = xx;
    this.y = yy;
    this.w = ww;
    this.h = hh;
    this.over = false;
    this.t = tt;
    this.baseColor = color(255);
    this.c = color(255);
    this.hover = color(200);
    this.on = false;
  }
  isOver() {
    if (mouseX >= this.x && mouseX <= this.x + this.w && mouseY >= this.y && mouseY <= this.y + this.h) {
      this.over = true;
      this.c = this.hover;
    } else {
      this.over = false;
      this.c = this.baseColor;
    }
  }
  display() {
    noStroke();
    fill(this.c);
    rect(this.x, this.y, this.w, this.h, 2);
    fill(0);
    textSize(height/50)
    textFont(ft);
    textAlign(CENTER);
    text(this.t, this.x, this.y + this.h/1.5, this.w);
  }
}
