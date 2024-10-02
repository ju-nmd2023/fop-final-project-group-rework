function preload() {
  LevelsBackground = loadImage("img/GoalDash.png");
}

function setup() {
  createCanvas(800, 500);
}

function draw() {
  // Display the background image on the canvas
  image(LevelsBackground, 0, 0, 800, 500);
}
