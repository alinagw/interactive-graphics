let x, 
    y,
    angle = 0,
    size = 50,
    triggerSize = size * 4,
    easing = 0.01,
    success = false,
    medicine;

function preload() {
  medicine = loadImage("medicine.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noCursor();
  x = width / 2;
  y = height / 2;
}

function draw() {
  background(0);
  
  let d = dist(mouseX, mouseY, x, y);

  if (mouseIsPressed && d <= size) {
    success = true;
  }

  if (!success) {
    
    let dx = 0;
    let dy = 0;
    
    if (d <= triggerSize) {
      dx = mouseX - x;
      dy = mouseY - y;
    }

    if (x > width - size / 2) x = width - size / 2;
    if (x < size / 2) x = size / 2;
    if (y > height - size / 2) y = height - size / 2;
    if (y < size / 2) y = size / 2;
    
    x -= dx * easing;
    y -= dy * easing;
    
    image(medicine, x - size / 2, y - size / 2, size, size);
  } 
  
  else {
    background(255);
    text("your depressive episode is over", width / 2, height / 2);
  }
}
