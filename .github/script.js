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

  wallPlayerOne = new WallPlayer(width / 2, height / 2, 40, 80, 3, width / 2 - 200, width / 2 + 100);
  wallPlayerTwo = new WallPlayer(width / 2 - 150, height / 3, 40, 80, 4, width / 2 - 300, width / 2 + 200);
  wallPlayerThree = new WallPlayer(width / 2 + 100, height / 3 + 100, 40, 80, 5, width / 2 - 400, width / 2 + 300);
  wallPlayerFour = new WallPlayer(width / 2 + 150, height / 4, 40, 80, 6, width / 2 - 500, width / 2 + 400);
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
        ballMoving = false;
        ballY += 5;
      }
    } else if (currentLevel === 2) {
      wallPlayerOne.move();
      wallPlayerOne.display();
      wallPlayerTwo.move();
      wallPlayerTwo.display();
      if (wallPlayerOne.checkCollision(ballX, ballY, 40) || wallPlayerTwo.checkCollision(ballX, ballY, 40)) {
        ballMoving = false;
        ballY += 5;
      }
    } else if (currentLevel === 3) {
      wallPlayerOne.move();
      wallPlayerOne.display();
      wallPlayerTwo.move();
      wallPlayerTwo.display();
      wallPlayerThree.move();
      wallPlayerThree.display();
      if (wallPlayerOne.checkCollision(ballX, ballY, 40) || wallPlayerTwo.checkCollision(ballX, ballY, 40) || wallPlayerThree.checkCollision(ballX, ballY, 40)) {
        ballMoving = false;
        ballY += 5;
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
      if (wallPlayerOne.checkCollision(ballX, ballY, 40) || wallPlayerTwo.checkCollision(ballX, ballY, 40) || wallPlayerThree.checkCollision(ballX, ballY, 40) || wallPlayerFour.checkCollision(ballX, ballY, 40)) {
        ballMoving = false;
        ballY += 5;
      }
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

// Reset ball and wall player positions for next level
function resetGame() {
  ballX = width / 2 - 45;
  ballY = height - 80;
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
