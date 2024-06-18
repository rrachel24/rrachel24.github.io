let rect1, rect2, rect3, rect4, rect5, rect6, rect7, rect8, rect9,//col1
rect10, rect11, rect12, rect13, rect14, rect15, rect16, rect17, rect18, //col2
rect19, rect20, rect21, rect22, rect23, rect24, rect25, rect26, rect27, //col3
rect28, rect29, rect30, rect31, rect32, rect33, rect34, rect35, rect36,//col4
rect37, rect38, rect39, rect40, rect41, rect42, rect43, rect44, rect45,//col5
rect46, rect47, rect48, rect49, rect50, rect51, rect52, rect53, rect54,//col6
rect55, rect56, rect57, rect58, rect59, rect60, rect61, rect62, rect63,//col7
ball1;

function setup() {
  createCanvas(1280, 720);
  rect1 = new MyRect(120, 50, 43, 43, color(255, 255, 0)); // Yellow rectangle (col1. row1)
  rect2 = new MyRect(240, 50, 43, 43, color(255, 255, 0)); 
  rect3 = new MyRect(360, 50, 43, 43, color(255, 255, 0));
  rect4 = new MyRect(480, 50, 43, 43, color(255, 255, 0));
  rect5 = new MyRect(600, 50, 43, 43, color(255, 255, 0));
  rect6 = new MyRect(720, 50, 43, 43, color(255, 255, 0));
  rect7 = new MyRect(840, 50, 43, 43, color(255, 255, 0));
  rect8 = new MyRect(960, 50, 43, 43, color(255, 255, 0));
  rect9 = new MyRect(1080, 50, 43, 43, color(255, 255, 0)); 

  rect10 = new MyRect(120, 150, 43, 43, color(255, 255, 0)); // Yellow rectangle (col1. row2)
  rect11 = new MyRect(240, 150, 45, 45, color(255, 255, 0));
  rect12 = new MyRect(360, 150, 43, 43, color(255, 255, 0));
  rect13 = new MyRect(480, 150, 43, 43, color(255, 255, 0));
  rect14 = new MyRect(600, 150, 43, 43, color(255, 255, 0));
  rect15 = new MyRect(720, 150, 43, 43, color(255, 255, 0)); 
  rect16 = new MyRect(840, 150, 43, 43, color(255, 255, 0));
  rect17 = new MyRect(960, 150, 43, 43, color(255, 255, 0));
  rect18 = new MyRect(1080, 150, 43, 43, color(255, 255, 0));

  rect19 = new MyRect(120, 250, 43, 43, color(255, 255, 0));// Yellow rectangle (col1. row3)
  rect20 = new MyRect(240, 250, 43, 43, color(255, 255, 0));
  rect21 = new MyRect(360, 250, 43, 43, color(255, 255, 0)); 
  rect22 = new MyRect(480, 250, 43, 43, color(255, 255, 0));
  rect23 = new MyRect(600, 250, 43, 43, color(255, 255, 0));
  rect24 = new MyRect(720, 250, 43, 43, color(255, 255, 0));
  rect25 = new MyRect(840, 250, 43, 43, color(255, 255, 0));
  rect26 = new MyRect(960, 250, 43, 43, color(255, 255, 0));
  rect27 = new MyRect(1080, 250, 43, 43, color(255, 255, 0));
  
  rect28 = new MyRect(120, 350, 43, 43, color(255, 255, 0)); // Yellow rectangle (col1. row4)
  rect29 = new MyRect(240, 350, 43, 43, color(255, 255, 0));
  rect30 = new MyRect(360, 350, 43, 43, color(255, 255, 0));
  rect31 = new MyRect(480, 350, 43, 43, color(255, 255, 0));
  rect32 = new MyRect(600, 350, 43, 43, color(255, 255, 0));
  rect33 = new MyRect(720, 350, 43, 43, color(255, 255, 0));
  rect34 = new MyRect(840, 350, 43, 43, color(255, 255, 0));
  rect35 = new MyRect(960, 350, 43, 43, color(255, 255, 0));
  rect36 = new MyRect(1080, 350, 43, 43, color(255, 255, 0));

  rect37 = new MyRect(120, 450, 43, 43, color(255, 255, 0)); // Yellow rectangle (col1. row5)
  rect38 = new MyRect(240, 450, 43, 43, color(255, 255, 0));
  rect39 = new MyRect(360, 450, 43, 43, color(255, 255, 0));
  rect40 = new MyRect(480, 450, 43, 43, color(255, 255, 0));
  rect41 = new MyRect(600, 450, 43, 43, color(255, 255, 0));
  rect42 = new MyRect(720, 450, 43, 43, color(255, 255, 0));
  rect43 = new MyRect(840, 450, 43, 43, color(255, 255, 0));
  rect44 = new MyRect(960, 450, 43, 43, color(255, 255, 0));
  rect45 = new MyRect(1080, 450, 43, 43, color(255, 255, 0));

  rect46 = new MyRect(120, 550, 43, 43, color(255, 255, 0)); // Yellow rectangle (col1. row6)
  rect47 = new MyRect(240, 550, 43, 43, color(255, 255, 0));
  rect48 = new MyRect(360, 550, 43, 43, color(255, 255, 0));
  rect49 = new MyRect(480, 550, 43, 43, color(255, 255, 0));
  rect50 = new MyRect(600, 550, 43, 43, color(255, 255, 0));
  rect51 = new MyRect(720, 550, 43, 43, color(255, 255, 0));
  rect52 = new MyRect(840, 550, 43, 43, color(255, 255, 0));
  rect53 = new MyRect(960, 550, 43, 43, color(255, 255, 0));
  rect54 = new MyRect(1080, 550, 43, 43, color(255, 255, 0));

  rect55 = new MyRect(120, 650, 43, 43, color(255, 255, 0)); // Yellow rectangle (col1. row7)
  rect56 = new MyRect(240, 650, 43, 43, color(255, 255, 0));
  rect57 = new MyRect(360, 650, 43, 43, color(255, 255, 0));
  rect58 = new MyRect(480, 650, 43, 43, color(255, 255, 0));
  rect59 = new MyRect(600, 650, 43, 43, color(255, 255, 0));
  rect60 = new MyRect(720, 650, 43, 43, color(255, 255, 0));
  rect61 = new MyRect(840, 650, 43, 43, color(255, 255, 0));
  rect62 = new MyRect(960, 650, 43, 43, color(255, 255, 0));
  rect63 = new MyRect(1080, 650, 43, 43, color(255, 255, 0));

  ball1 = new Ball(1280, 0, 40, color(255)); // White ball
}

