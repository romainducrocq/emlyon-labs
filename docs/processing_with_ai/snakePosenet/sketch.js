let canvas;

let fRate = [2, 5, 10, 20];

let scl = 20;
let xmax = 800;
let ymax = 600;

let s;
let food;

let col;
let lastcol;

let title;
let score;

let tagPause;
let tagPressP;
let buttonPause;

let pause = false;

let tagSpeed;
let sliderSpeed;

let net;
let video;
let currentResult;
let img;

let xvideo = 800;
let yvideo = 600;

let outerCorners = {};
let innerCorners = {};

let pUseCase;

function setup() {
  canvas = createCanvas(xvideo * 2, yvideo);
  canvas.position(0, 0);
  s = new Snake();
  frameRate(fRate[0]);
  pickLocation();

  setColor("DEFAULT");

  title = createDiv('The sneyeke game with PoseNet');
  title.position(10, height + 10);
  title.style('font-size', '24px');
  title.style('font-family','Ubuntu, sans-serif');
  title.style('color',color(51));

  score = createDiv('Score : ' + s.getTotal());
  score.position(500, height + 10);
  score.style('font-size', '40px');
  score.style('font-family','Ubuntu, sans-serif');
  score.style('color',color(255, 0, 100));

  tagPause = createDiv('Pause : ');
  tagPause.position(10, height + 60);
  tagPause.style('font-size', '16px');
  tagPause.style('font-family','Ubuntu, sans-serif');
  tagPause.style('color',color(51));

  buttonPause = createButton("PAUSE");
  buttonPause.position(150, height + 60);
  buttonPause.mousePressed(pauseGame);

  tagPressP = createDiv('or press P');
  tagPressP.position(250, height + 60);
  tagPressP.style('font-size', '16px');
  tagPressP.style('font-family','Ubuntu, sans-serif');
  tagPressP.style('color',color(51));

  tagSpeed = createDiv('Speed : ');
  tagSpeed.position(10, height + 100);
  tagSpeed.style('font-size', '16px');
  tagSpeed.style('font-family','Ubuntu, sans-serif');
  tagSpeed.style('color',color(51));

  sliderSpeed = createSlider(0, 3, 0, 1);
  sliderSpeed.position(150, height + 100);

  video = createCapture(VIDEO);

  // The line below + the videoLoadedCallback were added
  // after the video was shot to fix compability issues.
  video.elt.addEventListener('loadeddata', videoLoadedCallback);

  video.size(xvideo, yvideo);
  video.hide();

  outerCorners = {
    "upperLeft": {"x": 0, "y": 0},
    "upperRight": {"x": width / 2, "y": 0},
    "lowerLeft": {"x": 0, "y": height},
    "lowerRight": {"x": width / 2, "y": height}
  };
  innerCorners = {
    "upperLeft": {"x": width / 6, "y": height / 3},
    "upperRight": {"x": width / 3, "y": height / 3},
    "lowerLeft": {"x": width / 6, "y": height * 2 / 3},
    "lowerRight": {"x": width / 3, "y": height * 2 / 3}
  };

  diagonalUlToLr = linearCoefficients(outerCorners.upperLeft, outerCorners.lowerRight);
  diagonalLlToUr = linearCoefficients(outerCorners.lowerLeft, outerCorners.upperRight);

  pUseCase = createP("");
  pUseCase.position(xvideo, yvideo);
  pUseCase.style('font-size', '16px');
  pUseCase.style('font-family','Ubuntu, sans-serif');
  pUseCase.style('color',color(51));

  pUseCase.html("<strong>Controll the snake with your eyes !</strong>" + "<br>" +
  "Give the direction by moving your eyes through the different parts of the screen: " + "<br>" +
  "   - CENTER: do nothing." + "<br>" +
  "   - TOP, BOTTOM, LEFT, RIGHT: move up, down, left, right." + "<br>" +
  "<br>" +
  "SPEED: " + "<br>" +
  "The controll is super difficult, therefore the game speed is set to super slow." + "<br>" +
  "However if you are the GOAT, you can increase the speed with the slider." + "<br>" +
  "(But be aware of lag caused video processing with higher framerate.)" + "<br>" +
  "<br>" +
  "PAUSE: " + "<br>" +
  "Take a break and pause the game." + "<br>" +
  "Wether by hitting the button or pressing the P key." + "<br>" +
  "<br>" +
  "KEYBOARD: " + "<br>" +
  "If you're a noob like me, you can still play with the arrow keys."
);

  background(255);
  image(video, 0, 0, xvideo, yvideo);
  translate(width,0);
  scale(-1.0,1.0);
  image(video, 0, 0, xvideo, yvideo);
  fill(51);
  rect(xvideo + 0, 0, xmax, ymax);

  if(s.eat(food)){
    pickLocation();
    setColor("RANDOM");
  }
  s.show();

  showFood();
  showText();
  showBorders();
}

