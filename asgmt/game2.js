let table;
let balls = [];
let whiteBall;
let cue;
let pockets = [];
let player1Score = 0;
let player2Score = 0;
let currentPlayer = 1;
let gameOver = false;
let restartButton;
let exitButton;
let playerVsPlayerButton;
let gameMode = null; // null, 'PvP'
let cuePower = 0;
let maxCuePower = 20;
let increasingPower = false;

function setup() {
  createCanvas(1280, 720);
  createMenuButtons(); // Create the menu buttons
}

function draw() {
  if (gameMode === null) {
    drawMenu(); // Draw the menu if the game mode is not set
  } else {
    playGame(); // Play the game if the game mode is set
  }
}

function createMenuButtons() { // Create a button to start the game
  playerVsPlayerButton = createButton('Start Play Game');
  playerVsPlayerButton.position(width / 2 + 50, height / 2 - 20);
  playerVsPlayerButton.mousePressed(() => startGame('PvP'));
}

function drawMenu() { // Draw the game menu
  background(0, 128, 0);
  textSize(48);
  fill(255);
  textAlign(CENTER);
  text('Welcome to Lunar Game', width / 2, height / 2 - 80);
  textSize(15);
  text('Press the "Shift" key to control the strength of the blow.', width / 2, height / 2 + 20);
}

function startGame(mode) {
  gameMode = mode; // Set the game mode
  playerVsPlayerButton.hide(); // Hide the start button

  table = new Table(); // Create a new table
  whiteBall = new Ball(width / 2, height - 100, 20, color(255)); // Create the white ball
  cue = new Cue(whiteBall); // Create a cue for the white ball

  // Create pockets at the corners and midpoints of the table
  pockets = [];
  pockets.push(new Pocket(0, 0));
  pockets.push(new Pocket(width / 2, 0));
  pockets.push(new Pocket(width, 0));
  pockets.push(new Pocket(0, height));
  pockets.push(new Pocket(width / 2, height));
  pockets.push(new Pocket(width, height));

  // Create colored balls in a horizontal triangular formation
  balls = [];
  let startX = width / 2 - 80;
  let startY = height / 4;
  for (let row = 0; row < 5; row++) {
    for (let i = 0; i <= row; i++) {
      let x = startX + i * 40 - row * 20;
      let y = startY + row * 35;
      let col = color(random(255), random(255), random(255));
      balls.push(new Ball(x, y, 20, col));
    }
  }

  // Create restart and exit buttons
  restartButton = createButton('Restart');
  restartButton.mousePressed(restartGame);
  restartButton.hide();

  exitButton = createButton('Go to Home');
  exitButton.mousePressed(exitGame);
  exitButton.hide();
}

function playGame() {
  background(0, 128, 0);
  table.display(); // Display the table
  
  // Display the pockets
  for (let pocket of pockets) {
    pocket.display();
  }

  whiteBall.update(); // Update the white ball's position
  whiteBall.display(); // Display the white ball
  
  // Update and display all colored balls
  for (let ball of balls) {
    ball.update();
    ball.display();
  }

  cue.update(); // Update the cue's position
  cue.display(); // Display the cue
  
  checkCollisions(); // Check for collisions between balls
  checkPockets(); // Check if any ball has fallen into a pocket
  
  displayScores(); // Display the scores

  // Display cue power
  if (increasingPower) {
    cuePower = min(cuePower + 0.2, maxCuePower);
  } else {
    cuePower = max(cuePower - 0.2, 0);
  }
  fill(255);
  textSize(16);
  text(`Power: ${cuePower.toFixed(1)}`, 115, 70);
}

function mousePressed() { // Shoot the cue ball if the game is not over
  if (!gameOver) {
    if (cuePower > 0) {
      cue.shoot(cuePower);
      cuePower = 0;
    }
  }
}

function keyPressed() {
  if (keyCode === SHIFT) {
    increasingPower = true; // Start increasing cue power when shift key is pressed
  }
}

