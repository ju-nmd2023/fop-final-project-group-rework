let gameScreen;
let TheBall;
let startScreen;
let ballX = 640;
let ballY = 500;
let ballMoving = false;
let gameStarted = false;
let wallPlayerOneX = 640;
let wallPlayerOneSpeed = 1;
let wallPlayerOneDirection = 1;
let wallPlayerTwoX = 340;
let wallPlayerTwoSpeed = 2;
let wallPlayerTwoDirection = 1;
let wallWidth = 40;
let wallHeight = 80;
let currentLevel = 1;

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

  // Initialize player's position
  wallPlayerOneX = width / 2;
  wallPlayerTwoX = width / 2 - 150;
}

function draw() {
  if (!gameStarted) {
    // Display start screen
    image(startScreen, 0, 0, width, height); // Adjust to screen size
  } else {
    if (currentLevel === 1) {
      // Display Level 1 game screen
      image(gameScreen, 0, 0, width, height); // Adjust to screen size
      image(TheBall, ballX, ballY, 40, 40); // Display ball

      // Ball movement whilst shooting
      if (ballMoving) {
        ballY -= 10; // Adjust the movement speed
      }

      // Checks for collision with wall player
      if (
        ballX < wallPlayerOneX + wallWidth &&
        ballX + 40 > wallPlayerOneX &&
        ballY < height / 2 + wallHeight &&
        ballY + 40 > height / 2
      ) {
        //collision detected
        ballMoving = false; //this stops the ball
        ballY += 5; //this pushes the ball back slightly
      }

      // Ball reaches the goal
      if (ballY < height * 0.2) {
        ballMoving = false;
        currentLevel = 2; // Switch to level 2
        resetLevel2(); // Reset ball and wall player positions for Lv2
      }

      // Update wall player position
      updateWallPlayerOne();
    } else if (currentLevel === 2) {
      image(gameScreen, 0, 0, width, height); // Adjust to screen size
      image(TheBall, ballX, ballY, 40, 40); // Display ball
      fill(255);
      textSize(80);
      text("SCORE!!!", width / 2 - 190, height / 2 - 300);

      // Ball movement while shooting in Level 2
      if (ballMoving) {
        ballY -= 10; // Adjust the movement speed
      }

      // Update and draw 2 wall players
      updateWallPlayerOne();
      updateWallPlayerTwo();
    }
  }
}

// Update wall player´s position for Level 1 and Level 2
function updateWallPlayerOne() {
  // Update wall player's position
  wallPlayerOneX += wallPlayerOneSpeed * wallPlayerOneDirection;

  // Check if wall player hits the right or left edge
  if (wallPlayerOneX > width / 2 + 100 || wallPlayerOneX < width / 2 - 200) {
    wallPlayerOneDirection *= -1; // Reverse direction
  }

  // Initial drawing of wall players
  fill(30, 144, 255);
  rect(wallPlayerOneX, height / 2, 40, 80);
}

function updateWallPlayerTwo() {
  wallPlayerTwoX += wallPlayerTwoSpeed * wallPlayerTwoDirection;

  if (wallPlayerTwoX > width / 2 + 200 || wallPlayerTwoX < width / 2 - 300) {
    wallPlayerTwoDirection *= -1; // Reverse direction
  }

  // Drawing wall player 2
  fill(30, 144, 255);
  rect(wallPlayerTwoX, height / 3, 40, 80); // Draw second player in different Y position
}

// Reset ball and wall player positions for Level 2
function resetLevel2() {
  ballX = width / 2 - 45;
  ballY = height - 80;
  wallPlayerOneX = width / 2;
  wallPlayerTwoX = width / 2 - 150;
}

function keyPressed() {
  // Check if ENTER is pressed
  if (keyCode === ENTER) {
    if (!gameStarted) {
      gameStarted = true;
    } else if (!ballMoving) {
      ballMoving = true;
    }
  }
}

// Adjust canvas size and reposition elements when the window is resized
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  ballX = width / 2 - 45;
  ballY = height - 80;
}
