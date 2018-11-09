let grid;
let cols;
let rows;
let resolution = 7;
let history;
let rule;
let gameOfLifeOn = true;
let brianBrainOn = false;
let seedOn = false;
let r4On = false;
let r5On = false;
let r6On = false;
let r7On = false;
let r8On = false;
let pause = false;
let cycles3 = false;
let generation = 0;
let lines = false;
let gol;
let seed;
let drawing = false;
let tbox;
let r4;
let r5;
let r6;
let r7;
let r8;
let step;
let style;
let g2;
let identify = false;
let colors = [[255, 248, 225],[255, 236, 179],[255, 224, 130],
              [255, 213, 79],[255, 202, 40],[255, 193, 7],
              [255, 179, 0],[255, 160, 0],[255, 143, 0],
              [255, 111, 0],[255, 87, 34],[244, 81, 30],
              [230, 74, 25],[216, 67, 21],[191, 54, 12],
              [194, 24, 91],[173, 20, 87],[136, 14, 79]];
let colors1 = [[255, 235, 238],[244, 143, 177],[206, 147, 216],
              [179, 157, 219],[159, 168, 218],[144, 202, 249],
              [129, 212, 250],[77, 208, 225],[128, 203, 196],
              [165, 214, 167],[124, 179, 66],[220, 231, 117],
              [255, 245, 157],[255, 213, 79]]

let num_states = 14;
let R = 1;
let T = 1;
let fn = 0;

let hide = false;
let show;
let info;
let textInput;
let data;
let dict;
let checked = false;
let a = [];
let keyValues;

let survive = [2,3];
let born = [3];
let b0;
let b1;
let b2;
let b3;
let b4;
let b5;
let b6;
let b7;
let b8;
let b01;
let b12;
let b23;
let b34;
let b45;
let b56;
let b67;
let b78;
let b89;

let style2;
let canvas;
let r;

let tbox2;
let tbox3;
let tbox4;

function preload() {
  ft = loadFont('/fonts/SourceSansPro-ExtraLight.otf');
  data = [];
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  cols = round(width / resolution);
  rows = round(height / resolution);
  //create initial array of array with random 0 or 1 value
  grid = initializeArray(cols, rows, 4, 4);
  history = initializeArray2(cols, rows);
  rule = [0,1,1,0,0,0,1,1,1,0,1,0,1,1,1,1];
  gol = new Button(width/70, height/70 + height/20, width/19, height/30, "Game Of Life");
  r8 = new Button(width/70+width/18, height/70 + height/20, width/19, height/30, "Rule");
  seed = new Button(width/70 + width/18, height/70 + 2*height/20, width/19, height/30, "Seeds");
  brain = new Button(width/70, height/70 + 2 * height/20, width/19, height/30, "Brian's Brain");
  r4 = new Button(width/70 + width/18, height/70 + 3 * height/20, width/19, height/30, "r4");
  r5 = new Button(width/70, height/70 + 3 * height/20, width/19, height/30, "r5");
  r6 = new Button(width/70, height/70 + 4 * height/20, width/19, height/30, "Cycles");
  r7 = new Button(width/70 + width/18, height/70 + 4 * height/20, width/19, height/30, "Cycles 2");
  c3 = new Button(width/70, height/70 + 5 * height/20, width/19, height/30, "Cycles 3");
  d = new Button(width/70, height/70 + 7 * height/20, width/19, height/30, "Draw");
  id = new Button(width/70+width/18, height/70 + 5*height/20, width/19, height/30, "rgb");
  step = new Button(width/70, height/70 + 6 * height/20, width/19, height/30, "Step");
  p = new Button(width/70+width/18, height/70 + 6 * height/20, width/19, height/30, "Pause");
  tbox = new TEXTBOX(width/70 + width/32, height/70 + 8 * height/19.9, width/13, height/30);
  tbox2 = new TEXTBOX(width/70 + width/32, height/70 + 9 * height/19.9, width/13, height/30);
  tbox3 = new TEXTBOX(width/70 + width/32, height/70 + 10 * height/19.9, width/13, height/30);
  tbox4 = new TEXTBOX(width/70 + width/32, height/70 + 11 * height/19.9, width/13, height/30);
  style = new Button(width/95, height/70, width/9.3+width/120, height/2.3, "");
  show = new Button(width/95, height/70, width/100, height/70, "-");
  info = new Button(width/2, height/50, width/7, height/30, "");
  r = new Button(width/70+width/18, height/70 + 7 * height/20, width/19, height/30, "Res");
  style.hover = color(232, 234, 246);
  style.baseColor = color(232, 234, 246);
  info.hover = color(232, 234, 246);
  info.baseColor = color(232, 234, 246);
  tbox.initial = "fn";
  tbox2.initial = "R";
  tbox3.initial = "T";
  tbox4.initial = "states";
  rule = [1,1,1,0,1,0,0,0,1,0,0,1,0,0,1,0];
  g2 = initializeArray2(cols, rows);
  loadB();
  loadB1();
  style2 = new Button(width/95 + 3.9 * width/18, height/100, width/5.5, height/14, "");
  style2.hover = color(232, 234, 246);
  style2.baseColor = color(232, 234, 246);
  b34.is_on = true;
  b2.is_on = true;
  b3.is_on = true;
  // textInput = createInput();
  // textInput.position(width/70, height/50 + 8 * height/20);
}

