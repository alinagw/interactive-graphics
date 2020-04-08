let video;
let poseNet;
let pose;
let skeleton;
let brain;
let state = "waiting";
let select;
let trainingPose;

function setup() {
    createCanvas(640, 480);
   
    video = createCapture(VIDEO);
    video.hide();
    
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);

    let options = {
        inputs: 34,
        outputs: ["label"],
        task: "classification",
        debug: true
    }

    brain = ml5.neuralNetwork(options);

    initializeSelect();
}

function draw() {
    translate(video.width, 0);
    scale(-1, 1);
    image(video, 0, 0, video.width, video.height);
    if (pose && skeleton) {
        drawSkeleton();
    }
}

function keyPressed() {
    if (keyCode === 32) collectData();
    else if (key === 's') brain.saveData();
    else if (key === 't') trainModel();
}

function modelLoaded() {
    console.log("PoseNet ready!");
}

function gotPoses(results) {
    if (results.length > 0) {
        pose = results[0].pose;
        skeleton = results[0].skeleton;
        if (state === "collecting") {
            let inputs = [];
            for (let i = 0; i < pose.keypoints.length; i++) {
                let x = pose.keypoints[i].position.x;
                let y = pose.keypoints[i].position.y;
                inputs.push(x);
                inputs.push(y);
            }

            let target = { label: trainingPose };
            brain.addData(inputs, target);
        }
    }
}

function initializeSelect() {
    select = createSelect();
    for (let i = 1; i <= 5; i++) {
        select.option("Fire Pose " + i);
        select.option("Water Pose " + i);
        select.option("Earth Pose " + i);
        select.option("Air Pose " + i);
    }
    select.selected("Fire Pose 1");
    select.changed(updateTrainingPose);
    updateTrainingPose();
}

function updateTrainingPose() {
    trainingPose = select.value();
}

async function collectData() {
    await new Promise((resolve, reject) => setTimeout(resolve, 10000));
    state = "collecting";
    console.log(state);
    await new Promise((resolve, reject) => setTimeout(resolve, 10000));
    state = "waiting";
    console.log(state);
}

function drawSkeleton() {
    for (let i = 0; i < pose.keypoints.length; i++) {
        let x = pose.keypoints[i].position.x;
        let y = pose.keypoints[i].position.y;
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

function trainModel() {
    brain.loadData("fire-poses.json", dataReady);
}

function dataReady() {
    brain.normalizeData();
    brain.train({epochs: 50}, finished);
}

function finished() {
    console.log("model finished");
    brain.save();
}