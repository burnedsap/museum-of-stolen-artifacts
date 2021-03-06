// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Webcam Image Classification using a pre-trained customized model and p5.js
This example uses p5 preload function to create the classifier
=== */

// Classifier Variable
let classifier;
// Model URL
let imageModelURL = "./model/";

// Video
let video;
let flippedVideo;
// To store the classification
let label = "";
let clientHeight, clientWidth;
let InterR;

// Load the model first
function preload() {
  clientHeight = document.getElementById("camera-holder").clientHeight;
  clientWidth = document.getElementById("camera-holder").clientWidth;
  classifier = ml5.imageClassifier(imageModelURL + "model.json");
   interR = loadFont('fonts/Inter-Regular.ttf');
}

function setup() {
  // createCanvas(640, 480);
//  console.log(clientWidth+" "+clientHeight);
  var canvas = createCanvas(clientWidth, clientWidth);
//  console.log('canvas setup done');
  canvas.parent("camera-holder");
//  pixelDensity(1);

// Create the video
 var constraints = {
    audio: false,
    video: {
      facingMode: {
        exact: "environment"
      }
    }
    //video: {
    //facingMode: "user"
    //}
  };
  video = createCapture(constraints);
//  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  flippedVideo = ml5.flipImage(video);
  // Start classifying
  classifyVideo();
}

function draw() {

  background(0);
  // Draw the video
  image(video, 0, 35);

  // Draw the label
document.getElementById("text-label").innerHTML = label;  
//  text(label, 5, height-40);
}

// Get a prediction for the current video frame
function classifyVideo() {
  flippedVideo = ml5.flipImage(video);
  classifier.classify(flippedVideo, gotResult);
}

// When we get a result
function gotResult(error, results) {
  // If there is an error
  if (error) {
    console.error(error);
    return;
  }
  // The results are in an array ordered by confidence.
  // console.log(results[0]);
  label = results[0].label;
  // Classifiy again!
  classifyVideo();
}

