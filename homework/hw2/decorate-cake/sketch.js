/**
 * Decorate a Cake
 * Alina Walling
 * 
 * Instructions:
 * * Draw with mouse
 * * Select surface of cake to draw on with drop down
 * * Change color of brush with drop down
 */

let cakeTexture;          // graphics texture for cake
let cakeTopTexture;       // graphics texture for top of cake
let cakeSize = 250;       // dimensions of cake
let drawOn;               // area of cake to draw on
let currColor = 'black';  // current brush color
let colors;               // brush color options
let surfaceSelect;        // select drop down for surface to draw on
let colorSelect;          // select drop down for brush color

function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  // initialize cake texture
  cakeTexture = createGraphics(cakeSize, cakeSize);
  cakeTexture.background(255);
  // initialize cake top texture
  cakeTopTexture = createGraphics(cakeSize, cakeSize);
  cakeTopTexture.background(255);
  // initialize drop downs
  initializeSelects();
  // initialize colors
  colors = {
    red: color(220, 56, 56),
    orange: color(220, 56, 56),
    gold: color(246, 98, 31),
    yellow: color(254, 204, 47),
    green: color(179, 194, 38),
    teal: color(52, 190, 184),
    blue: color(65, 164, 216),
    purple: color(164, 99, 218),
    pink: color(238, 101, 122),
    white: color(255, 255, 255),
    black: color(0, 0, 0),
    darkBrown: color(70, 25, 21),
    lightBrown: color(144, 82, 61),
    cream: color(247, 232, 211)
  }
}

function draw() {
  background(152, 215, 221);
  
  // lights
  ambientLight(125, 125, 125);
  directionalLight(255, 255, 255, -100, 200, -1000);
  pointLight(255, 218, 101, 500, 10, 0);
  
  // set surface to draw on and current color
  drawOn = surfaceSelect.value();
  currColor = colors[colorSelect.value()];
  
  // draw cake and candle
  noStroke();
  drawCake();
  drawCandle();
}

function mouseDragged() {
  // draw ellipses on side of cake
  if (drawOn === 'side') {
    cakeTexture.noStroke();
    cakeTexture.fill(currColor);
    cakeTexture.ellipse(mouseX - width / 3, mouseY - height / 3, 20);
  } 
  
  // draw ellipses on top of cake
  else if (drawOn === 'top') {
    cakeTopTexture.noStroke();
    cakeTopTexture.fill(currColor);
    cakeTopTexture.ellipse(mouseX - width / 3, mouseY - height / 3, 20);
  }
}

function drawCake() {
  // cake
  push();
  texture(cakeTexture);
  translate(-25, -25, 0);
  rotateY(35);
  rotateX(-20);
  rotateZ(-11);
  box(cakeSize, cakeSize / 2, cakeSize);
  pop();

  // cake top
  push();
  texture(cakeTopTexture);
  translate(-23, -82, 24);
  rotateY(35);
  rotateX(-20);
  rotateZ(-11);
  box(cakeSize, 2, cakeSize);
  pop();
}

function drawCandle() {
  // candle
  push();
  fill(227, 131, 143);
  translate(-25, -100, 50);
  rotateX(-25);
  cylinder(6, 60);
  pop();

  // flame
  push();
  specularMaterial(251, 149, 21);
  shininess(10);
  translate(-25, -136, 65);
  ellipsoid(6, 12, 6);
  pop();
}

function initializeSelects() {
  // select surface to draw on
  surfaceSelect = createSelect();
  surfaceSelect.option("side");
  surfaceSelect.option("top");

  // select current color
  colorSelect = createSelect();
  colorSelect.option("red");
  colorSelect.option("orange");
  colorSelect.option("gold");
  colorSelect.option("yellow");
  colorSelect.option("green");
  colorSelect.option("teal");
  colorSelect.option("blue");
  colorSelect.option("purple");
  colorSelect.option("pink");
  colorSelect.option("white");
  colorSelect.option("black");
  colorSelect.option("darkBrown");
  colorSelect.option("lightBrown");
  colorSelect.option("cream");
}
