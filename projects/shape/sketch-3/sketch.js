let stars = [];
let lines = [];
let numMouseClicks = 0;
let mouseClickLoc = [-1, -1];
let starsClicked = 0;

function setup() {
    createCanvas(windowWidth, windowHeight);
    setStars();
  }
  
  function draw() {
    background(0, 52, 92);
    
    for (let i = 0; i < stars.length; i++) {
      stars[i].display();
    }

    stroke(255);
    strokeWeight(2);
    for (i = 0; i < lines.length; i++) {
      line(lines[i][0], lines[i][1], lines[i][2], lines[i][3])
    }

    if (starsClicked === 1) {
      line(mouseClickLoc[0], mouseClickLoc[1], mouseX, mouseY);
    } 
  }

  function mousePressed() {
    numMouseClicks++;
    
    for (let i = 0; i < stars.length; i++) {
      if (stars[i].clicked() > -1) {
        starsClicked++;
        break;
      }
    }

    if (numMouseClicks > starsClicked) {
      starsClicked = 0;
      numMouseClicks = 0;
    }

    if (starsClicked > 1) {
      lines.push([mouseClickLoc[0], mouseClickLoc[1], mouseX, mouseY]);
      starsClicked = 0;
      numMouseClicks = 0;
      mouseClickLoc = [-1, -1];
    } else {
      mouseClickLoc = [mouseX, mouseY];
    }
  }

  function setStars() {
    let numStars = random(50, 200);
    for (let i = 0; i < numStars; i++) {
      let locX = random(width);
      let locY = random(height);
      let size = random(4, 10);
      stars.push(new Star(locX, locY, size, i));
    }
  }

  class Star {
    constructor(locX, locY, size, index) {
      this.x = locX;
      this.y = locY;
      this.size = size;
      this.index = index;
    }

    display() {
      noStroke();
      ellipse(this.x, this.y, this.size);
    }

    clicked() {
      var d = dist(mouseX, mouseY, this.x, this.y);
      if (d < this.size) return this.index;
      return -1;
    }
  }