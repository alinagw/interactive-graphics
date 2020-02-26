/**
 * HW 3.1 Color Blender
 * Alina Walling
 *
 */

let blenderImg, // blender graphic
  blender, // blender object
  color1, // color picker input 1
  color2, // color picker input 2
  resetButton; // button input to reset blender
let yoff = 0.0; // perlin noise effect

function preload() {
  // blender icon from source below and was custom edited by me
  // https://www.flaticon.com/free-icon/blender_418213?term=blender&page=1&position=19
  blenderImg = loadImage("blender.png");
}

function setup() {
  createCanvas(600, 600);

  // create color pickers
  color1 = createColorPicker(color('red'));
  color2 = createColorPicker(color('yellow'));

  // blender object
  blender = new Blender();

  // create reset button
  resetButton = createButton('Reset');
  resetButton.mousePressed(function() {
    blender.reset();
  });
}

function draw() {
  background(255);

  // detect when blender button clicked
  if (mouseIsPressed) blender.buttonClicked();
  else blender.mixing = false;

  // draw the blender
  blender.display();
}

// blender object
class Blender {
  constructor() {
    // set up all the variables
    this.reset();
    // location and dimensions for blender button
    this.buttonX = 286;
    this.buttonY = 426;
    this.buttonSize = 24;
  }

  // reset blender colors and mixing status
  reset() {
    this.color1 = color1.color();  // color from color picker 1
    this.color2 = color2.color();  // color from color picker 2
    this.juiceColor = this.color1; // current mixed color
    this.mixTime = 0;              // amount blended between colors
    this.mixed = false;            // colors fully blended
    this.mixing = false;           // colors currently blending
  }

  // display the blender
  display() {
    // draw juice in blender
    this.drawJuice();

    // draw blender icon
    image(blenderImg, 108, 108, 384, 384);

    // draw clickable blender button
    fill(this.getButtonColor());
    ellipse(this.buttonX, this.buttonY, this.buttonSize);

    // draw text with resulting color when finished mixing
    if (this.mixed && !this.mixing) {
      fill(32, 33, 33);
      textSize(20);
      textAlign('center');
      text('Congrats! You made the color ' + this.juiceColor.toString(), 300, 550);
    }
  }

  // draw juice in blender
  drawJuice() {
    noStroke();
    fill(this.juiceColor);

    // begin juice shape
    beginShape();

    // when blender is mixing, add in noise effect
    // noise effect base code taken from Noise Wave example on p5.js examples
    // https://p5js.org/examples/math-noise-wave.html
    if (this.mixing) {
      let xoff = 0;
      for (let x = 215; x <= 360; x += 6) {
        let y = map(noise(xoff, yoff), 0, 1, 180, 250);
        vertex(x, y);
        xoff += 0.05;
      }
      yoff += 0.01;
    }

    // draw flat top when not mixing
    else {
      vertex(215, 220);
      vertex(360, 220);
    }

    vertex(340, 350);
    vertex(230, 350);
    endShape(CLOSE);
  }

  // mix the colors together
  mix() {
    // mixTime is how much the two colors have blended - 0.5 is halfway between the two
    if (this.mixTime < 0.5) {
      // add to mix time if not fully mixed
      this.mixTime += 0.0025;
      // update juice color to new mix time amount
      this.juiceColor = lerpColor(color1.color(), color2.color(), this.mixTime);
      this.mixing = true;
    } else {
      this.mixed = true;
    }
  }

  // change button color depended on mixed state
  getButtonColor() {
    if (this.mixed) return color(76, 199, 79); // green - finished
    else if (this.mixing) return color(255, 218, 101); // yellow - mixing
    return color(102, 153, 204);  // blue - normal
  }

  // mix the juice when button is clicked
  buttonClicked() {
    // detect if mouse within button range
    let d = dist(mouseX, mouseY, this.buttonX, this.buttonY);
    if (d < this.buttonSize) {
      this.mix();
    } else {
      this.mixing = false;
    }
  }
}