function keyReleased() {
  if (keyCode === SHIFT) {
    increasingPower = false; // Stop increasing cue power when shift key is released
  }
}

function checkCollisions() {
  // Check for collisions and edges for the white ball
  whiteBall.checkEdges();
  for (let ball of balls) {
    ball.checkCollision(whiteBall); // Check collision between white ball and colored balls
    ball.checkEdges(); // Check edges for colored balls
    for (let otherBall of balls) {
      if (ball !== otherBall) {
        ball.checkCollision(otherBall); // Check collision between colored balls
      }
    }
  }
}

function checkPockets() {
  // Check if any ball has fallen into a pocket
  for (let pocket of pockets) {
    if (pocket.contains(whiteBall)) {
      gameOver = true;
      alert(`Player ${currentPlayer} loses!`);
      showGameOverWindow();
      noLoop();
      return;
    }
    for (let i = balls.length - 1; i >= 0; i--) {
      let ball = balls[i];
      if (pocket.contains(ball)) {
        balls.splice(i, 1);
        if (currentPlayer === 1) {
          player1Score++;
        } else {
          player2Score++;
        }
        checkGameOver();
        return; // Exit loop after scoring to allow current player to continue
      }
    }
  }
  // Switch player if no ball is pocketed
  currentPlayer = currentPlayer === 1 ? 2 : 1;
}

function checkGameOver() {
  // Check if the game is over and determine the winner
  if (balls.length === 0) {
    gameOver = true;
    let winner;
    if (player1Score > player2Score) {
      winner = 'Player 1 wins!';
    } else if (player2Score > player1Score) {
      winner = 'Player 2 wins!';
    } else {
      winner = 'It\'s a tie!';
    }
    alert(winner);
    showVictoryWindow(winner);
    noLoop();
  }
}

function showGameOverWindow() { // Show the game over window
  fill(255, 0, 0, 150);
  rect(width / 2 - 150, height / 2 - 100, 300, 200, 10);
  fill(255);
  textSize(32);
  textAlign(CENTER);
  text('Game Over', width / 2, height / 2 - 50);
  restartButton.show();
  exitButton.show();
  restartButton.position(width / 2 + 80, height / 2);
  exitButton.position(width / 2 + 65, height / 2 + 40);
}

function showVictoryWindow(winner) { // Show the victory window with the winner
  fill(0, 255, 0, 150);
  rect(width / 2 - 150, height / 2 - 100, 300, 200, 10);
  fill(255);
  textSize(32);
  textAlign(CENTER);
  text(winner, width / 2, height / 2 - 50);
  restartButton.show();
  exitButton.show();
  restartButton.position(width / 2 + 80, height / 2);
  exitButton.position(width / 2 + 90, height / 2 + 40);
}

function displayScores() { // Display the scores of both players
  fill(255);
  textSize(32);
  text(`Player 1: ${player1Score}`, 150, 40);
  text(`Player 2: ${player2Score}`, width - 200, 40);
}

function restartGame() { // Restart the game
  gameOver = false;
  player1Score = 0;
  player2Score = 0;
  currentPlayer = 1;
  balls = [];
  whiteBall = new Ball(width / 2, height - 100, 20, color(255));
  cue = new Cue(whiteBall);
  
  // Create colored balls in a horizontal triangular formation
  let startX = width / 2 - 80;
  let startY = height / 4;
  for (let row = 0; row < 5; row++) {
    for (let i = 0; i <= row; i++) {
      let x = startX + i * 40 - row * 20;
      let y = startY + row * 35;
      let col = color(random(255), random(255), random(255));
      balls.push(new Ball(x, y, 20, col));
    }
  }
  
  restartButton.hide();
  exitButton.hide();
  loop();
}

function exitGame() {
  // Exit the game and return to the main menu
  gameMode = null;
  gameOver = false;
  player1Score = 0;
  player2Score = 0;
  currentPlayer = 1;
  balls = [];
  restartButton.hide();
  exitButton.hide();
  playerVsPlayerButton.show();
  loop();
}

