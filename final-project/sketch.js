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
let tree;
let currPose = "";
// let airball;

function preload() {
    flameTexture = loadImage('assets/flame-texture.png');
}

function setup() {
    createCanvas(640, 480);
    angleMode(DEGREES);
    

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
    // initializeSelect();
    initializeBrain();

    fires.push(new FireParticleSystem(createVector(0, 0), flameTexture));
    fires.push(new FireParticleSystem(createVector(0, 0), flameTexture));

    tree = new Tree(10);
    // airball = new AirBall(0, 0, 0, 0);
    // airball.addEllipse();

    // ps = new ParticleSystem(createVector(width / 2, height - 50), flameTexture);

}

function draw() {
    translate(video.width, 0);
    scale(-1, 1);




    // background(255);

    image(video, 0, 0, video.width, video.height);
    // if (pose && skeleton) {
    //     drawSkeleton();
    // }

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

    // if (currPose === "Fire Pose 1") {
    //     fires[0].updateOrigin(createVector(pose.leftWrist.x, pose.leftWrist.y));
    //     fires[1].updateOrigin(createVector(pose.rightWrist.x, pose.rightWrist.y));

    //     for (let i = 0; i < 2; i++) {
    //         fires[0].addParticle();
    //         fires[1].addParticle();
    //     }
    // } 
    
    // if (currPose === "Earth Pose 1") {
    //     push();
    //     strokeWeight(10);
    //     colorMode(HSL);
    //     stroke(130, 100, 25);
    //     translate(pose.leftWrist.x,height);
    //     // Draw a line 120 pixels
        
    //     line(0,0,0,-(height-lerp(pose.leftWrist.y, height, 0.33)));
    //     // Move to the end of that line
    //     translate(0,-(height-lerp(pose.leftWrist.y, height, 0.33)));
    //     let branches = map(height - pose.leftWrist.y, 0, height, 10, 150);
    //     tree.startBranch(branches);
    //     pop();
    //     // rect(pose.leftWrist.x, pose.leftWrist.y, 20, height - pose.leftWrist.y);
    // } 
    
    if (currPose === "Air Pose 1") {
       
        fill(0, 0, 255);
        let top = pose.rightWrist.y;
        let bottom = pose.leftWrist.y;
        let centerX = (lerp(pose.leftElbow.x, pose.leftWrist.x, 0.5) + lerp(pose.rightElbow.x, pose.rightWrist.x, 0.5)) / 2;
        let centerY = lerp(pose.rightWrist.y, pose.leftWrist.y, 0.5);
        let radius = pose.leftWrist.y - pose.rightWrist.y;

        // airball.updateInfo(radius, centerX, pose.rightWrist.y, pose.leftWrist.y);
        // airball.display();
        noStroke();
        push();
        colorMode(HSL);
        fill(200, 100, 90);
        ellipse(centerX, centerY, radius);
        pop();
        for (let i = 1; i <= 30; i++) {
            let rad = radius;
            // if (i <= 15) rad = map(log(i) + 1, 1, 2.2, radius/4, radius);
            // else if (i >= 16) rad = map(log(30 - i) + 1, 1, 2.15, radius, radius/4);
            
            // let deg;
            // if (i <= 15) deg = map(i, 1, 15, 0, PI);
            // else if (i >= 16) deg = map(i, 16, 30, PI, 0);
            // rad = sin(deg) * radius * 10;
            
            if (i < 14) rad = map(i, 1, 13, radius / 2, radius);
            else if (i > 16) rad = map(i, 17, 30, radius, radius / 2);
            let y = lerp(pose.rightWrist.y, pose.leftWrist.y, i / 30);
            push();
            colorMode(HSL);
            blendMode(OVERLAY);
            // let h, s, l;
            // if (frameCount % 100 === 0) {
                let h = round(random(185, 210));
                let s = round(random(75, 100));
                let l = round(random(50, 80));
            // }
            
            fill(h, s, l);
            ellipse(centerX, y, rad, 30);
            pop();
        }

        
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
    noStroke();
    for (let i = 0; i < pose.keypoints.length; i++) {
        let x = pose.keypoints[i].position.x;
        let y = pose.keypoints[i].position.y;
        fill(255);
        ellipse(x, y, 15, 15);
    }

    for (let i = 0; i < skeleton.length; i++) {
        let a = skeleton[i][0];
        let b = skeleton[i][1];
        strokeWeight(2);
        stroke(255);
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