function draw() {
  background(0);
  rect1.display();
  rect2.display();
  rect3.display();
  rect4.display();
  rect5.display();
  rect6.display();
  rect7.display();
  rect8.display();
  rect9.display();

  rect10.display();
  rect11.display();
  rect12.display();
  rect13.display();
  rect14.display();
  rect15.display();
  rect16.display();
  rect17.display();
  rect18.display();

  rect19.display();
  rect20.display();
  rect21.display();
  rect22.display();
  rect23.display();
  rect24.display();
  rect25.display();
  rect26.display();
  rect27.display();

  rect28.display();
  rect29.display();
  rect30.display();
  rect31.display();
  rect32.display();
  rect33.display();
  rect34.display();
  rect35.display();
  rect36.display();

  rect37.display();
  rect38.display();
  rect39.display();
  rect40.display();
  rect41.display();
  rect42.display();
  rect43.display();
  rect44.display();
  rect45.display();

  rect46.display();
  rect47.display();
  rect48.display();
  rect49.display();
  rect50.display();
  rect51.display();
  rect52.display();
  rect53.display();
  rect54.display();

  rect55.display();
  rect56.display();
  rect57.display();
  rect58.display();
  rect59.display();
  rect60.display();
  rect61.display();
  rect62.display();
  rect63.display();

  ball1.display();
}

class MyRect {
  constructor(x, y, w, h, c) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.c = c;
    this.angle = 0; // Initialize the angle
  }

  display() {
    fill(this.c);
    noStroke();
    push(); // Save the current state of transformation
    translate(this.x + this.w / 2, this.y + this.h / 2); // Move the origin to the center of the rectangle
    rotate(this.angle); // Rotate the rectangle
    rectMode(CENTER);
    rect(0, 0, this.w, this.h); // Draw the rectangle at the new origin
    pop(); // Restore the original state of transformation
    this.angle -= PI / 120; // Increment the angle
  }
}

class Ball {
  constructor(x, y, d, c) {
    this.x = x;
    this.y = y;
    this.d = d;
    this.c = c;
  }

  display() {
    fill(this.c);
    stroke(255,0,0);
    strokeWeight(2);

    ellipse(this.x, this.y, this.d, this.d);
  }
}
