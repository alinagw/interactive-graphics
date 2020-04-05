let video;
let poseNet;
let pose;
let skeleton;

function setup() {
    createCanvas(640, 480);
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw() {
    image(video, 0, 0);
    if (pose && skeleton) {
        drawSkeleton();
    }
}

function modelLoaded() {
    console.log("PoseNet ready!");
}

function gotPoses(results) {
    if (results.length > 0) {
        pose = results[0].pose;
        skeleton = results[0].skeleton;
    }
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