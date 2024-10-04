
let LevelsBackground;
let TheBall;
let startScreen;
let ballX = 630;
let ballY = 500;
let ballMoving = false;
let gameStarted = false;

function preload() {
  LevelsBackground = loadImage("img/footballgoal2.png");
  TheBall = loadImage("img/football.png");
  startScreen = loadImage("img/dashstartscreen.png");
}

function setup() {
  createCanvas(1280, 580);
}

function draw() {

  if (!gameStarted) {
    // Display start screen
    image(startScreen, 0, 0 ,1280, 580);
    fill(255); // White text
    textSize(50);
    textAlign(CENTER, CENTER);
    text("Press ENTER to Start", width / 2, height / 2);
  } else {
 
  // Display the background + ball image on the canvas
  image(LevelsBackground, 0, 0, 1280, 580);
  image(TheBall, ballX, ballY, 20,20);

  //Ball movment whilst shooting
  if (ballMoving) {
    ballY -= 20;
  }
  
  //Ball reaches the goal
  if (ballY < 200) {
    ballMoving = false;
  }
}
}


function keyPressed() {

  if (keyCode === ENTER) {
    if (!gameStarted) {

      gameStarted = true;
    } else {
      ballMoving = true;
    }
  }
}