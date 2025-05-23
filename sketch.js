let video;
let facemesh;
let predictions = [];
const indices = [409,270,269,267,0,37,39,40,185,61,146,91,181,84,17,314,405,321,375,291];

function setup() {
  createCanvas(640, 480).position(
    (windowWidth - 640) / 2,
    (windowHeight - 480) / 2
  );
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();

  facemesh = ml5.faceMesh(video, gotResults); // 直接把 gotResults 當 callback
}

function gotResults(results) {
  predictions = results;
}

function draw() {
  background(220);
  image(video, 0, 0, width, height);

  if (predictions.length > 0) {
    let keypoints = predictions[0].scaledMesh;
    stroke(255, 0, 0);
    strokeWeight(15);
    noFill();
    for (let i = 0; i < indices.length - 1; i++) {
      let idxA = indices[i];
      let idxB = indices[i + 1];
      let [x1, y1] = keypoints[idxA];
      let [x2, y2] = keypoints[idxB];
      line(x1, y1, x2, y2);
    }
  }
}
