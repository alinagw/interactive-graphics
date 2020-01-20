var w = 600;
var h = 600;

function setup() {
    createCanvas(w, h, WEBGL);
    background(200);
  }
  
  function draw() {
    if (keyIsDown(32)) {
      orbitControl(5,5,5);
    }
  }

  function mousePressed() {
   //paint();
  }

  function mouseDragged() {
    if (!keyIsDown(32)) {
      paint();
    }
  }

  function paint() {
    translate(mouseX - w / 2, mouseY - h / 2);
    //noStroke();
    fill(255,0,0);
    sphere(40);
  }