function draw() {
  //background gradient
  //gradient();
  background(255);
  //show array
  if (!pause) {
    drawing = false;
    p.t = "Pause";
    generation += 1;
    if (gameOfLifeOn) {
      let next = make2DArray(cols, rows);
      computeNext(grid, next, survive, born);
      grid = next;
      showArray(grid);
      //update array based on rules
    } else if (brianBrainOn) {
      showArrayBrian(grid);
      //update array based on rules
      let next = make2DArray(cols, rows);
      computeNextBrian(grid, next);
      grid = next;
    } else if (seedOn) {
      showArraySeed(grid);
      //update array based on rules
      let next = make2DArray(cols, rows);
      computeNextSeed(grid, next);
      grid = next;
    } else if (r4On) {
      showArrayr4(grid);
      //update array based on rules
      let next = make2DArray(cols, rows);
      computeNextr4(grid, next);
      grid = next;
    } else if (r5On) {
      showArrayr5(grid);
      //update array based on rules
      let next = make2DArray(cols, rows);
      computeNextr5(grid, next);
      grid = next;
    } else if (r6On) {
      showArrayr6(grid, num_states);
      //update array based on rules
      let next = make2DArray(cols, rows);
      computeNextr6(grid, next, num_states, T, R, fn);
      grid = next;
    } else if (r7On) {
      showArrayr7(grid);
      //update array based on rules
      let next = make2DArray(cols, rows);
      computeNextr7(grid, next);
      grid = next;
    } else if (r8On) {
      showArrayr8(grid);
      //update array based on rules
      let next = make2DArray(cols, rows);
      computeNextr8(grid, next);
      grid = next;
    } else if (cycles3) {
      showArrayEat(grid);
      //update array based on rules
      let next = make2DArray(cols, rows);
      computeNextEat(grid, next);
      grid = next;
    }
  } else {
    p.t = "Play";
    if (gameOfLifeOn) {
      showArray(grid);
    } else if (brianBrainOn) {
      showArrayBrian(grid);
    } else if (seedOn) {
      showArraySeed(grid);
    } else if (r4On) {
      showArrayr4(grid);
    } else if (r5On) {
      showArrayr5(grid);
    } else if (r6On) {
      showArrayr6(grid, num_states);
    } else if (r7On) {
      showArrayr7(grid);
    } else if (r8On) {
      showArrayr8(grid);
    } else if (cycles3) {
      showArrayEat(grid);
    }
  }
  if (drawing) {
    stroke(0);
    strokeWeight(1);
    line(int(floor(mouseX/resolution)*resolution), 0, int(floor(mouseX/resolution)*resolution), height);
    line(0, int(floor(mouseY/resolution)*resolution), width, int(floor(mouseY/resolution)*resolution));
    line(int(floor(mouseX/resolution)*resolution)+resolution, 0, int(floor(mouseX/resolution)*resolution)+resolution, height);
    line(0, int(floor(mouseY/resolution)*resolution)+resolution, width, int(floor(mouseY/resolution)*resolution)+resolution);
  }
  if (!hide) {
    show.t = "-";
    style.display();
    style.isOver();
    textFont(ft);
    textAlign(LEFT);
    fill(0);
    noStroke();
    textFont(ft);
    textAlign(LEFT);
    textSize(height/50);
    text("gen: " + generation, width/35, height/20);
    textAlign(LEFT);
    text("res: " + resolution, width/12, height/20);
    if (r8On) {
      let str = ""
      for (let i = 0; i < rule.length; i++) {
        str = str+(rule[i]);
      }
      textAlign(LEFT);
      text(str, width/35, height/70 + 8 * height/19.7);
    }
    gol.display();
    gol.isOver();
    seed.display();
    seed.isOver();
    brain.display();
    brain.isOver();
    r4.display();
    r4.isOver();
    r5.display();
    r5.isOver();
    r6.display();
    r6.isOver();
    r7.display();
    r7.isOver();
    r8.display();
    r8.isOver();
    p.display();
    p.isOver();
    d.display();
    d.isOver();
    step.display();
    step.isOver();
    id.display();
    id.isOver();
    c3.display();
    c3.isOver();
    r.display();
    r.isOver();
    if (gameOfLifeOn) {
      style2.display();
      style2.isOver();
      drawB();
      drawB1();
      fill(0);
      text("0", width/95 + 4* width/17.6, height/70 + 4 * height/65);
      text("1", width/95 + 4* width/17.6 + width/50, height/70 + 4 * height/65);
      text("2", width/95 + 4* width/17.6 + 2*width/50, height/70 + 4 * height/65);
      text("3", width/95 + 4* width/17.6 + 3*width/50, height/70 + 4 * height/65);
      text("4", width/95 + 4* width/17.6 + 4*width/50, height/70 + 4 * height/65);
      text("5", width/95 + 4* width/17.6 + 5*width/50, height/70 + 4 * height/65);
      text("6", width/95 + 4* width/17.6 + 6*width/50, height/70 + 4 * height/65);
      text("7", width/95 + 4* width/17.6 + 7*width/50, height/70 + 4 * height/65);
      text("8", width/95 + 4* width/17.6 + 8*width/50, height/70 + 4 * height/65);
      text("9", width/95 + 4* width/17.6 + 9*width/50, height/70 + 4 * height/65);
    } if (r6On) {
      textAlign(LEFT);
      text("fn",width/70, height/70 + 8 * height/19);
      text("R",width/70, height/70 + 9 * height/19);
      text("T",width/70, height/70 + 10 * height/19);
      text("states",width/70, height/70 + 11 * height/19);
      tbox.DRAW();
      tbox2.DRAW();
      tbox3.DRAW();
      tbox4.DRAW();
    }
  } else {
    show.t = '+';
  }
  show.display();
  show.isOver();
}

