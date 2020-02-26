/**
 * Create Constellations
 * Alina Walling
 * 
 * Instructions:
 * * Click on one star and a second star to connect them
 * * Click on empty space to cancel drawing a line
 */

let stars = [];    // array of stars          
let lines = [];    // array of lines drawn between stars
let numMouseClicks = 0;  // number of times mouse clicked
let mouseClickLoc = [-1, -1];  // last location where mouse was clicked
let starsClicked = 0;  // number of stars clicked

function setup() {
    createCanvas(windowWidth, windowHeight);
    setStars();  // generate the stars
  }
  
  function draw() {
    background(0, 52, 92);
    
    // display all the stars in the array
    for (let i = 0; i < stars.length; i++) {
      stars[i].display();
    }

    // display all the lines drawn between stars
    stroke(255);
    strokeWeight(2);
    for (i = 0; i < lines.length; i++) {
      line(lines[i][0], lines[i][1], lines[i][2], lines[i][3])
    }

    // display the line currently being drawn
    if (starsClicked === 1) {
      line(mouseClickLoc[0], mouseClickLoc[1], mouseX, mouseY);
    } 
  }

  // when mouse is clicked...
  function mousePressed() {
    // increment number mouse clicks
    numMouseClicks++;
    
    // check if any of the stars were clicked
    for (let i = 0; i < stars.length; i++) {
      if (stars[i].clicked() > -1) {
        starsClicked++;
        break;
      }
    }

    // if clicked on empty space after clicking on one star
    if (numMouseClicks > starsClicked) {
      // cancel the line being drawn
      starsClicked = 0;
      numMouseClicks = 0;
    }

    // if one star clicked and currently drawing a line
    if (starsClicked > 1) {
      // add the line to the array
      lines.push([mouseClickLoc[0], mouseClickLoc[1], mouseX, mouseY]);
      // reset clicks
      starsClicked = 0;
      numMouseClicks = 0;
      mouseClickLoc = [-1, -1];
    } else {
      // update mouse click location
      mouseClickLoc = [mouseX, mouseY];
    }
  }

  // generate the stars randomly on the canvas
  function setStars() {
    let numStars = random(50, 200);
    for (let i = 0; i < numStars; i++) {
      let locX = random(width);
      let locY = random(height);
      let size = random(4, 10);
      stars.push(new Star(locX, locY, size, i));
    }
  }

  // Star object that stores location, size, and index in the stars array
  class Star {
    constructor(locX, locY, size, index) {
      this.x = locX;
      this.y = locY;
      this.size = size;
      this.index = index;
    }

    // draw an ellipse for the star
    display() {
      noStroke();
      ellipse(this.x, this.y, this.size);
    }

    // return the index of the star in the array on click
    clicked() {
      let d = dist(mouseX, mouseY, this.x, this.y);
      if (d < this.size) return this.index;
      return -1;
    }
  }