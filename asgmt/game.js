let balls = [];
let table;
let playerTurn = true;
let pockets = [];
let playerScore = 0;
let computerScore = 0;
let aiming = false;

function setup() {
  createCanvas(800, 400);
  table = new Table();
  setupBalls();
  setupPockets();
}

function draw() {
  background(0, 100, 0);
  table.display();
  
  for (let pocket of pockets) {
    pocket.display();
  }

  for (let ball of balls) {
    ball.update();
    ball.checkEdges();
    ball.display();
  }

  handleCollisions();
  checkPocketedBalls();

  if (!playerTurn) {
    computerMove();
  }

  if (aiming && playerTurn) {
    drawCue();
  }

  displayScores();
}

function setupBalls() {
  balls.push(new Ball(400, 200, color(255, 255, 255), true)); // Cue ball
  let colors = [color(255, 0, 0), color(0, 255, 0), color(0, 0, 255), color(255, 255, 0), color(255, 0, 255)];
  for (let i = 0; i < 5; i++) {
    balls.push(new Ball(450 + i * 20, 200, colors[i]));
  }
}

function setupPockets() {
  let pocketPositions = [
    createVector(0, 0), createVector(width / 2, 0), createVector(width, 0),
    createVector(0, height), createVector(width / 2, height), createVector(width, height)
  ];
  for (let pos of pocketPositions) {
    pockets.push(new Pocket(pos.x, pos.y));
  }
}

function handleCollisions() {
  for (let i = 0; i < balls.length; i++) {
    for (let j = i + 1; j < balls.length; j++) {
      let b1 = balls[i];
      let b2 = balls[j];
      let d = dist(b1.position.x, b1.position.y, b2.position.x, b2.position.y);
      if (d < b1.radius + b2.radius) {
        // Simple collision response
        let angle = atan2(b2.position.y - b1.position.y, b2.position.x - b1.position.x);
        let targetX = b1.position.x + cos(angle) * (b1.radius + b2.radius);
        let targetY = b1.position.y + sin(angle) * (b1.radius + b2.radius);
        let ax = (targetX - b2.position.x) * 0.05;
        let ay = (targetY - b2.position.y) * 0.05;
        b1.velocity.x -= ax;
        b1.velocity.y -= ay;
        b2.velocity.x += ax;
        b2.velocity.y += ay;
      }
    }
  }
}

function checkPocketedBalls() {
  for (let i = balls.length - 1; i >= 0; i--) {
    let ball = balls[i];
    for (let pocket of pockets) {
      if (pocket.contains(ball)) {
        balls.splice(i, 1);
        if (playerTurn) {
          playerScore++;
        } else {
          computerScore++;
        }
        break;
      }
    }
  }
}

function computerMove() {
  let cueBall = balls[0];
  if (cueBall.velocity.mag() < 0.01) {
    let angle = random(TWO_PI);
    let force = p5.Vector.fromAngle(angle).mult(5);
    cueBall.applyForce(force);
    playerTurn = true;
  }
}

function mousePressed() {
  if (playerTurn) {
    aiming = true;
  }
}

function mouseReleased() {
  if (playerTurn) {
    let cueBall = balls[0];
    let force = createVector(mouseX - cueBall.position.x, mouseY - cueBall.position.y);
    force.mult(0.1);
    cueBall.applyForce(force);
    playerTurn = false;
    aiming = false;
  }
}

function drawCue() {
  let cueBall = balls[0];
  let angle = atan2(mouseY - cueBall.position.y, mouseX - cueBall.position.x);
  let cueLength = 100;
  
  push();
  stroke(255);
  strokeWeight(4);
  translate(cueBall.position.x, cueBall.position.y);
  line(0, 0, cos(angle) * cueLength, sin(angle) * cueLength);
  pop();
}

function displayScores() {
  fill(255);
  textSize(16);
  text("Player Score: " + playerScore, 20, 20);
  text("Computer Score: " + computerScore, 20, 40);
}

class Ball {
  constructor(x, y, c, isCue = false) {
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.radius = 10;
    this.color = c;
    this.isCue = isCue;
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
    this.velocity.mult(0.99); // Friction
  }

  checkEdges() {
    if (this.position.x > width - this.radius || this.position.x < this.radius) {
      this.velocity.x *= -1;
      this.position.x = constrain(this.position.x, this.radius, width - this.radius);
    }
    if (this.position.y > height - this.radius || this.position.y < this.radius) {
      this.velocity.y *= -1;
      this.position.y = constrain(this.position.y, this.radius, height - this.radius);
    }
  }

  display() {
    fill(this.color);
    noStroke();
    ellipse(this.position.x, this.position.y, this.radius * 2);
  }
}

class Pocket {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.radius = 20;
  }

  contains(ball) {
    let d = dist(this.position.x, this.position.y, ball.position.x, ball.position.y);
    return d < this.radius;
  }

  display() {
    fill(0);
    ellipse(this.position.x, this.position.y, this.radius * 2);
  }
}

class Table {
  display() {
    fill(0, 100, 0);
    noStroke();
    rect(0, 0, width, height);
    // Add pockets, cushions, etc.
  }
}
