/** Most of the code was reorganized and cleaned up to match the requirements for the project (+adding loops/arrays) with help from ChatGPT,
 https://chatgpt.com/c/681f6c4c-dab4-8001-b8d5-baf26bb8c101 */

/** This ChatGPT link includes some help and inspiration with creating backgrounds and texts with animations for all screens, 
 https://chatgpt.com/share/682bbbe2-25c8-8001-9850-8a819f1aea66 */

/** This ChatGPT link includes some help and inspiration with creating animation for the end screen, waving text and bouncing ball,
 https://chatgpt.com/share/682cc896-fac0-8001-a0e3-11ccfbb83ab9 */

/** This ChatGPT link inludes help with an updated reorganizing and structure of the whole code,
 https://chatgpt.com/share/682d037b-5cfc-8001-a584-ee96cdab4b3d */

// Variables
// Variables
let fieldY;
let theBall;
let theBallImg, goalImg;
let gameScreen, endScreen;

let alphas = {
  wave: 0,
  target: 200,
  grafittiText: 0,
};

let endBall = {
  x: -100,
  y: 400,
  speedX: 8,
  velocityY: -10,
  gravity: 0.4,
  size: 60,
};

let gameState = {
  smashed: false,
  started: false,
  ended: false,
  goalScored: false,
};

let goalText = {
  size: 65,
  growing: true,
  displayTime: 60,
};

let startText = {
  size: 30,
  growing: true,
};

let sun = { x: 0, y: 0 };
let currentLevel = 1;

let smashFrame = 0;
let fieldHeight = 550;
let waveSpeed = 0.2;
let startTextGrowing = true;

// Arrays
let wallPlayers = [];
let wallPlayerImages = [];
let cloudXOffsets = [-150, 100, 300];

function preload() {
  goalImg = loadImage("img/goal.png");
  endScreen = loadImage("img/endscreen.png");
  theBallImg = loadImage("img/football.png");
  gameScreen = loadImage("img/gamescreen.png");

  for (let i = 1; i <= 4; i++) {
    wallPlayerImages.push(loadImage(`img/WP${i}.png`));
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  fieldY = height - fieldHeight;
  sun.x = width * 0.85;
  sun.y = height * 0.2;
  theBall = new Ball(width / 2 - 60, height - 170, 40, theBallImg);
  createWallPlayers();
}

function createWallPlayers() {
  let centerX = width / 2;
  let baseY = height / 2;

  wallPlayers = [
    new WallPlayer(centerX, baseY + 200, 40, 80, 3, centerX - 200, centerX + 100, wallPlayerImages[0]),
    new WallPlayer(centerX - 150, baseY + 210, 40, 80, 4, centerX - 300, centerX + 200, wallPlayerImages[1]),
    new WallPlayer(centerX + 100, baseY + 120, 40, 80, 5, centerX - 330, centerX + 250, wallPlayerImages[2]),
    new WallPlayer(centerX + 150, baseY + 100, 40, 80, 6, centerX - 280, centerX + 180, wallPlayerImages[3]),
  ];
}

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

  display() {
    image(this.img, this.x, this.y, this.width, this.height);
  }

  move() {
    this.x += this.speed * this.direction;
    if (this.x > this.rightBound || this.x < this.leftBound) {
      this.direction *= -1;
    }
  }

  checkCollision(ball) {
    return (
      ball.x < this.x + this.width &&
      ball.x + ball.size > this.x &&
      ball.y < this.y + this.height &&
      ball.y + ball.size > this.y
    );
  }
}

class Ball {
  constructor(x, y, size, img) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.img = img;
    this.moving = false;
    this.rotation = 0;
  }

display() {
  push();
  translate(this.x + this.size / 2, this.y + this.size / 2); // Move to center of ball
  rotate(this.rotation); // Rotate around center
  imageMode(CENTER); // Draw from center
  image(this.img, 0, 0, this.size, this.size);
  pop();
}

  move() {
    if (this.moving) {
      this.y -= 20;
      this.rotation += 2;
    }
  }

  reset() {
    this.x = width / 2 - 60;
    this.y = height - 170;
    this.moving = false;
  }
}