function res() {
  resolution = Math.min(Math.max(parseInt((resolution + 1)%20), 7), 20);
  cols = round(width / resolution);
  rows = round(height / resolution);
  if (gameOfLifeOn) {
    grid = initializeArray(cols, rows, 4, 4);
    history = initializeArray2(cols, rows);
    g2 = initializeArray2(cols, rows);
  } else if (brianBrainOn) {
    grid = initializeArrayBrian(cols, rows, 4, 4);
    history = initializeArray2(cols, rows);
  } else if (seedOn) {
    grid = initializeArraySeed(cols, rows, 4, 4);
    history = initializeArray2(cols, rows);
  } else if (r4On) {
    grid = initializeArrayr4(cols, rows, 4, 4);
    history = initializeArray2(cols, rows);
  } else if (r5On) {
    grid = initializeArrayr5(cols, rows, 4, 4);
    history = initializeArray2(cols, rows);
  } else if (r6On) {
    grid = initializeArrayr6(cols, rows, num_states);
    history = initializeArray2(cols, rows);
  } else if (r7On) {
    grid = initializeArrayr7(cols, rows, 4, 4);
    history = initializeArray2(cols, rows);
  } else if (r8On) {
    grid = initializeArrayr8(cols, rows, 4, 4);
    history = initializeArray2(cols, rows);
  }
  generation = 0;
}

