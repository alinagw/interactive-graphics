let video;
let poseNet;
let pose;
let skeleton;
let select;
let elements;
let currElement;
let brain;
let fires = [];
let flameTexture;
let currPose = "";

function preload() {
    flameTexture = loadImage('assets/flame-texture.png');
}

function setup() {
    createCanvas(640, 480);

    elements = {
        fire: 'red',
        water: 'blue',
        earth: 'green',
        air: 'yellow'
    }

    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, poseNetLoaded);
    poseNet.on('pose', gotPoses);
    initializeSelect();
    initializeBrain();

    fires.push(new ParticleSystem(createVector(0, 0), flameTexture));
    fires.push(new ParticleSystem(createVector(0, 0), flameTexture));

    // ps = new ParticleSystem(createVector(width / 2, height - 50), flameTexture);

}

function draw() {
    translate(video.width, 0);
    scale(-1, 1);


    

    // background(255);

    image(video, 0, 0, video.width, video.height);
    if (pose && skeleton) {
        drawSkeleton();
    }

    // if (pose) {
    //     let leftWrist = pose.leftWrist;
    //     if (leftWrist.confidence > 0.25) {
    //         ps.updateOrigin(createVector(leftWrist.x, leftWrist.y + 10));
    //         for (let i = 0; i < 2; i++) {
    //             ps.addParticle();
    //         }
    //         ps.display();
    //     }
    // }

    fires[0].display();
        fires[1].display();

    if (currPose === "Fire Pose 1") {
        fires[0].updateOrigin(createVector(pose.leftWrist.x, pose.leftWrist.y));
        fires[1].updateOrigin(createVector(pose.rightWrist.x, pose.rightWrist.y));
        
        for (let i = 0; i < 2; i++) {
            fires[0].addParticle();
            fires[1].addParticle();
        }
    } else if (currPose === "Earth Pose 1") {
        fill(0, 255, 0);
        rect(pose.leftWrist.x, pose.leftWrist.y, 20, height - pose.leftWrist.y);
    } else if (currPose === "Air Pose 1") {
        fill(0, 0, 255);
        let centerX = (lerp(pose.leftElbow.x, pose.leftWrist.x, 0.5) + lerp(pose.rightElbow.x, pose.rightWrist.x, 0.5)) / 2;
        let centerY = lerp(pose.rightWrist.y, pose.leftWrist.y, 0.5);
        let radius = pose.leftWrist.y - pose.rightWrist.y;
        ellipse(centerX, centerY, radius);
    }
}

/**
 * BRAIN
 */

function initializeBrain() {
    let options = {
        inputs: 34,
        outputs: ["label"],
        task: "classification",
        debug: true
    }

    brain = ml5.neuralNetwork(options);
    loadBrainModel();
}

function loadBrainModel() {
    let modelInfo = {
        // model: 'models/' + currElement + '/model.json',
        // metadata: 'models/' + currElement + '/model_meta.json',
        // weights: 'models/' + currElement + '/model.weights.bin',
        model: 'models/model.json',
        metadata: 'models/model_meta.json',
        weights: 'models/model.weights.bin'
    }
    brain.load(modelInfo, modelLoaded);
}

function modelLoaded() {
    console.log(currElement + " model ready!");
    classifyPose();
}

function classifyPose() {
    if (pose) {
        let inputs = [];
        for (let i = 0; i < pose.keypoints.length; i++) {
            let x = pose.keypoints[i].position.x;
            let y = pose.keypoints[i].position.y;
            inputs.push(x);
            inputs.push(y);
        }
        brain.classify(inputs, gotClassification);
    } else {
        setTimeout(classifyPose, 100);
    }
}

function gotClassification(error, results) {
    // && results[0].confidence > 0.8
    console.log(results[0].label);
    currPose = results[0].label;
    // if (results[0].label === "Fire Pose 1") {
    //     console.log(results[0].label);
    //     currPose = results[0].label;
        
    // }
    // else { 
    //     currPose = "";
    //     // fires = [];
    //  }
    classifyPose();
}

/**
 * POSENET
 */

function poseNetLoaded() {
    console.log("PoseNet ready!");
}

function gotPoses(results) {
    if (results.length > 0) {
        pose = results[0].pose;
        skeleton = results[0].skeleton;
        // console.log(pose);
    }
}

