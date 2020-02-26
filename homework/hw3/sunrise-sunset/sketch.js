/**
 * HW 3.2 Sunrise Sunset 
 * Alina Walling
 * This one is complex to understand... bear with me
 */

let sunSize = 100;
let gradients, // array that will store sky gradients
  numGradients, // number of sky gradients
  mountains, // mountains image
  skyHeight; // height of the sky to go just below mountains
let fractions = []; // height fractions that determine transition points between gradients
let stars = []; // array of randomly generated stars
let showFractions = false;  // display the lines where the gradients switch

function preload() {
  // mountains from source below and was custom edited by me
  // https://www.freepik.com/free-vector/welcome-landing-page-template-with-landscape_5086591.htm
  mountains = loadImage('mountains.png');
}

function setup() {
  createCanvas(800, 800);

  // sky gradients (5 total)
  gradients = [
    [ // midday blue sky
      color(1, 129, 211),
      color(59, 158, 200),
      color(0, 170, 242),
      color(93, 195, 246),
      color(184, 232, 249)
    ],
    [ // pastel blue sky
      color(0, 120, 184),
      color(145, 192, 214),
      color(231, 237, 230),
      color(248, 235, 218),
      color(252, 189, 156)
    ],
    [ // sunset
      color(0, 63, 113),
      color(72, 124, 168),
      color(249, 196, 185),
      color(255, 214, 130),
      color(252, 117, 71)
    ],
    [ // purple almost dark
      color(19, 32, 77),
      color(38, 51, 112),
      color(83, 84, 158),
      color(172, 138, 188),
      color(224, 171, 190)
    ],
    [ // night sky
      color(0, 5, 19),
      color(0, 24, 58),
      color(0, 49, 101),
      color(0, 61, 115),
      color(0, 93, 142)
    ]
  ]
  numGradients = Object.keys(gradients).length;

  // sky ends just below mountains (so all colors are visible)
  skyHeight = height - 100;
  // calculate the transition points for the gradients
  getHeightFraction();

  // randomly generate stars for nighttime
  for (let i = 0; i < 100; i++) {
    stars.push([random(width), random(height)]);
  }
}

function draw() {
  background(220);
  
  // display the height fractions when spacebar pressed
  if (keyIsPressed) {
    if (keyCode === 32) showFractions = true;
    else showFractions = false;
  } else {
    showFractions = false;
  }
  
  drawSky();
  
  // draw sun
  noStroke();
  fill(250, 225, 66);
  ellipse(width / 2, mouseY, sunSize);
  // draw mountains
  image(mountains, 0, 513, width, 387);
}

// draw the sky gradients based on sun position
function drawSky() {
  // get the current sky gradient based on the sun location
  let currGradient = getCurrGradient();
  // the next gradient is the next fraction cutoff larger than the current y coordiante
  let nextGradient = min(currGradient + 1, numGradients - 1);

  // get the number of colors included in the current gradient
  let numColors = gradients[currGradient].length;
  // each color gets an equal fraction of the sky height
  let colorHeight = skyHeight / (numColors - 1);

  // calculate the difference in sun's distance between the current and next gradient cutoff
  let diff = getDiff(currGradient, nextGradient);

  noFill();
  // draw lines for every y in sky height
  for (let y = 0; y <= skyHeight; y++) {
    // get the color index to lerp from based on what color fraction of the sky the sun is in 
    let fromColor = floor(map(y, 0, skyHeight, 0, numColors - 1));
    // get the color to lerp to based on the next color fraction
    let toColor = min(fromColor + 1, numColors - 1);
    // find the difference between colors within color fraction
    let inter = (y - (colorHeight * fromColor)) / colorHeight;

    // calculate the color in the current gradient
    let c1 = lerpColor(gradients[currGradient][fromColor], gradients[currGradient][toColor], inter);
    // calculate the color in the next gradient
    let c2 = lerpColor(gradients[nextGradient][fromColor], gradients[nextGradient][toColor], inter);

    // lerp the colors of the two gradients together since we are transitioning between them based on difference in gradient sky fractions
    let c = lerpColor(c1, c2, diff);
    stroke(c);
    
    // change the stroke to black if height fraction and showing fractions
    if (showFractions && fractions.includes(y)) stroke('black');
    
    // draw the line!
    line(0, y, width, y);
  }

  // draw stars when approaching bottom of height (during night)
  for (let i = 0; i < stars.length; i++) {
    noStroke();
    fill(255, 255, 255, map(mouseY, 3 * (height / 4), height, 0, 255));
    ellipse(stars[i][0], stars[i][1], 4);
  }
}

// get the height fractions dividing the gradient transition points
function getHeightFraction() {
  let prev = 0;
  // split sky into fractions, one for each gradient
  for (let i = 0; i < numGradients; i++) {
    // gradients get fractions exponentially (2 ^ i + 1)
    // this way, the midday sky lasts longer (bigger fraction) and the transition between sunset and night (smaller fraction) happens quicker when the sun is at the bottom of the sky
    fractions.push(floor(prev + (skyHeight / pow(2, i + 1))) + 20);
    prev = fractions[i];
  }
}

// determine the current gradient based on position of sun
function getCurrGradient() {
  // detect which fraction the mouseY / sun is currently within
  for (let i = 0; i < fractions.length; i++) {
    if (mouseY <= fractions[i] || i === fractions.length - 1) {
      return i;
    }
  }
}

// determine the difference in the mouseY position between the current gradient fractions
// this will determine the amount to lerp colors between gradients
function getDiff(curr, next) {
  let gradientHeight = fractions[curr] - (fractions[curr - 1] || 0);
  return 1 - (fractions[curr] - mouseY) / gradientHeight;
}