var size = 320;
var tileSize = 5;
var squares;

function preload() {
  squares = loadJSON('pixels.json');
}

function setup() {
  createCanvas(size, size);
  background(255);
  noLoop();
}

function draw() {
  var x = 0,
      y = 0;
  
  for (var i = 0; i < squares.pixels.length; i++) {
    
    // check if need to wrap to new line
    if (x >= size) {
      y += tileSize;
      x = 0;
    }
    
    // get RGB values from pixel array
    var r = squares.pixels[i][0];
    var g = squares.pixels[i][1];
    var b = squares.pixels[i][2];

    // draw a square for each pixel
    noStroke();
    fill(r, g, b);
    rect(x, y, tileSize, tileSize);
    
    x += tileSize
  }
}