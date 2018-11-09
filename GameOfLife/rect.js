class Rect {

  constructor( x,  y,  w,  ht,  c,  b,  h,  curr,  over) {
    this.rectOver = false;
    this.ignore = false;
    this.is_3 = false;
    this.is_on = false;
    this.is_5 = false;
    this.v;
    this.is_start = false;
    this.rectX = x;
    this.rectY = y;
    this.rectW = w;
    this.rectH = ht;
    this.rectColor = c;
    this.baseColor = color(255);
    this.rectHighlight = color(200);
    this.currentColor = curr;
    this.rectOver = over;
  }

  draw_rect() {
    if (this.is_on) {
      fill(10, 255, 10);
      noStroke();
      rect(this.rectX, this.rectY, this.rectW, this.rectH);
    }
    else {
      this.currentColor = this.rectColor;
      fill(this.currentColor);
      noStroke();
      rect(this.rectX, this.rectY, this.rectW, this.rectH);
    }
  }

 overRect( x,  y,  w,  h)  {
    if (mouseX >= x && mouseX <= x+w &&
        mouseY >= y && mouseY <= y+h) {
      return true;
    } else {
      return false;
    }
  }

 update() {
    if (this.overRect(this.rectX, this.rectY, this.rectW, this.rectH) && !this.ignore) {
      this.rectColor = this.rectHighlight;
      this.rectOver = true;
    } else {
      this.rectColor = this.baseColor;
      this.rectOver = false;
    }
  }

}