function drawSkeleton() {
    let currColor = elements[currElement];

    for (let i = 0; i < pose.keypoints.length; i++) {
        let x = pose.keypoints[i].position.x;
        let y = pose.keypoints[i].position.y;
        fill(currColor);
        ellipse(x, y, 15, 15);
    }

    for (let i = 0; i < skeleton.length; i++) {
        let a = skeleton[i][0];
        let b = skeleton[i][1];
        strokeWeight(2);
        stroke(currColor);
        line(a.position.x, a.position.y, b.position.x, b.position.y);
    }
}


/** 
 * DOM
 */

function initializeSelect() {
    select = createSelect();
    select.option("Fire");
    select.option("Water");
    select.option("Earth");
    select.option("Air");
    select.selected("Fire");
    select.changed(changeElement);
    changeElement();
}

function changeElement() {
    currElement = select.value().toLowerCase();
}


/**
 * PARTICLE SYSTEM
 */
class ParticleSystem {
    constructor(origin, img) {
        this.particles = [];
        this.origin = origin.copy();
        this.img = img;
    }

    updateOrigin(origin) {
        this.origin = origin.copy();
    }

    addParticle() {
        this.particles.push(new Particle(this.origin.x, this.origin.y, this.img));
    }

    display() {
        let len = this.particles.length;

        for (let i = len - 1; i >= 0; i--) {
            let particle = this.particles[i];
            particle.run();

            if (particle.isDead()) {
                this.particles.splice(i, 1);
            }
        }

    }
}

class Particle {
    // decrease size, alpha
    // move y upward 
    // x side to side but decreasing towards center
    // pos between two points
    // random hue/sat/bright



    constructor(x, y, img) {
        this.pos = createVector(random(x - 20, x + 20), y);
        let vx = randomGaussian() * 0.3;
        let vy = randomGaussian() * 0.5 - 1;
        this.vel = createVector(vx, vy);
        // this.acc = createVector(0.1, this.);

        this.life = round(random(50, 150));
        this.size = random(30, 50);
        this.alpha = 255;
        
        // let xDiff = abs(x - this.pos.x);
        let xDiff = log(map(abs(x - this.pos.x), 0, 20, 0.1, 10)) + 1;
        this.h = round(map(xDiff, 0, 2, 50, 0));
        this.s = floor(random(90, 100));
        this.l = round(map(xDiff, 0, 1, 70, 50));
        // this.flameColor = color('hsl(' + h + ', ' + s + '%, ' + l + '%)');
        
        this.texture = img;

        if (random(100) > 95) {
            this.life += 10;
            this.spark = true;
        }

    }

    update() {
        // this.vel.x += (random(0, 200) - 100) / 2000;
        this.vel.y -= 1/this.life;
        // this.vel.y = -2*noise(this.pos.x/10, this.pos.y/10);
	    this.vel.x = 5*noise(this.pos.x/2, sin(this.pos.y/10), 100*this.vel.x)-2.35;
        this.pos.add(this.vel);
        this.alpha *= 0.96;
        // this.flameColor.setAlpha(this.alpha);
        
        this.life *= 0.96;
        this.size -= 0.5;
        
        // this.life = this.life * 0.95 - 0.3;
        // this.size -= 2;
        // this.alpha *= 0.95;
        // let vy = -2*noise(this.pos.x/50, this.pos.y/50);
        // let vx = 5*noise(this.pos.x/2, sin(this.pos.y/10), 100*this.vel.vx)-2.35;
        // this.vel = createVector(vx, vy);
    }

    isDead() {
        return this.life <= 5 || this.alpha <= 1 || this.size <= 1;
    }

    render() {
        if (this.spark) {
            push();
            strokeWeight(2);
            stroke(255, 255, 0);
            point(this.pos);
            pop();
        } else {
            push();
            colorMode(HSL);
            blendMode(ADD);
            noStroke();
            fill(this.h, 100, this.l, this.alpha);
            ellipse(this.pos.x, this.pos.y, this.size);
            // imageMode(CENTER);
            // tint(this.h, 100, this.l, this.alpha);
            // image(this.texture, this.pos.x, this.pos.y, this.size, this.size);
            pop();
        }
        
    }

    run() {
        this.update();
        this.render();
    }

}