function gameOfLife() {
  pause = false;
  generation = 0;
  gameOfLifeOn = true;
  brianBrainOn = false;
  cycles3 = false;
  r4On = false;
  r5On = false;
  r6On = false;
  seedOn = false;
  r7On = false;
  r8On = false;
  grid = initializeArray(cols, rows, 4, 4);
  history = initializeArray2(cols, rows);
  g2 = initializeArray2(cols, rows);
}

function seeds() {
  pause = false;
  generation = 0;
  gameOfLifeOn = false;
  r7On = false;
  brianBrainOn = false;
  seedOn = true;
  r5On = false;
  r8On = false;
  cycles3 = false;
  r6On = false;
  r4On = false;
  grid = initializeArraySeed(cols, rows, 4, 4);
  history = initializeArray2(cols, rows);
}

function brianBrain() {
  pause = false;
  r5On = false;
  generation = 0;
  gameOfLifeOn = false;
  brianBrainOn = true;
  r4On = false;
  seedOn = false;
  r8On = false;
  r7On = false;
  cycles3 = false;
  r6On = false;
  grid = initializeArrayBrian(cols, rows, 4, 4);
  history = initializeArray2(cols, rows);
}

function r4fn() {
  pause = false;
  generation = 0;
  gameOfLifeOn = false;
  brianBrainOn = false;
  r4On = true;
  r5On = false;
  r8On = false;
  r7On = false;
  seedOn = false;
  r6On = false;
  cycles3 = false;
  grid = initializeArrayr4(cols, rows, 4, 4);
  history = initializeArray2(cols, rows);
}

function r5fn() {
  pause = false;
  generation = 0;
  gameOfLifeOn = false;
  brianBrainOn = false;
  r4On = false;
  r5On = true;
  r8On = false;
  seedOn = false;
  r7On = false;
  r6On = false;
  cycles3 = false;
  grid = initializeArrayBrian(cols, rows, 4, 4);
  history = initializeArray2(cols, rows);
}

function r6fn() {
  pause = false;
  generation = 0;
  gameOfLifeOn = false;
  brianBrainOn = false;
  r4On = false;
  r5On = false;
  r6On = true;
  r8On = false;
  seedOn = false;
  cycles3 = false;
  r7On = false;
  grid = initializeArrayr6(cols, rows, num_states);
  history = initializeArray2(cols, rows);
}

function r7fn() {
  pause = false;
  generation = 0;
  gameOfLifeOn = false;
  brianBrainOn = false;
  r4On = false;
  r5On = false;
  r6On = false;
  r8On = false;
  seedOn = false;
  cycles3 = false;
  r7On = true;
  grid = initializeArrayr7(cols, rows, 4, 4);
  history = initializeArray2(cols, rows);
}

function r8fn() {
  pause = false;
  generation = 0;
  gameOfLifeOn = false;
  brianBrainOn = false;
  r4On = false;
  r5On = false;
  r6On = false;
  r8On = true;
  seedOn = false;
  r7On = false;
  cycles3 = false;
  grid = initializeArrayr8(cols, rows, 4, 4);
  history = initializeArray2(cols, rows);
  tbox.maxLen = 15;
}

