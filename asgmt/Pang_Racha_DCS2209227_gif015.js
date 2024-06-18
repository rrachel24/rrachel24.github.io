let squares = []; // Array to hold square objects
let ball; // Variable to hold the ball object
let loopCount = 0; // Counter for the number of animation loops
let maxLoops = 1; // Maximum number of loops before showing the image and text
let imageDisplayed = false; // Flag to check if the image is displayed
let img; // Variable to hold the loaded image
let textX = 0; // X-coordinate for the text movement
let texts = []; // Array to hold the positions of moving texts
let isAnimationStarted = false; // Flag to check if the animation has started
let lastTime = 0; // Variable to keep track of the last time the text was added
let resetInterval = null; // Variable to hold the reset interval

class Square {
  constructor(x, y, size, initialAngle, rotationSpeed) {
    this.x = x; // X-coordinate of the square
    this.y = y; // Y-coordinate of the square
    this.size = size; // Size of the square
    this.angle = initialAngle; // Initial angle of the square
    this.rotationSpeed = rotationSpeed; // Rotation speed of the square
  }

  display() {
    noStroke(); // No border for the square
    fill(255, 255, 0); // Yellow color for the square
    push(); // Save the current state of transformation
    translate(this.x + this.size / 2, this.y + this.size / 2); // Move the origin to the center of the square
    rotate(this.angle); // Rotate the square
    rectMode(CENTER); // Draw the rectangle from the center
    rect(0, 0, this.size, this.size); // Draw the square at the new origin
    pop(); // Restore the original state of transformation
    this.angle += this.rotationSpeed; // Increment the angle by the rotation speed
  }

  followBall(ballX, ballY) {
    let centerX = this.x + this.size / 2; // Calculate the center X-coordinate of the square
    let centerY = this.y + this.size / 2; // Calculate the center Y-coordinate of the square
    this.angle = atan2(ballY - centerY, ballX - centerX); // Calculate the angle to the ball
  }
}

class Ball {
  constructor(x, y, size) {
    this.x = x; // X-coordinate of the ball
    this.y = y; // Y-coordinate of the ball
    this.size = size; // Size of the ball
    this.stage = 1; // Initial stage of the ball's movement
    this.angle = 0; // Initial angle of the ball
  }

  display() {
    fill(255); // White color for the ball
    ellipse(this.x, this.y, this.size, this.size); // Draw the ball
  }

  moveTowards() {
    let speed = 5; // Speed of the ball
    let targetX, targetY; // Target coordinates for the ball

    if (this.stage === 1) {
      targetX = 0;
      targetY = 20;
      if (dist(this.x, this.y, targetX, targetY) < speed) {
        this.x = targetX;
        this.y = targetY;
        this.stage = 2; // Move to the next stage
      }
    } else if (this.stage === 2) {
      targetX = 0;
      targetY = 700;
      if (dist(this.x, this.y, targetX, targetY) < speed) {
        this.x = targetX;
        this.y = targetY;
        this.stage = 3; // Move to the next stage
      }
    } else if (this.stage === 3) {
      targetX = 840;
      targetY = 700;
      if (dist(this.x, this.y, targetX, targetY) < speed) {
        this.x = targetX;
        this.y = targetY;
        this.stage = 4; // Move to the next stage
      }
    } else if (this.stage === 4) {
      targetX = 840;
      targetY = 320;
      if (dist(this.x, this.y, targetX, targetY) < speed) {
        this.x = targetX;
        this.y = targetY;
        this.stage = 5; // Move to the next stage
      }
    } else if (this.stage === 5) {
      targetX = 600;
      targetY = 320;
      if (dist(this.x, this.y, targetX, targetY) < speed) {
        this.x = targetX;
        this.y = targetY;
        this.stage = 6; // Move to the next stage
      }
    } else if (this.stage === 6) {
      targetX = 600;
      targetY = 20;
      if (dist(this.x, this.y, targetX, targetY) < speed) {
        this.x = targetX;
        this.y = targetY;
        this.stage = 7; // Move to the next stage
      }
    } else if (this.stage === 7) {
      targetX = 1240;
      targetY = 20;
      if (dist(this.x, this.y, targetX, targetY) < speed) {
        this.x = targetX;
        this.y = targetY;
        this.stage = 1; // Reset to stage 1 to repeat the movement
        loopCount++;
        if (loopCount >= maxLoops) {
          isAnimationStarted = true; // Start the image and text animation
          lastTime = millis();
        }
      }
    }

    let angle = atan2(targetY - this.y, targetX - this.x); // Calculate the angle to the target
    this.x += cos(angle) * speed; // Move the ball along the X-axis
    this.y += sin(angle) * speed; // Move the ball along the Y-axis
    this.angle += speed / 5; // Adjust the ball's rotation speed
  }
}

function preload() {
  img = loadImage('cres.png', // Load the image
    () => console.log('Image loaded successfully'),
    (err) => console.log('Failed to load image', err)
  );
}

