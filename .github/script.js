function preload() {
  LevelsBackground = loadImage("img/GoalDash.png");
}

function setup() {
  createCanvas(600, 400);
}

function draw() {
  // Display the background image on the canvas
  image(LevelsBackground, 0, 0, 600, 400);
}
