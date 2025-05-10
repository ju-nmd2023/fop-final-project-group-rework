// Variables
let startScreen, gameScreen, endScreen;
let theBall;
let gameStarted = false;
let gameEnded = false;
let wallPlayers = [];
let currentLevel = 1;
let goalScored = false;
let goalDisplayTime = 60; // Time to display "Goal!" (in frames)
let theBallImg, wallPlayerImages = []; // Array for ball and wallplayer images

// Loads the images
function preload() {
  startScreen = loadImage("img/startscreen.png");
  gameScreen = loadImage("img/gamescreen.png");
  endScreen = loadImage("img/endscreen.png");
  theBallImg = loadImage("img/football.png");

  for (let i = 1; i <= 4; i++) {
    wallPlayerImages.push(loadImage(`img/WP${i}.png`));
  }
}

function setup() {
  // Create canvas based on window size
  createCanvas(windowWidth, windowHeight);

  // Create the ball instance
  theBall = new Ball(width / 2 - 45, height - 80, 40, theBallImg);


  // Array containing WallPlayers
  wallPlayers = [ 
    new WallPlayer(
    width / 2,
    height / 2 + 200,
    40,
    80,
    3,
    width / 2 - 200,
    width / 2 + 100,
    wallPlayerImages[0]
  ),
  new WallPlayer(
    width / 2 - 150,
    height / 3 + 210,
    40,
    80,
    4,
    width / 2 - 300,
    width / 2 + 200,
    wallPlayerImages[1]

  ),
  new WallPlayer(
    width / 2 + 100,
    height / 3 + 120,
    40,
    80,
    5,
    width / 2 - 330,
    width / 2 + 250,
    wallPlayerImages[2]

  ),
  new WallPlayer(
    width / 2 + 150,
    height / 4 + 100,
    40,
    80,
    6,
    width / 2 - 280,
    width / 2 + 180,
    wallPlayerImages[3]

  )
 ];
}

// WallPlayer class definition
class WallPlayer {
  constructor(x, y, width, height, speed, leftBound, rightBound, img) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.direction = 1;
    this.leftBound = leftBound;
    this.rightBound = rightBound;
    this.img = img;
  }

  // Display wallplayer
  display() {
    image(this.img, this.x, this.y, this.width, this.height);
  }

  // Move wallplayer with boundary checks
  move() {
    this.x += this.speed * this.direction;

    // Reverse direction if wallplayer hits boundaries
    if (this.x > this.rightBound || this.x < this.leftBound) {
      this.direction *= -1;
    }
  }

  // Check for collision with ball and wallplayer!!!!
  checkCollision(ball) {
    return (
      ball.x < this.x + this.width &&
      ball.x + ball.size > this.x &&
      ball.y < this.y + this.height &&
      ball.y + ball.size > this.y
    );
  }
}

  // BALL'S PROPERTIES AND BEHAVIOR
  class Ball {
  constructor(x, y, size, img) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.img = img;
    this.moving = false;
    this.width = size * 2;
    this.height = size * 1.5;
  }

  // Display the ball
  display() {
    image(this.img, this.x, this.y, this.size * 2, this.size * 1.5);
  }

  // Move the ball
  move() {
    if (this.moving) {
      this.y -= 10;
    }
  }

  //Reset ball position and state
  reset() {
    this.x = width / 2 - 45;
    this.y = height - 80;
    this.moving = false; //Ensuring the ball's not moving when reset
  }
}


function draw() {
  if (!gameStarted) {
    // Display start screen
    image(startScreen, 0, 0, width, height); // Adjust to screen size
  } else if (gameEnded) {
    image(endScreen, 0, 0, width, height); // Display end screen
  } else {
    // Display Level 1 game screen
    image(gameScreen, 0, 0, width, height); // Adjust to screen size
    theBall.display(); //Display the ball
    theBall.move(); //Move the ball


    // Display current level
    textSize(50);
    textFont("Spiky-016");
    textAlign(CENTER);
    fill(255, 255, 0);
    text("Level: " + currentLevel, 250, height / 2 - 300);
  
    // Display "Goal!" when scored
    if (goalScored) {
      textSize(65);
      fill(255, 215, 0); // Gold color
      // textAlign(CENTER);
      text("GOAL!", width / 2, height / 2);

      goalDisplayTime--;
      if (goalDisplayTime <= 0) {
        goalScored = false;
        goalDisplayTime = 60; // Reset the display timer
      }
    }

    // Move and display wallplayers
    for(let i = 0; i < currentLevel; i++) {
      wallPlayers[i].move();
      wallPlayers[i].display();

    // Check collision with the ball
      if (wallPlayers[i].checkCollision(theBall)) {
        restartToLevelOne();
        return; //Skip further checks if collision occurs
      }
    }

    // Check if ball touches wall
     if (theBall.y <= 0) {
      restartToLevelOne();
     } 

    // Goal reached
     if (theBall.y < height * 0.3) {
      theBall.moving = false;
      goalScored = true;
      if (currentLevel < wallPlayers.length) {
        currentLevel++;
      } else {
        gameEnded = true;
      }
      theBall.reset();
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
  theBall.reset(); // Reset ball position
  wallPlayers[0].x = width / 2;
  wallPlayers[1].x = width / 2 - 150;
  wallPlayers[2].x = width / 2 + 100;
  wallPlayers[3].x = width / 2 + 150;
}


// Check if ENTER is pressed
function keyPressed() {
  if (keyCode === ENTER) {
    if (!gameStarted) {
      gameStarted = true;
    } else if (!theBall.moving) {
      theBall.moving = true;
    }
  }
}

/*** This function was developed with assistance from OpenAI's ChatGPT.
 * Source: OpenAI's ChatGPT, October 2024
 * https://chatgpt.com/share/670a5c46-2874-8001-b8b0-95cbb98c4c68 ***/

// Adjust canvas size and reposition elements when the window is resized
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  theBall.x = width / 2 - 45;
  theBall.y = height - 80;
}