class Table { // Display the table
  display() {
    fill(0, 100, 0);
    rect(0, 0, width, height);
  }
}

class Ball {
  constructor(x, y, r, col) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.r = r;
    this.col = col;
    this.inPocket = false;
  }

  applyForce(force) { // Apply a force to the ball
    this.acc.add(force);
  }

  update() { // Update the ball's position
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
    this.vel.mult(0.98); // Friction

    this.checkEdges();
  }

  checkEdges() { // Check for collisions with the edges of the table
    if (this.pos.x < this.r) {
      this.pos.x = this.r;
      this.vel.x *= -1;
    }
    if (this.pos.x > width - this.r) {
      this.pos.x = width - this.r;
      this.vel.x *= -1;
    }
    if (this.pos.y < this.r) {
      this.pos.y = this.r;
      this.vel.y *= -1;
    }
    if (this.pos.y > height - this.r) {
      this.pos.y = height - this.r;
      this.vel.y *= -1;
    }
  }

  checkCollision(other) { // Check for collisions with another ball
    let d = dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y);
    if (d < this.r + other.r) {
      let overlap = 0.5 * (d - this.r - other.r);

      let displacement = p5.Vector.sub(this.pos, other.pos).normalize().mult(overlap);
      this.pos.sub(displacement);
      other.pos.add(displacement);

      let angle = p5.Vector.sub(other.pos, this.pos).heading();
      let sine = sin(angle);
      let cosine = cos(angle);

      let b1 = createVector();
      let b2 = createVector();
      b1.x = cosine * this.vel.x + sine * this.vel.y;
      b1.y = cosine * this.vel.y - sine * this.vel.x;
      b2.x = cosine * other.vel.x + sine * other.vel.y;
      b2.y = cosine * other.vel.y - sine * other.vel.x;

      let v1Final = ((this.r - other.r) * b1.x + 2 * other.r * b2.x) / (this.r + other.r);
      let v2Final = ((other.r - this.r) * b2.x + 2 * this.r * b1.x) / (this.r + other.r);

      b1.x = v1Final;
      b2.x = v2Final;

      let b1Final = createVector();
      let b2Final = createVector();
      b1Final.x = cosine * b1.x - sine * b1.y;
      b1Final.y = cosine * b1.y + sine * b1.x;
      b2Final.x = cosine * b2.x - sine * b2.y;
      b2Final.y = cosine * b2.y + sine * b2.x;

      this.vel.x = b1Final.x;
      this.vel.y = b1Final.y;
      other.vel.x = b2Final.x;
      other.vel.y = b2Final.y;
    }
  }

  isInPocket(pocket) { // Check if the ball is in a pocket
    let d = dist(this.pos.x, this.pos.y, pocket.pos.x, pocket.pos.y);
    return d < this.r;
  }

  display() { // Display the ball
    fill(this.col);
    ellipse(this.pos.x, this.pos.y, this.r * 2);
  }
}

class Cue {
  constructor(ball) {
    this.ball = ball;
    this.angle = 0;
    this.power = 0;
  }

  update() { // Update the cue's angle to point towards the mouse position
    this.angle = atan2(mouseY - this.ball.pos.y, mouseX - this.ball.pos.x);
  }

  shoot(power) { // Shoot the ball with a given power
    let force = p5.Vector.fromAngle(this.angle).mult(power);
    this.ball.applyForce(force);
  }

  display() { // Display the cue
    push();
    stroke(255);
    strokeWeight(6);
    translate(this.ball.pos.x, this.ball.pos.y);
    rotate(this.angle);
    line(0, 0, -300, 0);
    pop();
  }
}

class Pocket {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.r = 30; // Radius of the pocket
  }

  contains(ball) {
    let d = dist(this.pos.x, this.pos.y, ball.pos.x, ball.pos.y);
    return d < this.r;
  }

  display() { // Display the pocket
    fill(0);
    ellipse(this.pos.x, this.pos.y, this.r * 2);
  }
}
