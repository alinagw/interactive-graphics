let fishImgs = [];
let seaweedImgs = [];
let fishes = [];
let spawnInterval = 5;
let yoff = 0.0;

function preload() {
  // fish and seaweed images downloaded from FreePik and custom edited by me
  //https://www.freepik.com/free-vector/aquarium-essential-elements-collection_4321774.htm#page=1&query=aquarium&position=1
  
  // load fish images into array
  for (let i = 1; i <= 8; i++) {
    fishImgs.push(loadImage('images/fish-' + i + '.png'));
  }
  // load seaweed images into array
  for (let i = 1; i <= 3; i++) {
    seaweedImgs.push(loadImage('images/seaweed-' + i + '.png'));
  }
}

function setup() {
  createCanvas(800, 500);
  spawnFish();
}

function draw() {
  background(255);
  drawWater();
  drawSand();

  // spawn a new fish every random interval of seconds
  if (frameCount % (spawnInterval * 30) === 0) {
    spawnFish();
    spawnInterval = floor(random(5, 15));
  }

  // remove the first fish in the array after 60 seconds
  if (frameCount % (60 * 30) === 0) {
    fishes.shift();
  }

  // draw each fish object
  for (let i = 0; i < fishes.length; i++) {
    fishes[i].display();
  }

}

// perlin noise to draw water
function drawWater() {
  fill(152, 215, 221);
  noStroke();
  beginShape();

  let xoff = 0;

  // Iterate over horizontal pixels
  for (let x = 0; x <= width; x += 10) {
    // Calculate a y value according to noise, map to
    let y = map(noise(xoff, yoff), 0, 1, 25, 50);
    // Set the vertex
    vertex(x, y);
    // Increment x dimension for noise
    xoff += 0.05;
  }

  // increment y dimension for noise
  yoff += 0.01;
  vertex(width, height);
  vertex(0, height);

  endShape(CLOSE);
}

// draw sand at bottom of aquarium
function drawSand() {
  fill(253, 217, 119);
  rect(0, height - 75, width, 75);
  // include seaweed
  image(seaweedImgs[0], 0, 110, 250, 333.33);
  image(seaweedImgs[1], 550, 180, 275, 275);
  image(seaweedImgs[2], 100, 250, 150, 200);
}

// spawn a new fish
function spawnFish() {
  // randomly generate properties
  let fishDir = random(1) < 0.5 ? -1 : 1;
  let fishSpeed = random(0.5, 2);
  let fishSize = random(100, 300);
  let fishY = floor(random(fishSize, height - 100 - fishSize));
  let fishImg = floor(random(0, fishImgs.length));
  let fishX = fishDir === -1 ? 0 - width / 2 - fishSize : -fishSize;
  // add to fishes array
  fishes.push(new Fish(fishX, fishY, fishDir, fishSpeed, fishSize, fishImg));
}

// fish object
class Fish {
  constructor(x, y, dir, speed, size, img) {
    this.x = x;
    this.y = y;
    this.dir = dir;  // direction
    this.speed = speed;
    this.size = size;
    this.img = fishImgs[img];
  }

  move() {
    this.x += 1 * this.speed;
  }

  display() {
    this.move();
    // flip the image vertically if fish swimming right to left
    // code to flip image taken from https://forum.processing.org/two/discussion/9309/how-to-flip-image
    if (this.dir === -1) {
      push();
      translate(this.img.width, 0);
      scale(-1, 1);
      image(this.img, this.x, this.y, this.size, this.size);
      pop();
    } 
    // else draw it normally
    else {
      image(this.img, this.x, this.y, this.size, this.size);
    }
  }
}