function pickLocation(){
  let cols = floor(xmax/scl);
  let rows = floor(ymax/scl);
  food = createVector(floor(random(cols)), floor(random(rows)));
  food.mult(scl);
}

function setColor(type){
  switch (type) {
    case "DEFAULT":
      lastcol = color(255);
      col = color(255, 0, 100);
      break;
    case "RANDOM":
      lastcol = col;
      col = color(floor(random(255)), floor(random(255)), floor(random(255)));
      break;
    default:
      break;
  }
}

function draw() {

if(!pause){

  background(255);
  frameRate(fRate[sliderSpeed.value()]);

  image(video, 0, 0, xvideo, yvideo);
  translate(width,0);
  scale(-1.0,1.0);
  image(video, 0, 0, xvideo, yvideo);

  if (currentResult) {
    /*let nose = currentResult.keypoints[0].position;*/
    let leftEye = currentResult.keypoints[1].position;
    let rightEye = currentResult.keypoints[2].position;
    /*let leftEar = currentResult.keypoints[3].position;
    let rightEar = currentResult.keypoints[4].position;
    let leftShoulder = currentResult.keypoints[5].position;
    let rightShoulder = currentResult.keypoints[6].position;
    let leftElbow = currentResult.keypoints[7].position;
    let rightElbow = currentResult.keypoints[8].position;
    let leftWrist = currentResult.keypoints[9].position;
    let rightWrist = currentResult.keypoints[10].position;
    let leftHip = currentResult.keypoints[11].position;
    let rightHip = currentResult.keypoints[12].position;
    let leftKnee = currentResult.keypoints[13].position;
    let rightKnee = currentResult.keypoints[14].position;
    let leftAnkle = currentResult.keypoints[15].position;
    let rightAnkle = currentResult.keypoints[16].position;*/

    strokeWeight(3);
    line(outerCorners.upperLeft.x, outerCorners.upperLeft.y, innerCorners.upperLeft.x, innerCorners.upperLeft.y);
    line(outerCorners.upperRight.x, outerCorners.upperRight.y, innerCorners.upperRight.x, innerCorners.upperRight.y);
    line(outerCorners.lowerLeft.x, outerCorners.lowerLeft.y, innerCorners.lowerLeft.x, innerCorners.lowerLeft.y);
    line(outerCorners.lowerRight.x, outerCorners.lowerRight.y, innerCorners.lowerRight.x, innerCorners.lowerRight.y);

    line(innerCorners.upperLeft.x, innerCorners.upperLeft.y, innerCorners.lowerLeft.x, innerCorners.lowerLeft.y);
    line(innerCorners.upperLeft.x, innerCorners.upperLeft.y, innerCorners.upperRight.x, innerCorners.upperRight.y);
    line(innerCorners.lowerRight.x, innerCorners.lowerRight.y, innerCorners.lowerLeft.x, innerCorners.lowerLeft.y);
    line(innerCorners.lowerRight.x, innerCorners.lowerRight.y, innerCorners.upperRight.x, innerCorners.upperRight.y);
    strokeWeight(1);

    if( //center
      (leftEye.x > innerCorners.upperLeft.x && rightEye.x > innerCorners.upperLeft.x) &&
      (leftEye.x < innerCorners.upperRight.x && rightEye.x < innerCorners.upperRight.x) &&
      (leftEye.y > innerCorners.upperLeft.y && rightEye.y > innerCorners.upperLeft.y) &&
      (leftEye.y < innerCorners.lowerLeft.y && rightEye.y < innerCorners.lowerLeft.y)
    ){
      showEyes('green', leftEye, rightEye);
    }else if( //up
      (leftEye.x > linearFunctionX(leftEye.y, diagonalUlToLr) && rightEye.x > linearFunctionX(rightEye.y, diagonalUlToLr)) &&
      (leftEye.x < linearFunctionX(leftEye.y, diagonalLlToUr) && rightEye.x < linearFunctionX(rightEye.y, diagonalLlToUr)) &&
      (leftEye.y > outerCorners.upperLeft.y && rightEye.y > outerCorners.upperLeft.y) &&
      (leftEye.y < innerCorners.upperLeft.y && rightEye.y < innerCorners.upperLeft.y)
    ){
      showEyes('blue', leftEye, rightEye);
      up();
    }else if( //down
      (leftEye.x > linearFunctionX(leftEye.y, diagonalLlToUr) && rightEye.x > linearFunctionX(rightEye.y, diagonalLlToUr)) &&
      (leftEye.x < linearFunctionX(leftEye.y, diagonalUlToLr) && rightEye.x < linearFunctionX(rightEye.y, diagonalUlToLr)) &&
      (leftEye.y > innerCorners.lowerLeft.y && rightEye.y > innerCorners.lowerLeft.y) &&
      (leftEye.y < outerCorners.lowerLeft.y && rightEye.y < outerCorners.lowerLeft.y)
    ){
      showEyes('red', leftEye, rightEye);
      down();
    }else if( //left
      (leftEye.x > outerCorners.upperLeft.x && rightEye.x > outerCorners.upperLeft.x) &&
      (leftEye.x < innerCorners.upperLeft.x && rightEye.x < innerCorners.upperLeft.x) &&
      (leftEye.y > linearFunctionY(leftEye.x, diagonalUlToLr) && rightEye.y > linearFunctionY(rightEye.x, diagonalUlToLr)) &&
      (leftEye.y < linearFunctionY(leftEye.x, diagonalLlToUr) && rightEye.y < linearFunctionY(rightEye.x, diagonalLlToUr))
    ){
      showEyes('yellow', leftEye, rightEye);
      left();
    }else if( //right
      (leftEye.x > innerCorners.upperRight.x && rightEye.x > innerCorners.upperRight.x) &&
      (leftEye.x < outerCorners.upperRight.x && rightEye.x < outerCorners.upperRight.x) &&
      (leftEye.y > linearFunctionY(leftEye.x, diagonalLlToUr) && rightEye.y > linearFunctionY(rightEye.x, diagonalLlToUr)) &&
      (leftEye.y < linearFunctionY(leftEye.x, diagonalUlToLr) && rightEye.y < linearFunctionY(rightEye.x, diagonalUlToLr))
    ){
      showEyes('orange', leftEye, rightEye);
      right();
    }

  }

  fill(51);
  rect(xvideo + 0, 0, xmax, ymax);

  if(s.eat(food)){
    pickLocation();
    setColor("RANDOM");
  }

  if(s.update()){
    setColor("DEFAULT");
  }
  s.show();

  showFood();
  showText();
  showBorders();
  }
}

