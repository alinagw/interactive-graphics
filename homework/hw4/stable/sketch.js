let x = 0,
  y = 0,
  size = 50,
  easing = 0.05,
  success = false,
  medicine;

function preload() {
  medicine = loadImage("medicine.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  x = width / 2;
  y = height / 2;
}

function draw() {
  background(255);

  if (mouseIsPressed) {
    let d = dist(mouseX, mouseY, x, y);
    if (d < size) {
      success = true;
    }
  }

  if (!success) {
    let dx = mouseX - x;
    let dy = mouseY - y;

    x += dx * easing;
    y += dy * easing;

    image(medicine, x - size / 2, y - size / 2, size, size);


  } else {
    textAlign("center");
    text("see? wasn't that easy when you're stable?", width / 2, height / 2);
  }
}