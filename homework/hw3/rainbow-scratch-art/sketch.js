/**
 * HW 3.3 Rainbow Scratch Art
 * Alina Walling
 */

let brushSize = 8;
let blackLayer;

function setup() {
  createCanvas(500, 500);
  background(255);
  colorMode(HSB);
  
  // create black layer to render over top rainbow
  blackLayer = createGraphics(width, height);
  blackLayer.fill(0);
  blackLayer.rect(0, 0, width, height);
}

function draw() {
  drawGradient();
  image(blackLayer, 0, 0);
}

// draw diagonal rainbow gradient
function drawGradient() {
  for (let i = 0; i <= height * 2; i++) {
    // map the hue value according to canvas size to create rainbow
    let h = map(i, 0, height * 2, 0, 360);
    noFill();
    stroke(h, 255, 255);
    // draw lines!
    line(0, i, i, 0);
  }
}

// erase the black layer when the mouse is dragged
// this technique was modified from the "True Erase" Codepen by Daniel Harty
  // https://codepen.io/DanielHarty/details/jzGVWV
function mouseDragged() {
  // detect where the mouse is being pressed and for all the x values that fit in the brush size
  for (let x = mouseX - brushSize; x <= mouseX + brushSize; x++) {
    // and all the y values that fit in the brush size
    for (let y = mouseY - brushSize; y <= mouseY + brushSize; y++) {
      // create the circle within brush size and ensure the canvas is not continuous
      if (dist(x, y, mouseX, mouseY) < brushSize && x > 0 && x < width) {
        // set those pixels touched by mouse to an alpha of 0
        // making them transparent and appear "erased"
        blackLayer.set(x, y, color(0,0,0,0));
      }
    }
  }
  // update the pixels on the graphics black layer to reflect new alpha
  blackLayer.updatePixels();
}