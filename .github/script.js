// Variables
let gameScreen;
let TheBall;
let startScreen;
let ballX = 640;
let ballY = 500;
let ballMoving = false;
let gameStarted = false;
let wallPlayerOne, wallPlayerTwo, wallPlayerThree, wallPlayerFour;
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
 
  // Positions for WallPlayers
  wallPlayerOne = new WallPlayer(
    width / 2,
    height / 2 + 170,
    40,
    80,
    4,
    width / 2 - 200,
    width / 2 + 100
  );
  wallPlayerTwo = new WallPlayer(
    width / 2 - 150,
    height / 3 + 220,
    40,
    80,
    5,
    width / 2 - 220,
    width / 2 + 120
  );
  wallPlayerThree = new WallPlayer(
    width / 2 + 100,
    height / 3 + 130,
    40,
    80,
    6,
    width / 2 - 320,
    width / 2 + 250
  );
  wallPlayerFour = new WallPlayer(
    width / 2 + 150,
    height / 4 + 110,
    40,
    80,
    7,
    width / 2 - 270,
    width / 2 + 190
  );
}

// WallPlayer class definition
class WallPlayer {
  constructor(x, y, width, height, speed, leftBound, rightBound) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.direction = 1;
    this.leftBound = leftBound;
    this.rightBound = rightBound;
  }

  // Display wallplayer
  display() {
    fill(30, 144, 255);
    rect(this.x, this.y, this.width, this.height);
  }

  // Move wallplayer with boundary checks
  move() {
    this.x += this.speed * this.direction;

    // Reverse direction if wallplayer hits boundaries
    if (this.x > this.rightBound || this.x < this.leftBound) {
      this.direction *= -1;
    }
  }

  // Check for collision with ball and wallplayer
  checkCollision(ballX, ballY, ballSize) {
    return (
      ballX < this.x + this.width &&
      ballX + ballSize > this.x &&
      ballY < this.y + this.height &&
      ballY + ballSize > this.y
    );
  }
}

function draw() {
  if (!gameStarted) {
    // Display start screen
    image(startScreen, 0, 0, width, height); // Adjust to screen size
  } else {
    // Display Level 1 game screen
    image(gameScreen, 0, 0, width, height); // Adjust to screen size
    image(TheBall, ballX, ballY, 40, 40); // Display ball

    // Ball movement whilst shooting
    if (ballMoving) {
      ballY -= 10; // Adjust the movement speed
    }

    // Checks for collision with wall player 1
    if (currentLevel === 1) {
      wallPlayerOne.move();
      wallPlayerOne.display();
      if (wallPlayerOne.checkCollision(ballX, ballY, 40)) {
        //collision detected, reset game to level 1
        restartToLevelOne();
      }
    } else if (currentLevel === 2) {
      wallPlayerOne.move();
      wallPlayerOne.display();
      wallPlayerTwo.move();
      wallPlayerTwo.display();
      if (
        wallPlayerOne.checkCollision(ballX, ballY, 40) ||
        wallPlayerTwo.checkCollision(ballX, ballY, 40)
      ) {
        restartToLevelOne();
      }
    } else if (currentLevel === 3) {
      wallPlayerOne.move();
      wallPlayerOne.display();
      wallPlayerTwo.move();
      wallPlayerTwo.display();
      wallPlayerThree.move();
      wallPlayerThree.display();
      if (
        wallPlayerOne.checkCollision(ballX, ballY, 40) ||
        wallPlayerTwo.checkCollision(ballX, ballY, 40) ||
        wallPlayerThree.checkCollision(ballX, ballY, 40)
      ) {
        //collision detected, reset to level 1
        restartToLevelOne();
      }
    } else if (currentLevel === 4) {
      wallPlayerOne.move();
      wallPlayerOne.display();
      wallPlayerTwo.move();
      wallPlayerTwo.display();
      wallPlayerThree.move();
      wallPlayerThree.display();
      wallPlayerFour.move();
      wallPlayerFour.display();
      if (
        wallPlayerOne.checkCollision(ballX, ballY, 40) ||
        wallPlayerTwo.checkCollision(ballX, ballY, 40) ||
        wallPlayerThree.checkCollision(ballX, ballY, 40) ||
        wallPlayerFour.checkCollision(ballX, ballY, 40)
      ) {
        //collision detected, back to level 1
        restartToLevelOne();
      }
    }

    // Check if ball touches the top of the screen (wall)
    if (ballY <= 0) {
      // Ball touches the wall, reset game to level 1
      restartToLevelOne();
    }

    // Check if ball reaches goal
    if (ballY < height * 0.2) {
      ballMoving = false;
      if (currentLevel < 4) {
        currentLevel++; // Progress to next level
      }
      resetGame(); // Reset for next level
    }
  }
}

// Function to restart the game from level 1
function restartToLevelOne() {
  currentLevel = 1; // Reset level to 1
  resetGame(); // Reset ball and wall player positions
}

// Reset ball and wall player positions for next level
function resetGame() {
  ballX = width / 2 - 45;
  ballY = height - 80;
  wallPlayerOne.x = width / 2;
  wallPlayerTwo.x = width / 2 - 150;
  wallPlayerThree.x = width / 2 + 100;
  wallPlayerFour.x = width / 2 + 150;

  ballMoving = false; // Ensure ball is not moving
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
