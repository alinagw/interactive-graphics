let cakeTexture;
let img;

function preload() {
  img = loadImage("cat.jpg");
}

function setup() {
    createCanvas(500, 500, WEBGL);
    angleMode(DEGREES);
    cakeTexture = createGraphics(PI * 150, 150);
    cakeTexture.background(255);
  }
  
  function draw() {
    background(220);
    //orbitControl();
    cakeTexture.fill(100);
    cakeTexture.noStroke();
    cakeTexture.ellipse(mouseX - width / 2, mouseY - height / 2, 20);

    // texture()
    
    texture(cakeTexture);

    // texture(img);
    textureWrap();

    //noStroke();
    rotateX(-20);
    rotateY(-90);
    cylinder(150, 150);
  }