function cycles3fn() {
  pause = false;
  generation = 0;
  gameOfLifeOn = false;
  brianBrainOn = false;
  r4On = false;
  r5On = false;
  r6On = false;
  seedOn = false;
  r7On = false;
  r8On = false;
  cycles3 = true;
  grid = initializeArrayEat(cols, rows, 4, 4);
}

function pause_fn() {
  pause = !pause;
}

function id_fn() {
  identify = !identify;
}

function hide_fn() {
  hide = !hide;
}

function mouseDragged() {
  if (!style.over) {
    if (drawing || pause) {
      if (gameOfLifeOn) {
        grid[int(mouseX/resolution)][int(mouseY/resolution)] = 1;
      } else if (brianBrainOn) {
        grid[int(mouseX/resolution)][int(mouseY/resolution)] = 0;
      } else if (seedOn) {
        grid[int(mouseX/resolution)][int(mouseY/resolution)] = 0;
      } else if (r4On) {
        grid[int(mouseX/resolution)][int(mouseY/resolution)] = 0;
      } else if (r5On) {
        grid[int(mouseX/resolution)][int(mouseY/resolution)] = 0;
      } else if (r6On) {
        grid[int(mouseX/resolution)][int(mouseY/resolution)] = 0;
      } else if (r7On) {
        grid[int(mouseX/resolution)][int(mouseY/resolution)] = 0;
      } else if (r8On) {
        grid[int(mouseX/resolution)][int(mouseY/resolution)] = 1;
      }
    }
  }
}

function mousePressed () {
  if (!style.over) {
    if (drawing || pause) {
      if (gameOfLifeOn) {
        grid[int(mouseX/resolution)][int(mouseY/resolution)] = 1;
      } else if (brianBrainOn) {
        grid[int(mouseX/resolution)][int(mouseY/resolution)] = 0;
      } else if (seedOn) {
        grid[int(mouseX/resolution)][int(mouseY/resolution)] = 0;
      } else if (r4On) {
        grid[int(mouseX/resolution)][int(mouseY/resolution)] = 0;
      } else if (r5On) {
        grid[int(mouseX/resolution)][int(mouseY/resolution)] = 0;
      } else if (r6On) {
        grid[int(mouseX/resolution)][int(mouseY/resolution)] = 0;
      } else if (r7On) {
        grid[int(mouseX/resolution)][int(mouseY/resolution)] = 0;
      } else if (r8On) {
        grid[int(mouseX/resolution)][int(mouseY/resolution)] = 1;
      }
    }
  }
  if (gol.over) {
    gameOfLife();
  } else if (seed.over) {
    seeds();
  } else if (brain.over) {
    brianBrain();
  } else if (p.over) {
    pause_fn();
  } else if (d.over) {
    drawer();
  } else if (r4.over) {
    r4fn();
  } else if (r5.over) {
    r5fn();
  } else if (r6.over) {
    r6fn();
  } else if (r7.over) {
    r7fn();
  } else if (r8.over) {
    r8fn();
  } else if (id.over) {
    id_fn();
  } else if (c3.over) {
    cycles3fn();
  } else if (show.over) {
    hide_fn();
  } else if (r.over) {
    res();
  }
  ifB();
  ifB1();
  if (step.over && pause) {
    if (gameOfLifeOn) {
      showArray(grid);
      //update array based on rules
      let next = make2DArray(cols, rows);
      computeNext(grid, next, survive, born);
      grid = next;
    } else if (brianBrainOn) {
      showArrayBrian(grid);
      //update array based on rules
      let next = make2DArray(cols, rows);
      computeNextBrian(grid, next);
      grid = next;
    } else if (seedOn) {
      showArraySeed(grid);
      //update array based on rules
      let next = make2DArray(cols, rows);
      computeNextSeed(grid, next);
      grid = next;
    } else if (r4On) {
      showArrayr4(grid);
      //update array based on rules
      let next = make2DArray(cols, rows);
      computeNextr4(grid, next);
      grid = next;
    } else if (r5On) {
      showArrayr5(grid);
      //update array based on rules
      let next = make2DArray(cols, rows);
      computeNextr5(grid, next);
      grid = next;
    } else if (r6On) {
      showArrayr6(grid, num_states);
      //update array based on rules
      let next = make2DArray(cols, rows);
      computeNextr6(grid, next, num_states, T, R, fn);
      grid = next;
    } else if (r7On) {
      showArrayr7(grid);
      //update array based on rules
      let next = make2DArray(cols, rows);
      computeNextr7(grid, next);
      grid = next;
    } else if (r8On) {
      showArrayr8(grid);
      //update array based on rules
      let next = make2DArray(cols, rows);
      computeNextr8(grid, next);
      grid = next;
    } else if (cycles3) {
      showArrayEat(grid);
      //update array based on rules
      let next = make2DArray(cols, rows);
      computeNextEat(grid, next);
      grid = next;
    }
    generation += 1;
  }
  tbox.PRESSED(mouseX, mouseY);
  tbox2.PRESSED(mouseX, mouseY);
  tbox3.PRESSED(mouseX, mouseY);
  tbox4.PRESSED(mouseX, mouseY);
}

