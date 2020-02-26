let speed = 30;

function setup() {
  createCanvas(600, 800, WEBGL);
  angleMode(DEGREES);
}

function draw() {
  background(59, 158, 200);
  ambientLight(213, 242, 252);
  pointLight(255, 218, 101, -300, -600, 300);

  noStroke();
  rotateY(millis() / 1000 * speed);
  drawBottom();
  rotateY(millis() / 1000 * speed);
  drawMid();
  rotateY(millis() / 1000 * speed);
  drawTop();
}

function mousePressed() {
  speed = 0;
}

function mouseReleased() {
  speed = 30;
}

function drawBottom() {
  push();
  translate(0, 180);
  sphere(140);
  pop();
}

function drawMid() {
  sphere(110);
  push();
  fill(30, 30, 30);
  translate(0, -10, 110);
  sphere(10);
  translate(0, 40, -5);
  sphere(10);
  translate(0, -80, -5);
  sphere(10);
  pop();

  push();
  fill(79, 36, 16);
  translate(120, -50);
  rotateZ(60);
  cylinder(5, 150);
  translate(-6, -85);
  rotateZ(-25);
  cylinder(5, 30);
  translate(10, 5);
  rotateZ(50);
  cylinder(5, 30);
  pop();

  push();
  fill(79, 36, 16);
  translate(-120, -50);
  rotateZ(-60);
  cylinder(5, 150);
  translate(-6, -85);
  rotateZ(-25);
  cylinder(5, 30);
  translate(10, 5);
  rotateZ(50);
  cylinder(5, 30);
  pop();
}

function drawTop() {
  push();
  translate(0, -150);
  sphere(80);
  fill(30, 30, 30);
  translate(0, -60);
  cylinder(90, 10);
  translate(0, -40);
  cylinder(60, 80);
  pop();

  push();
  fill(252, 112, 44);
  // rotateX(90);
  translate(0, -150, 110);
  rotateX(90);
  cone(10, 60);
  pop();

  push();
  fill(30, 30, 30);
  translate(-30, -170, 75);
  sphere(8);
  translate(60, 0);
  sphere(8);
  pop();

  push();
  fill(30, 30, 30);
  translate(0, -115, 75);
  sphere(6);
  translate(-20, -3, -3);
  sphere(6);
  translate(-15, -10, -3);
  sphere(6);
  translate(55, 10, 3);
  sphere(6);
  translate(15, -10, -3);
  sphere(6);
  pop();

}