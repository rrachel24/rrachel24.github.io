let isAnimationStarted = false;
let x = 0;  // 初始文本的 x 坐标
let lastTime = 0; // 变量用于存储上一次显示文本的时间budu
let texts = [];

let resetInterval; // 声明一个全局变量用于存储重置操作的间隔 ID

let logoX, logoY, targetX, targetY;

function preload() {
    logo = loadImage('crescendo_logo.png');
}

function setup() {
    createCanvas(1280, 720);
    background(255, 250, 250);
    angleMode(DEGREES);

    squareUpRight = new SquareUpRight();
    ball = new Ball();
    triangleUpLeft = new TriangleUpLeft();
    triangleDownRight = new TriangleDownRight();

    square1 = new Square1();
    square2 = new Square2();

    square3 = new Square3();
    square4 = new Square4();

    semiCircle = new SemiCircle();

    logoX = 420;
    logoY = -300;
    targetX = 420;
    targetY = 100;

    lastTime = millis();
}

function draw() {
    // 大四方 背景
    fill(255);
    noStroke();
    square(350, 60, 600);

    square1.drawSquare();

    square1.drawSkinTriangleScale();
    square1.adjustSize();
    square1.drawSkinTriangle1();
    square1.move1();
    
    square1.drawPentagon();

    square4.drawSquare();

    square4.drawSkinTriangle1();
    square4.move1();
    square4.drawSkinTriangleScale();
    square4.adjustSize();

    square4.drawPentagon(); 

    square2.drawSquare();
    square2.drawTriangleSkin();
    square2.adjustSize();

    square3.drawSquare();
    semiCircle.drawSemiCircle();
    semiCircle.updateRotation();

    fill(255);
    noStroke();
    rect(810, 200, 140, 460);
    rect(350, 60, 460, 140);

    squareUpRight.drawSquare();

    ball.drawBall();
    ball.move();

    triangleUpLeft.drawTriangle();
    triangleUpLeft.adjustSize();
    triangleDownRight.drawTriangle();
    triangleDownRight.adjustPosition();

    noStroke();
    fill(255, 250, 250);
    rect(350, 0, 1240, 60);
    rect(0, 0, 350, 720);
    rect(0, 660, 1240, 60);
    rect(950, 0, 330, 720);

    let currentTime = millis();
    if (isAnimationStarted) {
        // Draw new background to cover the entire canvas
        background(255,250,250);
        // Animate and display images and text
        if (currentTime - lastTime > 2350) {
            // 重置 lastTime 为当前时间
            lastTime = currentTime;

            texts.push(createVector(-500, 630)); // 将新文本添加到数组的底部
        }

        for (let i = 0; i < texts.length; i++) {
            let textPos = texts[i];
            fill(0);
            textSize(27);
            text("Crescendo International College", textPos.x, textPos.y);
    
            // 更新文本位置，使其向右移动
            textPos.x += 3;
            if (textPos.x > width) {
                // 如果文本移出屏幕，则将其从数组中移除
                texts.splice(i, 1);
                i--; // 将索引减一，以防止跳过下一个元素
            }
        }

        moveLogo();
        image(logo, logoX, logoY, 500, 400); // Display image at position (x, y)
        
        if (!resetInterval && currentTime > 5000) {
            resetInterval = setInterval(resetScene, 10000); // 每秒检查一次是否需要重置
        }
    }
}

function moveLogo() {
    let speed = 2;

    if (logoY < targetY) {
        logoY += speed;
        if (logoY > targetY) {
            logoY = targetY;
        }
    }
}

function resetScene() {
    // 清除所有的文本
    texts = [];

    // 重置 lastTime 为当前时间
    lastTime = millis();

    // Reset the logo position
    logoX = 420;
    logoY = -300;

    // 重置球的位置和状态
    ball.location = createVector(880, 590);
    ball.route = 1;
    ball.resetCount++;

    // 重置其他对象的位置和状态
    squareUpRight = new SquareUpRight();
    ball = new Ball();
    triangleUpLeft = new TriangleUpLeft();
    triangleDownRight = new TriangleDownRight();

    square1 = new Square1();
    square2 = new Square2();
    square3 = new Square3();
    square4 = new Square4();

    semiCircle = new SemiCircle();

    // 重置动画状态和重置间隔
    isAnimationStarted = false;
    clearInterval(resetInterval);
    resetInterval = null; // 重置重置间隔ID，以便下次可以再次启动
}