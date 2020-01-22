
/**
 * 3D Drawing App
 * Alina Walling
 * 
 * Instructions:
 * * Draw with mouse
 * * Rotate canvas with left and right arrow keys
 * * Change color of brush with number keys 0 - 9
 */

let strokes = [];       // array of all strokes drawn on canvas
let points = [];        // array of vertices (points) currently being drawn
let rotY = 0;           // current rotation around the Y axis
let size = 600;         // canvas size
let speed = 0.5;        // speed of rotation around Y axis
let currColor;          // current selected drawing color
let colors = {          // color options for drawing, RGB values mapped to key codes for numbers 0 - 9
  48: [0, 0, 0],        // black
  49: [220, 56, 56],    // red
  50: [246, 98, 31],    // orange
  51: [250, 162, 39],   // yellow-orange
  52: [254, 204, 47],   // yellow
  53: [179, 194, 38],   // green
  54: [52, 190, 184],   // teal
  55: [65, 164, 216],   // blue
  56: [164, 99, 218],   // purple
  57: [238, 101, 122]   // pink
}

function setup() {
  createCanvas(size, size, WEBGL);
  angleMode(DEGREES);
  currColor = colors[48]; // set current color to black
}

function draw() {
  background(250);

  // draw circle in corner displaying current color
  push();
  noStroke();
  fill(currColor[0], currColor[1], currColor[2]);
  ellipse(-width / 2 + 30, height / 2 - 30, 30);
  pop();

  // detect if key is pressed
  if (keyIsPressed) {
    
    // rotate counter-clockwise around Y axis if right arrow key pressed
    if (keyCode === RIGHT_ARROW) {
      rotY = rotY >= 360 ? speed : rotY + speed;
    } 
    
    // rotate clockwise around Y axis if left arrow key pressed
    else if (keyCode === LEFT_ARROW) {
      rotY = rotY <= 0 ? 360 - speed : rotY - speed;
    } 
    
    // change current color according to number key pressed
    else if (keyCode >= 48 && keyCode <= 57) {
      currColor = colors[keyCode];
    }
  }

  // detect if mouse is pressed
  if (mouseIsPressed) {
    // add point to array with x, y, z, and current Y axis rotation
    points.push([mouseX - width / 2, mouseY - height / 2, 0, rotY]);
  } else {
    // when mouse is not pressed and points exist...
    // mouse is released and user finished drawing stroke
    if (points.length > 0) {
      // add new stroke object to strokes array
      strokes.push(new Stroke(points, rotY, currColor));
      // reset points
      points = [];
    }
  }

  // draw the stroke the user is currently drawing
  new Stroke(points, rotY, currColor).drawStroke();

  // draw all the saved previous strokes
  for (let i = 0; i < strokes.length; i++) {
    strokes[i].drawStroke();
  }
}

// Stroke class that the user has drawn
class Stroke {
  
  // initialize
  constructor(points, rotY, color) {
    this.points = points;  // array of all vertices in stroke
    this.rotY = rotY;      // rotation around Y axis when stroke was drawn
    this.color = color;    // color of stroke
  }

  // display the stroke on the canvas
  drawStroke() {
    // limit these styles within push/pop (don't affect other things)
    push();
    // rotate stroke according to current Y axis rotation
    rotateY(rotY - this.rotY);
    noFill();
    strokeWeight(2);
    stroke(this.color[0], this.color[1], this.color[2]);
    // draw all the vertices saved as points
    beginShape();
    for (let i = 0; i < this.points.length; i++) {
      vertex(this.points[i][0], this.points[i][1], this.points[i][2]);
    }
    endShape();
    pop();
  }
}