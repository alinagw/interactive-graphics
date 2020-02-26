let x,
    y,
    ySpeed = 30,
    xSpeed = 20,
    xDir = 1,
    yDir = 1,
    size = 50,
    h = 0,
    success = false,
    medicine;

function preload() {
  medicine = loadImage("medicine.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
  frameRate(30);
  x = width / 2;
  y = height / 2;
}

function draw() {
  
  if (mouseIsPressed) {
      let d = dist(mouseX, mouseY, x, y);
      if (d < size) {
        success = true;
      }
    }

  if (!success) {
    background(h, 255, 255);
    
    if (h >= 360) h = 0;
    else h += 2;

    for (let i = 0; i < 500; i++) {
      drawRandomCircle();
    }

    x += xSpeed * xDir;
    y += ySpeed * yDir;

    if (x > width - size / 2 || x < size / 2) {
      if (abs(xDir) > 1) xDir /= xDir;
      else xDir *= floor(random(-2, -1));
    }
    
    if (y > height - size / 2 || y < size / 2) {
      if (abs(yDir) > 1) yDir /= yDir;
      else yDir *= floor(random(-2, -1));
    }
    
    image(medicine, x - size / 2, y - size / 2, size, size);    
  } 
  
  else {
    background(255);
    text("your manic episode is over", width / 2, height / 2);
  }

}

function drawRandomCircle() {
  let ranH = random(360);
  let ranX = random(width);
  let ranY = random(height);
  let ranSize = random(20, 40);
  fill(ranH, 255, 255);
  ellipse(ranX, ranY, ranSize);
}