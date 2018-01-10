
//changes text based on button press
function changeState(text) {
  var points = font.textToPoints(text, windowWidth / 20, windowHeight / 4.6, windowWidth/8, {
    sampleFactor: 0.13
  });

  if (points.length > vehicles.length) {
    for (var i =0; i < vehicles.length; i++) {
        var pt = points[i];
        var v = vehicles[i];
        v.newTarget(pt.x, pt.y);
      }
    for (var i = vehicles.length; i < points.length; i++) {
      var pt = points[i];
      var vehicle = new Vehicle(pt.x, pt.y);
      vehicles.push(vehicle);
      }
  }
  else if (points.length < vehicles.length){
    for (var i = points.length; i < vehicles.length; i++) {
      var v = vehicles[i];
      v.newTarget(random(width), height);
      }
    for (var i =0; i < points.length; i++) {
      var pt = points[i];
      var v = vehicles[i];
      v.newTarget(pt.x, pt.y);
    }
  }
  else {
      for (var i =0; i < points.length; i++) {
      var pt = points[i];
      var v = vehicles[i];
      v.newTarget(pt.x, pt.y);
    }
  }
}

//Color gradient background
function gradient() {
  if (c >= 255 || c <= 0) {
    sign *= -1;
    c += sign;
  }
  else {
    c += sign;
  }
  background(c, 77, c);
}