function draw() {
  drawGameBackground(); // Draws the same bg for all screens
  alphas.wave = lerp(alphas.wave, alphas.target, 0.02);

  if (!gameState.started) {
    // Display start screen
    drawStartScreen();
  } else if (gameState.ended) {
    drawEndScreen();
  } else {
    // Display Level 1 game screen
    drawFootballField();
    theBall.display(); //Display the ball
    theBall.move(); //Move the ball

    // Display current level
    noStroke();
    textSize(50);
    textFont("Spiky-016");
    textAlign(CENTER);
    fill(0, 100, 255);
    text("Level: " + currentLevel, 1500, height / 1.8 - 300);

    // Display "Goal!" when scored
    if (gameState.goalScored) {
      if (goalText.growing) {
        goalText.size += 2;
        if (goalText.size >= 85) goalText.growing = false;
      } else {
        goalText.size -= 2;
        if (goalText.size <= 65) goalText.growing = true;
      }

      textSize(goalText.size);
      fill(0, 220, 255); // blue color
      textAlign(CENTER, CENTER);
      text("GOAL!", width / 2, height / 2);

      goalText.displayTime--;
      if (goalText.displayTime <= 0) {
        gameState.goalScored = false;
        goalText.displayTime = 60; // Reset the display timer
        goalText.size = 65; // Reset size
        goalText.growing = true;
      }
    }

    // Move and display wallplayers
    for (let i = 0; i < currentLevel; i++) {
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
      gameState.goalScored = true;
      if (currentLevel < wallPlayers.length) {
        currentLevel++;

        /*** This loop was created with help of ChatGPT. Used only for general tips and ideas (e.g., function suggestions and game polish),
         * not for writing core functionality. You can view the specific conversation here:
         *https://chatgpt.com/share/6820efbe-8c98-8001-9cd9-4fe5cd02141a*/
        for (let i = 0; i < currentLevel; i++) {
          wallPlayers[i].speed += 0.4;
        }
      } else {
        gameState.ended = true;
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

// Game text + instructions
function drawStartScreen() {
  fill(0, 100, 255);
  textAlign(CENTER);
  textSize(100);
  textFont("Spiky-016");
  text("GOAL DASH", width / 2, height / 2 - 100);
  fill(0, 220, 255);

  if (startText.growing) {
    startText.size += 0.1;
    if (startText.size >= 35) startText.growing = false;
  } else {
    startText.size -= 0.1;
    if (startText.size <= 28) startText.growing = true;
  }

  textSize(startText.size);
  text("Press ENTER to Start", width / 2, height / 2);
}

function drawGameBackground() {
  // Gradient background
  for (let y = 0; y < height; y++) {
    let inter = map(y, 0, height, 0, 1);
    let c = lerpColor(color("#87CEEB"), color("#ffffff"), inter);
    stroke(c);
    line(0, y, width, y);
  }

  // Draw sun
  noStroke();
  fill(255, 220, 0);
  ellipse(sun.x, sun.y, 150, 150);

  // Animate clouds
  for (let i = 0; i < cloudXOffsets.length; i++) {
    cloudXOffsets[i] += 0.6;
    if (cloudXOffsets[i] > width + 150) {
      cloudXOffsets[i] = -200;
    }
    drawCloud(cloudXOffsets[i], 100 + i * 70);
  }
}

function drawFootballField() {
  // Grass patch
  noStroke();
  fill(0, 120, 0);
  rect(0, fieldY, width, fieldHeight);

  // White lines on the grass
  stroke(255);
  strokeWeight(2);
  noFill();

  // Outer rectangle of field (optional, can comment out if not needed)
  rect(50, fieldY + 20, width - 100, fieldHeight - 40);

  // Now draw the goal area and penalty area near bottom center
  let goalLineY = fieldY + 20 + fieldHeight - 510; // Position of the goal line on the field
  let centerX = width / 2;

  // Goal area rectangle
  rect(centerX - 300, goalLineY - 60, 625, 250);

  // Display and position goal image
  image(goalImg, centerX - 300, goalLineY - 325, 600, 400);

  // Penalty mark & size
  noStroke();
  fill(255);
  ellipse(centerX, goalLineY + 355, 25, 25);
}

function drawCloud(x, y) {
  fill(255);
  noStroke();
  ellipse(x, y, 80, 80);
  ellipse(x + 40, y + 10, 80, 80);
  ellipse(x - 40, y + 10, 80, 80);
  ellipse(x, y + 20, 100, 80);
}

// Check if ENTER is pressed
function keyPressed() {
  if (keyCode === ENTER) {
    if (!gameState.started) {
      gameState.started = true;
      console.log("Game started:", gameState.started);
    } else if (!theBall.moving) {
      theBall.moving = true;
    }
  }
}

function drawEndScreen() {
  drawGameBackground();
  animateBall();
  drawCongratsText();
}

function animateBall() {
  image(theBallImg, endBall.x, endBall.y, endBall.size * 5, endBall.size * 3.5);

  if (endBall.x < width + 100) {
    endBall.x += endBall.speedX;
    endBall.y += endBall.velocityY;
    endBall.velocityY += endBall.gravity;
  }

  if (endBall.x > width / 3 && smashFrame === 0) {
    smashFrame = frameCount;
  }
}

function drawCongratsText() {
  if (smashFrame > 0) {
    let elapsed = frameCount - smashFrame;
    let message = "CONGRATS,YOU MADE IT!!!";
    let fontSize = 60;
    let spacing = 50;
    let waveAmplitude = 20;
    let waveSpeed = 0.2;
    let pulse = sin(elapsed * 0.15) * 5;

    textAlign(CENTER, CENTER);
    textFont("Spiky-016");
    textSize(fontSize + pulse);
    fill(0, 150, 255, alphas.wave);
    noStroke();

    let startX = width / 2 - (message.length * spacing) / 2;
    let y = height / 2 - 100;

    for (let i = 0; i < message.length; i++) {
      let charX = startX + i * spacing;
      let waveY = sin(elapsed * waveSpeed + i * 0.5) * waveAmplitude;

      fill(0, 150, 255, alphas.wave);
      text(message[i], charX + 2, y + waveY + 2);

      fill(0, 150, 255, alphas.wave);
      text(message[i], charX, y + waveY);
    }
  }
}

/*** This function was developed with assistance from OpenAI's ChatGPT,
 * https://chatgpt.com/share/670a5c46-2874-8001-b8b0-95cbb98c4c68 */

// Adjust canvas size and reposition elements when the window is resized
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  fieldY = height - fieldHeight;
  sun.x = width * 0.85;
  sun.y = height * 0.2;
  theBall.reset();
  createWallPlayers();
  for (let i = 0; i < cloudXOffsets.length; i++) {
    cloudXOffsets[i] = -150 + i * 250;
  }
}