let video;
let poseNet;
let pose;
let skeleton;
let select;
let elements;
let currElement;
let brain;

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
    
}

function draw() {
    translate(video.width, 0);
    scale(-1, 1);

    image(video, 0, 0, video.width, video.height);
    if (pose && skeleton) {
        drawSkeleton();
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
        model: 'models/' + currElement + '/model.json',
        metadata: 'models/' + currElement + '/model_meta.json',
        weights: 'models/' + currElement + '/model.weights.bin',
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
    console.log(results[0].label);
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
    loadBrainModel();
}