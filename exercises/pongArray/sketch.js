var x = [];
var y = [];
var speedX = [];
var speedY = [];
var paddleX, paddleY;
var score;
var quantity = 10;

function setup() { //setup() executes once upon page load
  createCanvas(400, 400); //sequential order - createCanvas first, then change color
  background('black');
  for (var i=0; i<quantity; i++) {
    x[i] = random(width); //random x within width of createCanvas
    y[i] = random(height); //random y within width of createCanvas
    speedX[i] = 4;
    speedY[i] = -4;
  }
  paddleX = width/2;
  paddleY = height - 10;
  rectMode(CENTER);
  score = 0
}

function draw() { //draw() repeats 60x a second
  background(0);
  noStroke();
  fill('white');
  for (var i=0; i<quantity; i++) {
    ellipse(x[i], y[i], 10, 10); // ball
    x[i] += speedX[i]; // x + speedX
    y[i] += speedY[i]; // y + speedY;
  // if ball hits either left OR right wall, change direction
    if (x[i] >= width || x[i] <= 0) {
      speedX[i] *= -1; // speedX = speedX * -1
    }
  // if ball hits top wall, change direction
    if (y[i] <= 0) {
      speedY[i] *= -1; // speedY = speedY * -1
    }
  // make ball bounce off of paddle, add score every time ball hits paddle
    if ((x[i] >= paddleX-50 && x[i] <= paddleX+50) && (y[i] + 5 >= paddleY && y[i] - 5 <= paddleY)){
      score++;
      speedY[i] *= -1.1;
      speedX[i] *= 1.1;
    }
  }

  rect(paddleX, paddleY, 100, 10, 20); // paddle 100 w x 10 h, rounded corners
  text("SCORE: " + score, 10, 25)

// move paddle left if left arrow is down
  if (keyIsDown(LEFT_ARROW)) {
    paddleX -= 10;
  }
//  move paddle right if right arrow is down
  if (keyIsDown(RIGHT_ARROW)) {
    paddleX += 10;
  }
}

// reset when mouse clicked
function mousePressed() {
    setup();
}
