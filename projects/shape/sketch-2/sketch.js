let cakeTexture;
let cakeTopTexture;
let cakeSize = 250;
let drawOn;
let currColor = 'black';
let colors;

function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  cakeTexture = createGraphics(cakeSize, cakeSize);
  cakeTexture.background(255);

  cakeTopTexture = createGraphics(cakeSize, cakeSize);
  cakeTopTexture.background(255);

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

  drawOn = 'side';
}

function draw() {
  background(152, 215, 221);
  
  // lights
  ambientLight(125, 125, 125);
  directionalLight(255, 255, 255, -100, 200, -1000);
  pointLight(255, 218, 101, 500, 10, 0);
  
  
  noStroke();
  drawCake();
  drawCandle();
}

function mouseClicked(event) {
  console.log(event);
}

function mouseDragged() {
  if (drawOn === 'side') {
    cakeTexture.noStroke();
    cakeTexture.fill(255,0,0);
    cakeTexture.ellipse(mouseX - width / 3, mouseY - height / 3, 20);
  } else if (drawOn === 'top') {
    cakeTopTexture.noStroke();
    cakeTopTexture.fill(0,255,0);
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


// function preload() {
//   img = loadImage("cat.jpg");
// }

// function setup() {
//     createCanvas(500, 500, WEBGL);
//     angleMode(DEGREES);
//     cakeTexture = createGraphics(PI * 150, 150);
//     cakeTexture.background(255);
//   }
  
//   function draw() {
//     background(220);
//     //orbitControl();
//     cakeTexture.fill(100);
//     cakeTexture.noStroke();
//     cakeTexture.ellipse(mouseX - width / 2, mouseY - height / 2, 20);

//     // texture()
    
//     texture(cakeTexture);

//     // texture(img);
//     textureWrap();

//     //noStroke();
//     rotateX(-20);
//     rotateY(-90);
//     cylinder(150, 150);
//   }