function keyTyped() {
  if (tbox.Text.length < 17) {
    tbox.KEYPRESSED(key, keyCode);
  }
  tbox2.KEYPRESSED(key, keyCode);
  tbox3.KEYPRESSED(key, keyCode);
  tbox4.KEYPRESSED(key, keyCode);
}

function keyPressed() {
  let t = tbox.Text;
  let t2 = tbox2.Text;
  let t3 = tbox3.Text;
  let t4 = tbox4.Text;
  if (keyCode == 32 || keyCode == BACKSPACE) {
    // if (t.length == 16 && r8On) {
    //   for (let i = 0; i < rule.length; i++) {
    //       rule[i] = t.charAt(i) - '0';
    //   }
    // }
    tbox.KEYPRESSED(key, keyCode);
    tbox2.KEYPRESSED(key, keyCode);
    tbox3.KEYPRESSED(key, keyCode);
    tbox4.KEYPRESSED(key, keyCode);
  } else if (keyCode == ENTER) {
    tbox.Text = "";
    tbox2.Text = "";
    tbox3.Text = "";
    tbox4.Text = "";
    if (r6On && t.length >= 1) {
      fn = int(t);
      r6fn();
    }
    if (r6On && t2.length >= 1) {
      R = int(t2);
      r6fn();
    }
    if (r6On && t3.length >= 1) {
      T = int(t3);
      r6fn();
    }
    if (r6On && t4.length >= 1) {
      num_states = int(t4);
      r6fn();
    }
    if (t.length == 16 && r8On) {
      for (let i = 0; i < rule.length; i++) {
          rule[i] = t.charAt(i) - '0';
      }
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          grid[i][j] = 0;
          history[i][j] = false;
        }
      }
      grid[int(cols/2)][int(rows/2)] = 1;
    }
  }
}

function drawer() {
  pause = true;
  drawing = true;
  grid = make2DArray(cols, rows);
  generation = 0;
  if (gameOfLifeOn) {
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        grid[i][j] = 0
        history[i][j] = false;
        g2[i][j]=false;
      }
    }
  } else if (brianBrainOn) {
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        grid[i][j] = 2;
        history[i][j] = false;
      }
    }
  } else if (seedOn) {
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        grid[i][j] = 1;
        history[i][j] = false;
      }
    }
  } else if (r4On) {
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        grid[i][j] = 1;
        history[i][j] = false;
      }
    }
  } else if (r5On) {
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        grid[i][j] = 1;
        history[i][j] = false;
      }
    }
  } else if (r6On) {
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        grid[i][j] = 1;
        history[i][j] = false;
      }
    }
  } else if (r7On) {
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        grid[i][j] = 1;
        history[i][j] = false;
      }
    }
  } else if (r8On) {
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        grid[i][j] = 0;
        history[i][j] = false;
      }
    }
  } else if (cycles3) {
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        grid[i][j] = 0;
        history[i][j] = false;
      }
    }
  }
}
