// Setup
function setup() {
    createCanvas(800, 600);
    frameRate(30);
  }
  
  // Cat Blueprint, specific properties
  class Cat {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.color = [255, 255, 255];
      this.speed = 15;
      this.isFast = false;
      this.isHappy = false;
      this.isSad = false;
      this.happyTimer = 0;
      this.sadTimer = 0;
      this.fastTimer = 0;
      this.isColor = false;
      this.colorTimer = 0;
    }
  
    // Updates horizontal position of the cat within range
    updatePosition(direction) {
      if (direction === "left") {
        this.x -= this.speed;
      } else if (direction === "right") {
        this.x += this.speed;
      }
      this.x = constrain(this.x, 50, 750);
    }
  
    // Happy Cat Design
    drawHappy() {
      fill(this.color);
      noStroke();
  
      // Ear left
      triangle(
        this.x - 40,
        this.y - 30,
        this.x - 40,
        this.y - 50,
        this.x,
        this.y - 50
      );
  
      // Ear right
      triangle(
        this.x + 40,
        this.y - 30,
        this.x + 40,
        this.y - 50,
        this.x,
        this.y - 50
      );
  
      // Tail
      rect(this.x + 30, this.y + 10, 40, 10, 100);
  
      // Body
      ellipse(this.x, this.y, 115, 94);
  
      // Head
      ellipse(this.x, this.y - 3, 106, 108);
  
      // Nose
      push();
      fill(260, 220, 244);
      triangle(
        this.x - 7,
        this.y - 37,
        this.x + 7,
        this.y - 37,
        this.x,
        this.y - 32
      );
      pop();
  
      // Happy Mouth
      push();
      fill(260, 220, 244);
      ellipse(this.x, this.y - 20, 20);
      pop();
      push();
      fill(255, 255, 255);
      ellipse(this.x - 6, this.y - 27, 12);
      ellipse(this.x + 6, this.y - 27, 12);
      ellipse(this.x, this.y - 30, 4);
      pop();
  
      fill(this.color);
      // Paw left
      ellipse(this.x - 30, this.y + 40, 15);
  
      // Paw right
      ellipse(this.x + 30, this.y + 40, 15);
  
      // Happy Eye left
      text("❤️", this.x - 36, this.y - 30);
  
      // Happy Eye right
      text("❤️", this.x + 4, this.y - 30);
    }
  
    // Sad Cat Design
    drawSad() {
      fill(this.color);
      noStroke();
  
      // Ear left
      triangle(
        this.x - 40,
        this.y - 30,
        this.x - 43,
        this.y - 48,
        this.x - 10,
        this.y - 56
      );
  
      // Ear right
      triangle(
        this.x + 40,
        this.y - 30,
        this.x + 44,
        this.y - 48,
        this.x + 10,
        this.y - 56
      );
  
      // Tail
      rect(this.x + 30, this.y + 10, 40, 10, 100);
  
      // Body
      ellipse(this.x, this.y, 115, 94);
  
      // Head
      ellipse(this.x, this.y - 3, 106, 108);
  
      // Nose
      push();
      fill(260, 220, 244);
      triangle(
        this.x - 7,
        this.y - 37,
        this.x + 7,
        this.y - 37,
        this.x,
        this.y - 32
      );
      pop();
  
      // Sad Mouth
      push();
      fill(260, 220, 244);
      ellipse(this.x, this.y - 16, 20);
      pop();
      push();
      fill(255, 255, 255);
      rect(this.x - 10, this.y - 13, 20, 13);
      /* ellipse(x, y - 15, 14, 13); */
      pop();
  
      fill(this.color);
      // Paw left
      ellipse(this.x - 30, this.y + 40, 15);
  
      // Paw right
      ellipse(this.x + 30, this.y + 40, 15);
  
      // Sad Eye left
      push();
      fill(142, 191, 134);
      ellipse(this.x - 20, this.y - 36, 20);
      pop();
      push();
      fill(0, 0, 0);
      ellipse(this.x - 20, this.y - 36, 16);
      fill(255, 255, 255);
      ellipse(this.x - 17, this.y - 40, 6);
      pop();
      /* ellipse(x - 20, y - 28, 20, 12); */
  
      // Sad Eye right
      push();
      fill(142, 191, 134);
      ellipse(this.x + 20, this.y - 36, 20);
      pop();
      push();
      fill(0, 0, 0);
      ellipse(this.x + 20, this.y - 36, 16);
      fill(255, 255, 255);
      ellipse(this.x + 23, this.y - 40, 6);
      pop();
      /*   ellipse(x + 20, y - 28, 20, 12); */
    }
  
    // Neutral Cat Design
    drawNeutral() {
      fill(this.color);
      noStroke();
  
      // Ear left
      triangle(
        this.x - 40,
        this.y - 30,
        this.x - 40,
        this.y - 50,
        this.x,
        this.y - 50
      );
  
      // Ear right
      triangle(
        this.x + 40,
        this.y - 30,
        this.x + 40,
        this.y - 50,
        this.x,
        this.y - 50
      );
  
      // Tail
      rect(this.x + 30, this.y + 10, 40, 10, 100);
  
      // Body
      ellipse(this.x, this.y, 115, 94);
  
      // Head
      ellipse(this.x, this.y - 3, 106, 108);
  
      // Eye left
      push();
      fill(0, 0, 0);
      ellipse(this.x - 16, this.y - 44, 8, 6);
  
      // Eye right
      ellipse(this.x + 16, this.y - 44, 8, 6);
      pop();
  
      // Nose
      push();
      fill(260, 220, 244);
      triangle(
        this.x - 7,
        this.y - 44,
        this.x + 7,
        this.y - 44,
        this.x,
        this.y - 39
      );
  
      // Mouth
      triangle(
        this.x - 18,
        this.y - 29,
        this.x,
        this.y - 36,
        this.x + 18,
        this.y - 29
      );
      ellipse(this.x, this.y - 20, 50, 26);
      pop();
  
      push();
      translate(this.x - 10, this.y - 34);
      rotate(-0.3);
      ellipse(0, 0, 22, 10);
      pop();
  
      push();
      translate(this.x + 10, this.y - 34);
      rotate(0.3);
      ellipse(0, 0, 22, 10);
      pop();
  
      fill(this.color);
  
      // Fangs
      triangle(
        this.x - 18,
        this.y - 30,
        this.x - 12,
        this.y - 25,
        this.x - 9,
        this.y - 30
      );
      triangle(
        this.x + 18,
        this.y - 30,
        this.x + 12,
        this.y - 25,
        this.x + 9,
        this.y - 30
      );
  
      // Paw left
      ellipse(this.x - 30, this.y + 40, 15);
  
      // Paw right
      ellipse(this.x + 30, this.y + 40, 15);
    }
  }
  
  // Treat Object Design
  class Treat {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
  
    drawTreat() {
      // Cookie
      push();
      fill(241, 210, 189);
      ellipse(this.x, this.y, 45);
      pop();
  
      // Chocolate chips
      push();
      fill(145, 96, 75);
      ellipse(this.x - 14, this.y + 4, 9);
      ellipse(this.x - 2, this.y + 14, 9);
      ellipse(this.x + 12, this.y + 10, 9);
      ellipse(this.x + 1, this.y, 9);
      ellipse(this.x + 14, this.y - 6, 9);
      ellipse(this.x + 2, this.y - 14, 9);
      pop();
    }
  }
  
  // Fish Object Design
  class Fish {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
  
    drawFish() {
      push();
      fill(177, 204, 222);
      ellipse(this.x, this.y, 45, 30);
  
      // Tail fish
      triangle(
        this.x,
        this.y,
        this.x + 34,
        this.y - 12,
        this.x + 34,
        this.y + 12
      );
      pop();
    }
  }
  
  // Bomb Object Design
  class Bomb {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
  
    drawBomb() {
      // Bomb
      push();
      fill(118, 48, 136);
      ellipse(this.x, this.y, 40);
      pop();
  
      push();
      translate(this.x + 10, this.y - 14);
      rotate(0.5);
      fill(118, 48, 136);
      ellipse(0, 0, 20, 16);
      pop();
  
      // Thread on bomb
      push();
      fill(130, 97, 78);
      translate(this.x + 10, this.y - 18);
      rotate(-0.8);
      rect(0, 0, 12, 4, 10);
      /* line(x + 10, y - 20, x + 20, y - 30); */
      pop();
  
      // Skull
      push();
      fill(201, 167, 209);
      translate(this.x + 1, this.y - 2);
      rotate(0.4);
      ellipse(0, 0, 20, 18);
      pop();
  
      // Jaw skull
      push();
      fill(201, 167, 209);
      translate(this.x - 6, this.y);
      rotate(0.5);
      rect(0, 0, 10, 8, 3);
      pop();
  
      // Eyeholes skull
      push();
      fill(118, 48, 136);
      ellipse(this.x - 3, this.y - 3, 6);
      ellipse(this.x + 5, this.y + 1, 6);
      pop();
    }
  }
  
  // Speed Power Up Design
  class PowerUp {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
    drawPowerUp() {
      push();
      fill(241, 213, 122);
      ellipse(this.x, this.y, 45);
      fill(250, 189, 107);
      ellipse(this.x, this.y, 35);
      fill(241, 213, 122);
      triangle(
        this.x - 4,
        this.y - 10,
        this.x + 7,
        this.y - 10,
        this.x - 9,
        this.y + 3
      );
      triangle(
        this.x - 2,
        this.y - 10,
        this.x + 9,
        this.y - 10,
        this.x - 2,
        this.y + 3
      );
      triangle(
        this.x,
        this.y - 2,
        this.x + 10,
        this.y - 1,
        this.x - 5,
        this.y + 14
      );
      rect(this.x - 8, this.y - 2, 8, 5);
      pop();
    }
  }
  
  // Clouds Design
  class Cloud {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.color = [255, 255, 255];
    }
  
    display() {
      push();
      fill(this.color);
      this.drawShape();
      pop();
    }
  
    drawShape() {
      // For subclasses
    }
  }
  
  class Cloud1 extends Cloud {
    drawShape() {
      rect(this.x, this.y, 100, 20, 100);
      ellipse(this.x + 40, this.y, 40);
    }
  }
  
  class Cloud2 extends Cloud {
    drawShape() {
      rect(this.x, this.y, 100, 20, 100);
      ellipse(this.x + 90, this.y - 5, 50);
      ellipse(this.x + 50, this.y - 5, 40);
    }
  }
  
  class Cloud3 extends Cloud {
    drawShape() {
      rect(this.x, this.y, 58, 16, 100);
      ellipse(this.x + 30, this.y + 2, 20);
    }
  }
  
  // Scenery
  function scenery() {
    noStroke();
    // Ground
    background(215, 225, 217);
    push();
    fill(173, 196, 184);
    rect(0, 520, width, height);
    pop();
  
    // Clouds
    let cloud1 = new Cloud1(90, 250);
    let cloud2 = new Cloud2(640, 180);
    let cloud3 = new Cloud3(520, 340);
    cloud1.display();
    cloud2.display();
    cloud3.display();
  }
  
  // Start Button
  class Button {
    constructor(x, y, diameter) {
      this.x = x;
      this.y = y;
      this.diameter = diameter;
    }
  
    // Start Button Design
    display() {
      push();
      fill(196, 214, 203);
      ellipse(this.x, this.y, this.diameter);
      fill(159, 193, 175);
      ellipse(this.x, this.y, this.diameter - 10);
      fill(255, 255, 255);
      triangle(
        this.x - 10,
        this.y - 16,
        this.x + 16,
        this.y,
        this.x - 10,
        this.y + 16
      );
      pop();
    }
  
    // Checks if button is clicked within boundaries
    ifClicked() {
      if (
        mouseX > this.x - this.diameter / 2 &&
        mouseX < this.x + this.diameter / 2 &&
        mouseY > this.y - this.diameter / 2 &&
        mouseY < this.y + this.diameter / 2
      ) {
        return true;
      }
      return false;
    }
  }
  
  // Button Objects
  const startButton = new Button(400, 280, 80);
  const restartButton = new Button(660, 370, 80);
  
  // Logo Design
  function logo(x, y) {
    // Cloud Logo
    ellipse(x, y, 220);
    ellipse(x - 160, y, 120);
    ellipse(x + 160, y, 120);
    ellipse(x + 60, y - 60, 190);
    ellipse(x - 60, y - 60, 160);
    ellipse(x - 100, y + 60, 140);
    ellipse(x, y + 50, 160);
    ellipse(x + 100, y + 60, 160);
    ellipse(x, y + 70, 200);
  
    // Letter C
    push();
    fill(260, 220, 244);
    ellipse(x - 120, y, 60);
    pop();
    ellipse(x - 120, y, 20);
    rect(x - 120, y - 5, 30, 10);
  
    // Letter A
    push();
    fill(260, 220, 244);
    ellipse(x - 56, y, 60);
    rect(x - 36, y - 30, 20, 60);
    pop();
    ellipse(x - 56, y, 20);
  
    // Letter T
    push();
    fill(260, 220, 244);
    rect(x - 8, y - 30, 20, 50);
    ellipse(x + 2, y + 22, 20);
    rect(x, y - 20, 20, 8);
    rect(x, y + 18, 20, 14);
    pop();
  
    // Letter C
    push();
    fill(260, 220, 244);
    ellipse(x + 56, y, 60);
    pop();
    ellipse(x + 56, y, 20);
    rect(x + 56, y - 5, 30, 10);
  
    // Letter H
    push();
    fill(260, 220, 244);
    rect(x + 94, y - 30, 20, 60);
    rect(x + 94, y - 10, 40, 14);
    rect(x + 124, y, 20, 30);
    ellipse(x + 134, y, 20);
    pop();
  
    startButton.display();
  }
  
  // Scoreboard Design
  function scoreBoard(x, y) {
    push();
    fill(255, 255, 255);
    rect(x, y, 300, 370, 40);
    fill(255, 240, 247);
    rect(x + 15, y + 15, 270, 340, 20);
    fill(255, 255, 255);
    ellipse(x + 120, y, 110);
    ellipse(x + 180, y, 100);
    ellipse(x + 230, y, 60);
    ellipse(x + 70, y, 60);
    fill(242, 186, 206);
    rect(x + 15, y + 15, 270, 80, 20);
    fill(249, 207, 225);
    rect(x + 15, y + 80, 270, 70);
    fill(255, 217, 232);
    rect(x + 15, y + 150, 270, 70);
    fill(255, 230, 240);
    rect(x + 15, y + 220, 270, 70);
    fill(255, 255, 255);
    rect(x + 15, y + 78, 270, 5);
    fill(242, 186, 206);
    textStyle(BOLD);
    textSize(26);
    text("GAME OVER", x + 68, y);
    fill(255, 255, 255);
    textSize(20);
    text("no.", x + 30, y + 68);
    text("name", x + 110, y + 68);
    text("score", x + 214, y + 68);
    pop();
  }
  
  // Variables
  let isGameActive = true;
  let velocity = 2;
  let velocity2 = 2;
  let score = 0;
  let health = ["❤️", "❤️", "❤️"];
  let state = "start";
  
  // Cat Object
  let cat = new Cat(400, 500);
  
  // Menu Screen
  function menuScreen() {
    noStroke();
    scenery();
    logo(400, 190);
    cat.drawNeutral();
  }
  
  // Game Over Screen
  function gameOver() {
    scenery();
    scoreBoard(246, 100);
    push();
    fill(0, 0, 0);
    textStyle(BOLD);
    text("TRY AGAIN!", 590, 310);
    pop();
    restartButton.display();
    cat.x = 130;
    cat.y = 370;
    cat.color = [255, 255, 255];
    cat.drawSad();
  
    // Retrieve higshcores from the array in Local Storage
    let highscores = JSON.parse(localStorage.getItem("scores"));
  
    // Displays highscores along with its position
    for (let i = 0; i < highscores.length; i++) {
      fill(0, 0, 0);
      displayHighscore(highscores[i], i, 482, 225 + i * 70, 202, 128, "player");
    }
  }
  
  // Variables
  let catX = 400;
  let acceleration = 1.0;
  let acceleration2 = 1.0;
  
  // Saves Highscore in Local Storage
  function saveHighscore(score) {
    const highscores = "scores";
    const highScoreString = localStorage.getItem(highscores); // Retrieves value + assigns to highScoreString
    let scores = []; // Array to store highscores
  
    // If highScoreString contains stored value, it parses the string into an the scores variable array
    if (highScoreString !== null) {
      scores = JSON.parse(highScoreString);
    }
  
    // If "score" is not already in "scores" array, add it at the end of the array
    if (!scores.includes(score)) {
      scores.push(score);
      scores.sort((a, b) => b - a); // Sorts scores from highest to lowest
      scores.splice(4); // Keeps it at 4 scores in the array by removing elements beyond 4
      localStorage.setItem(highscores, JSON.stringify(scores)); // Store scores array as a JSON string
    }
  }
  
  // Displays Highscore
  function displayHighscore(
    scoreElement,
    index,
    x,
    y,
    indexVariation,
    indexVariation2,
    playerName
  ) {
    textSize(22);
    text(index + 1, x - indexVariation, y);
    text(scoreElement, x, y);
    text(playerName, x - indexVariation2, y);
  }
  // localStorage.clear();
  
  // New Power Up object w. randon positions
  function fallingSpeedObject() {
    let Xposition = Math.floor(random(50, 750));
    let Yposition = -10;
  
    let newPowerObject = new PowerUp(Xposition, Yposition);
    powerObject = newPowerObject; // Assigns newPowerObject to variable powerObject
  
    powerObject.velocity2 = velocity2 * acceleration2; // Speed and acceleration of Power Up object
  }
  
  powerObject = null;
  function gameScreen() {
    scenery();
    cat.drawNeutral();
    // Retrieve characters width interval based on x-position in order to compare with objects
    let characterX = cat.x;
    let CharacterWidth = 115;
    let characterLeftBound = characterX - CharacterWidth / 2;
    let CharacterRightBound = characterX + CharacterWidth / 2;
  
    // Increase acceleration and objects each level of scores
    if (isGameActive) {
      const levels = [
        { score: 0, fallingObjects: 1500, acceleration: 3.5 },
        { score: 3, fallingObjects: 1300, acceleration: 3.6 },
        { score: 10, fallingObjects: 1100, acceleration: 3.7 },
        { score: 15, fallingObjects: 1000, acceleration: 3.8 },
        { score: 25, fallingObjects: 1000, acceleration: 3.9 },
        { score: 40, fallingObjects: 900, acceleration: 4.0 },
        { score: 50, fallingObjects: 900, acceleration: 4.1 },
        { score: 60, fallingObjects: 800, acceleration: 4.2 },
        { score: 70, fallingObjects: 700, acceleration: 4.3 },
        { score: 80, fallingObjects: 600, acceleration: 4.5 },
      ]; // Array with game levels
  
      // Checks current level
      let currentLevel = levels[levels.length - 1];
      for (let i = levels.length - 1; i >= 0; i--) {
        if (score >= levels[i].score) {
          currentLevel = levels[i];
  
          // Release Power Up at score 20, 55 & 85
          if (
            (score === 20 || score === 55 || score === 85) &&
            powerObject === null
          ) {
            fallingSpeedObject();
          }
          break;
        }
      }
  
      console.log("LEVEL", levels.indexOf(currentLevel) + 1);
      fallingObjects(currentLevel.fallingObjects);
      acceleration = currentLevel.acceleration;
    }
  
    for (let i = 0; i < objects.length; i++) {
      let obj = objects[i];
  
      // Check for collision
      // Checks if object is in the same area as cat
      if (
        isGameActive &&
        obj.x < CharacterRightBound &&
        obj.x > characterLeftBound &&
        obj.y > 444 &&
        obj.y < 550
      ) {
        // Check if the objects are collectable => increase score
        // If object has been collided, remove from array, increase score +1, happy state + timer
        if ((!obj.collided && obj instanceof Fish) || obj instanceof Treat) {
          // console.log(obj.y);
          obj.collided = true;
          // Remove the collided object from the array
          objects.splice(i, 1);
          // Increase score by 1
          score += 1;
          // Switch to happy cat for certain amount of time when collecting
          cat.isHappy = true;
          cat.happyTimer = 15;
  
          // Check if the objects are NOT collectable => decrease health
          // Not collectable (bomb), checks if not collided w. before, sad state + timer, removed from array, -1 heart
        } else if (!obj.collided && obj instanceof Bomb) {
          cat.isSad = true;
          cat.sadTimer = 15;
          obj.collided = true;
          // Remove the collided object from the array
          objects.splice(i, 1);
          // Remove a heart from the health array
          health.pop();
        } else if ((obj instanceof Fish || obj instanceof Treat) && obj.y > 505) {
          // Remove the collided object from the array
          objects.splice(i, 1);
  
          health.pop();
        }
      } else {
        obj.collided = false;
      }
  
      // If object.y > 505 & fish & treat, removes collided object from array & game
      if (obj.y > 505 && (obj instanceof Fish || obj instanceof Treat)) {
        objects.splice(i, 1); // Removes from array
        health.pop(); // Removes a heart
        cat.isSad = true; // Sad cat
        cat.sadTimer = 15; // Timer for sad cat
      }
  
      // If no lives left, Game Over, saves the player's score
      if (health.length === 0) {
        state = "gameOver";
        isGameActive = false;
        saveHighscore(score);
      }
  
      // Type of objects
      if (obj instanceof Fish) {
        obj.drawFish();
      } else if (obj instanceof Bomb) {
        obj.drawBomb();
      } else if (obj instanceof Treat) {
        obj.drawTreat();
      }
  
      // Objects falling & speed
      obj.velocity = velocity * acceleration;
      obj.y += obj.velocity;
  
      // Displays Power Up design & speed
      if (powerObject instanceof PowerUp) {
        powerObject.drawPowerUp();
        powerObject.velocity2 = velocity2 * acceleration2;
        powerObject.y += powerObject.velocity2;
  
        // If Power Up collided with cat, it is collectable
        if (
          isGameActive &&
          powerObject.x < CharacterRightBound &&
          powerObject.x > characterLeftBound &&
          powerObject.y > 444 &&
          powerObject.y < 550
        ) {
          // Check if the objects are collectable => increase score
          if (!powerObject.collided) {
            console.log("POWER UP!!!!");
            console.log(powerObject.velocity2);
            powerObject.collided = true; // Collided
            powerObject = null; // Removes it from game
            score += 1; // +1 score
            cat.isFast = true; // Fast state
            cat.fastTimer = 500; // Fast state timers
            cat.previousSpeed = cat.speed;
            cat.speed = 40; // Speed increased to 40
            cat.isColor = true; // Cat changes to yellow color
            cat.colorTimer = 500; // Timer for color
            cat.previousColor = cat.color;
            cat.color = [253, 253, 220];
          }
        } else {
          // Not in area of cat = not collided
          powerObject.collided = false;
        }
      }
    }
  
    // Move the cat
    if (keyIsDown(37) && isGameActive) {
      cat.updatePosition("left"); // Left
    } else if (keyIsDown(39) && isGameActive) {
      cat.updatePosition("right"); // Right
    }
  }
  
  // Score Tracker Display
  function scoreTracker() {
    fill(0, 0, 0);
    textStyle(BOLD);
    textSize(24);
    text("Score: " + score, 20, 50);
  }
  
  // Health Tracker Display
  function healthTracker() {
    // Display the health array as a string, to remove "," from screen
    let healthString = health.join("");
    text("Health: " + healthString, 20, 100);
  }
  
  // Screens
  function draw() {
    if (state === "start") {
      menuScreen();
    }
  
    if (state === "game") {
      gameScreen();
    }
  
    if (state === "gameOver") {
      gameOver();
    }
  
    changeCursor();
    scoreTracker();
    healthTracker();
  
    if (isGameActive) {
      // Cat's emotions
      if (cat.isHappy) {
        // Draw the happy cat
        cat.drawHappy();
      } else if (cat.isSad) {
        // Draw the sad cat
        cat.drawSad();
      } else {
        // Draw the neutral cat
        cat.drawNeutral();
      }
  
      // Cat's emotion changes back to neutral after a duration
      if (cat.happyTimer > 0 || cat.sadTimer > 0) {
        cat.happyTimer--;
        cat.sadTimer--;
      } else {
        cat.isHappy = false; // Reset to neutral state when the timer expires
        cat.isSad = false; // Reset to neutral state when the timer expires
      }
  
      // If cat is in fast state or color state, timers decremented by 1
      if ((cat.isFast && isGameActive) || (cat.isColor && isGameActive)) {
        if (cat.fastTimer > 0 || cat.colorTimer > 0) {
          cat.fastTimer--;
          cat.colorTimer--;
          // If timers reached 0, cat returns to previous speed & color
        } else {
          cat.isFast = false;
          cat.speed = cat.previousSpeed;
          cat.isColor = false;
          cat.color = cat.previousColor;
        }
      }
    }
  }
  
  // Mouse clicked > game starts
  function mouseClicked() {
    if (state === "start" && startButton.ifClicked()) {
      state = "game";
    } else if (state === "gameOver" && restartButton.ifClicked()) {
      objects = []; // Resets the game
      state = "game";
      isGameActive = true;
      velocity = 2;
      acceleration = 1;
      cat.x = 400;
      cat.y = 500;
      cat.speed = 15;
      health = ["❤️", "❤️", "❤️"];
      score = 0;
    }
  }
  
  // Changes cursor when hovering over the startbutton
  function changeCursor() {
    if (state === "start" && startButton.ifClicked()) {
      cursor(HAND);
    } else if (state == "gameOver" && restartButton.ifClicked()) {
      cursor(HAND);
    } else {
      cursor(ARROW);
    }
  }
  
  let objects = [];
  let lastObjectSpawned = 0;
  let timeVariable = 1000;
  
  // Spawns objects in the game at certain time intervals
  function fallingObjects(timeVariable) {
    let currentTime = millis();
  
    // Checks if enough time has passed since last object was spawned
    // If elapsed time > timeVariable, create a new object and add to objects array
    if (currentTime - lastObjectSpawned > timeVariable) {
      let randomWidth = Math.floor(random(50, 750));
      let heightPosition = -10;
      let newObject;
  
      let randomNumber = Math.floor(Math.random() * 101); // Random object spawn between 0 and 101
  
      if (randomNumber < 40) {
        // If randomNumber < 40, Fish object created
        newObject = new Fish(randomWidth, heightPosition);
      } else if (randomNumber < 60) {
        // If randomNumber < 60, Bomb is created
        newObject = new Bomb(randomWidth, heightPosition);
      } else {
        // Otherwise, Treat is created
        newObject = new Treat(randomWidth, heightPosition);
      }
  
      // New object pushed into "objects" array
      objects.push(newObject);
      lastObjectSpawned = currentTime;
    }
  }