function showFood(){
  fill(col);
  rect(xvideo + food.x, food.y, scl, scl);
}

function showText(){
  score.html('Score : ' + s.getTotal());
}

function showBorders(){
  stroke(255, 0, 100);
  strokeWeight(3);
  line(xvideo + 0, 0, xvideo + xmax, 0);
  line(xvideo + 0, 0, xvideo + 0, ymax);
  line(xvideo + xmax, 0, xvideo + xmax, ymax);
  line(xvideo + 0, ymax, xvideo + xmax, ymax);
  stroke(0);
  strokeWeight(1);
}

function up(){
  if(s.canTurn("UP") && !pause){
    s.dir(0, -1);
    s.setLastDir("UP");
  }
}

function down(){
  if(s.canTurn("DOWN") && !pause){
    s.dir(0, 1);
    s.setLastDir("DOWN");
  }
}

function left(){
  if(s.canTurn("LEFT") && !pause){
    s.dir(-1, 0);
    s.setLastDir("LEFT");
  }
}

function right(){
  if(s.canTurn("RIGHT") && !pause){
    s.dir(1, 0);
    s.setLastDir("RIGHT");
  }
}

function keyPressed() {
  if(keyCode === 80){ //P
    pauseGame();
  }else if(keyCode === UP_ARROW){
    up();
  }else if (keyCode === DOWN_ARROW){
    down();
  }else if (keyCode === LEFT_ARROW){
    //left();
    right();
  }else if (keyCode === RIGHT_ARROW){
    //right();
    left();
  }
}

function pauseGame() {
  pause = !pause;
  if(pause){
    buttonPause.style('color',color(255, 0, 100));
  }else{
    buttonPause.style('color',color(51));
  }
}

// The new callback
function videoLoadedCallback() {
  print("Video Loaded");
  posenet.load().then(loadedCallback);
}

function loadedCallback(model) {
  print("Model loaded!");
  net = model;
  net.estimateSinglePose(video.elt).then(estimateCallback);
}

function estimateCallback(result) {
  currentResult = result;
  net.estimateSinglePose(video.elt).then(estimateCallback);
}

function linearCoefficients(p1, p2){
  let a = (p2.y - p1.y) / (p2.x - p1.x);
  let b = p2.y - a * p2.x;
  return { "a": a, "b": b};
}

function linearFunctionY(x, coeffs){
  return coeffs.a * x + coeffs.b;
}

function linearFunctionX(y, coeffs){
  return (y - coeffs.b) / coeffs.a;
}

function showEyes(c, leftEye, rightEye){
  fill(c);
  ellipse(leftEye.x, leftEye.y, 20, 20);
  ellipse(rightEye.x, rightEye.y, 20, 20);
}
