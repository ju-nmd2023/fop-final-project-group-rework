let gameScreen;
let TheBall;
let startScreen;
let ballX, ballY;
let ballMoving = false;
let gameStarted = false;

// Loads the images
function preload() {
  gameScreen = loadImage("img/gamescreen.png");
  TheBall = loadImage("img/football.png");
  startScreen = loadImage("img/startscreen.png");
}

function setup() {
  // Create canvas based on window size
  createCanvas(windowWidth, windowHeight);
  
  // Set initial ball position dynamically
  ballX = width / 2 - 45; // Centers the ball on the canvas
  ballY = height - 80; // Position ball near the bottom
}

function draw() {
  if (!gameStarted) {
    // Display start screen
    image(startScreen, 0, 0, width, height);  // Adjust to screen size
  } else {
    // Display game screen + ball image on the canvas
    image(gameScreen, 0, 0, width, height);  // Adjust to screen size
    image(TheBall, ballX, ballY, 40, 40);  // Size the ball proportionally

    // Ball movement whilst shooting
    if (ballMoving) {
      ballY -= 10;  // Adjust the movement speed
    }

    // Ball reaches the goal
    if (ballY < height * 0.2) {  // Dynamic goal position based on screen height
      ballMoving = false;
    }
  }
}

function keyPressed() {
  // Check if the keyPressed is the ENTER key
  if (keyCode === ENTER) {
    if (!gameStarted) {
      // Set the gameStarted variable to true, starting the game
      gameStarted = true;
    } else {
      ballMoving = true;
    }
  }
}

// Adjust canvas size and reposition elements when the window is resized
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  ballX = width / 2 - 45;
  ballY = height - 80;  // Reposition ball based on new window size
}