function setup() {
  createCanvas(1280, 720); // Create a canvas with the given dimensions
  let squareSize = 43.5; // Size of each square
  let columns = 9; // Number of columns of squares
  let rows = 7; // Number of rows of squares
  let spacing = 39; // Spacing between squares

  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      let x = (width - (columns * (squareSize + spacing)) + spacing) / 2 + i * (squareSize + spacing); // Calculate X-coordinate
      let y = (height - (rows * (squareSize + spacing)) + spacing) / 2 + j * (squareSize + spacing); // Calculate Y-coordinate
      let initialAngle = random(TWO_PI); // Random initial angle
      let rotationSpeed = random(PI / 180, PI / 60); // Random rotation speed
      if ((i === 0 && j === 0) || (i === 1 && j === 0) || (i === 2 && j === 0) || (i === 3 && j === 0) || (i === 4 && j === 0) || (i === 5 && j === 0) || (i === 6 && j === 0) 
      || (i === 7 && j === 0) || (i === 8 && j === 0) || (i === 9 && j === 0) || (i === 10 && j === 0) || (i === 11 && j === 0) || (i === 12 && j === 0) || (i === 13 && j === 0) 
      || (i === 14 && j === 0) || (i === 15 && j === 0) || (i === 16 && j === 0) || (i === 17 && j === 0) || (i === 18 && j === 0) || (i === 19 && j === 0) || (i === 20 && j === 0)
      || (i === 21 && j === 0) || (i === 22 && j === 0) || (i === 23 && j === 0) || (i === 24 && j === 0) || (i === 25 && j === 0) || (i === 26 && j === 0) || (i === 27 && j === 0) 
      || (i === 28 && j === 0) || (i === 29 && j === 0) || (i === 30 && j === 0) || (i === 31 && j === 0) || (i === 32 && j === 0) || (i === 33 && j === 0) || (i === 34 && j === 0) 
      || (i === 35 && j === 0) || (i === 36 && j === 0) || (i === 37 && j === 0) || (i === 38 && j === 0) || (i === 39 && j === 0) || (i === 40 && j === 0) || (i === 41 && j === 0)
      || (i === 42 && j === 0) || (i === 43 && j === 0) || (i === 44 && j === 0) || (i === 45 && j === 0) || (i === 46 && j === 0) || (i === 47 && j === 0) || (i === 48 && j === 0)
      || (i === 49 && j === 0) || (i === 50 && j === 0) || (i === 51 && j === 0) || (i === 52 && j === 0) || (i === 53 && j === 0) || (i === 54 && j === 0) || (i === 55 && j === 0) 
      || (i === 56 && j === 0)|| (i === 57 && j === 0) || (i === 58 && j === 0) || (i === 59 && j === 0) || (i === 60 && j === 0) || (i === 61 && j === 0) || (i === 62 && j === 0) 
      || (i === 63 && j === 0)
      ) {
        // Set specific rotation speed for squares
        rotationSpeed = 0; // No automatic rotation for specific squares
      }
      squares.push(new Square(x, y, squareSize, initialAngle, rotationSpeed)); // Add square to the array
    }
  }

  let ballSize = 30; // Size of the ball
  ball = new Ball(width - ballSize / 2, ballSize / 2, ballSize); // Initialize the ball object
}

function drawGrid() {
  stroke(0); // Black color for grid lines
  fill(0); // Black color for text

  for (let x = 0; x < width; x += 40) {
    line(x, 0, x, height); // Draw vertical grid lines
    text(x, x + 1, 12); // Display X-coordinates
  }

  for (let y = 0; y < height; y += 40) {
    line(0, y, width, y); // Draw horizontal grid lines
    text(y, 1, y + 12); // Display Y-coordinates
  }
}

function draw() {
  background(0); // Black background
  drawGrid(); // Draw the grid

  if (!isAnimationStarted) {
    for (let i = 0; i < squares.length; i++) {
      if (i === 0 || i === 1 || i === 2 || i === 3 || i === 4 || i === 5 || i === 6 || i === 7
          || i === 8 || i === 9 || i === 10 || i === 11 || i === 12 || i === 13 || i === 14
          || i === 15 || i === 16 || i === 17 || i === 18 || i === 19 || i === 20 || i === 21
          || i === 22 || i === 23 || i === 24 || i === 25 || i === 26 || i === 27 || i === 28 
          || i === 29 || i === 30 || i === 31 || i === 32 || i === 33 || i === 34 || i === 35
          || i === 36 || i === 37 || i === 38 || i === 39 || i === 40 || i === 41 || i === 42
          || i === 43 || i === 44 || i === 45 || i === 46 || i === 47 || i === 48 || i === 49
          || i === 50 || i === 51 || i === 52 || i === 53 || i === 54 || i === 55 || i === 56
          || i === 57 || i === 58 || i === 59 || i === 60 || i === 61 || i === 62 || i === 63
      ) {
        // Make the squares follow the ball's rotation
        squares[i].followBall(ball.x, ball.y);
      }
      squares[i].display(); // Display the squares
    }
    ball.display(); // Display the ball
    ball.moveTowards(); // Move the ball towards the target
  } else {
    displayAnimation(); // Display the image and text animation
  }
}

function displayAnimation() {
  let currentTime = millis(); // Get the current time
  // Display image in the middle
  if (img) {
    image(img, 400, 180, 500, 400); // Adjust the position and size as needed
  }

  // Move the text from (0, 680) to the right
  if (currentTime - lastTime > 2350) {
    lastTime = currentTime;
    texts.push(createVector(-500, 100)); // Add new text to the bottom
  }

  for (let i = 0; i < texts.length; i++) {
    let textPos = texts[i];
    fill(0, 128, 255);
    textSize(27);
    text("Crescendo International College", textPos.x, textPos.y); // Display the text
    textPos.x += 3.5; // Move the text to the right
    if (textPos.x > width) {
      texts.splice(i, 1); // Remove text if it goes off screen
      i--;
    }
  }

    // Reset the animation loop
    if (!resetInterval && currentTime > 5000) {
      resetInterval = setInterval(resetScene, 13000); 
    }
  } // Reset the scene

function resetScene() {
  loopCount = 0; // Reset the loop counter
  isAnimationStarted = false; // Stop the animation
  texts = []; // Clear the texts array
  imageDisplayed = false; // Reset the image displayed flag
  textX = 0; // Reset the text X-coordinate
  clearInterval(resetInterval); // Clear the reset interval
  resetInterval = null; // Reset the reset interval
}
