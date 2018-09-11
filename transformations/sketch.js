function setup() {
    createCanvas(400, 400);
    rectMode(CENTER);
}

function draw() {
    push();
    translate(100, 100);
    rotate(radians(mouseX));
    fill(255);
    rect(0, 0, 100, 100);
    // ellipse(0, 0, 100, 100);
    pop();
    push();
    translate(300, 100);
    rotate(radians(mouseY));
    fill(127);
    rect(0, 0, 100, 100);
    // ellipse(0, 0, 100, 100);
    pop();
}

function mouseReleased() {

}