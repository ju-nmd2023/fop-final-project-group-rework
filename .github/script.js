
let LevelsBackground;
let TheBall;
let ballX = 630;
let ballY = 500;
let ballMoving = false;

function preload() {
  LevelsBackground = loadImage("img/GoalDash.png");
  TheBall = loadImage("img/football.png");
}

function setup() {
  createCanvas(1250, 550);
}

function draw() {
  // Display the background + ball image on the canvas
  image(LevelsBackground, 0, 0, 1250, 550);
  image(TheBall, ballX, ballY, 40, 40);

  //Ball movment whilst shooting
  if (ballMoving) {
    ballY -= 20;
  }
  
  //Ball reaches the goal
  if (ballY < 100) {
    ballMoving = false;
  }
}


function keyPressed() {
  // Making the ball shoot when "enter" is pressed
  if (keyCode === ENTER) {
    ballMoving = true;
  }
}