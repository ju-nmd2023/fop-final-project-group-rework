

let LevelsBackground;
let TheBall;
let ballX = 400;
let ballY = 400;

function preload() {
  LevelsBackground = loadImage("img/GoalDash.png");
  TheBall = loadImage("img/football.png");
}

function setup() {
  createCanvas(800, 500);
}

function draw() {
  // Display the background image on the canvas
  image(LevelsBackground, 0, 0, 800, 500);
  image(TheBall, ballX, ballY, 40, 40);
}

function keyPressed() {
  // Check if the "Enter" key is pressed
  if (keyCode === ENTER) {
    // Move the ball upwards
    ballY -= 10;
  }
}