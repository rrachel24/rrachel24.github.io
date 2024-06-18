function setup() {
    createCanvas(800, 500,WEBGL);
    background(0);
}

function draw() {
    push();
    translate(-240,-100,0);
    plane(70);
    pop();

    push();
    translate(0,-100,0)
    box(70,70,70);
    pop();

    push();
    translate(240,-100,0);
    cylinder(50,70);
    pop();

    push();
    translate(-250,100,0);
    cone(50,100);
    pop();

    push();
    translate(-75,100,0);
    torus(50,20);
    pop();

    push();
    translate(100,100,0);
    sphere(50);
    pop();

    push();
    translate(275,100,0)
    ellipsoid(30,40,40);
    pop();
}