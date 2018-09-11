var x, y, speedX, speedY, paddleX, paddleY, score

function setup() { //setup() executes once upon page load
  createCanvas(720, 400); //sequential order - createCanvas first, then change color
  background('black');
  x = random(width); //random x within width of createCanvas
  y = random(height); //random y within width of createCanvas
  speedX = 4;
  speedY = -4;
  paddleX = width/2;
  paddleY = height - 10;
  rectMode(CENTER);
  score = 0;
}

function draw() { //draw() repeats 60x a second
  background(0);
  noStroke();
  fill('white');
  ellipse(x, y, 10, 10); // ball
  rect(paddleX, paddleY, 100, 10, 20); // paddle
  x += speedX; // x + speedX
  y += speedY; // y + speedY;
  text("SCORE: " + score, 10, 25)

// if ball hits either left OR right wall, change direction
  if (x >= width || x <= 0) {
    speedX *= -1; // speedX = speedX * -1
  }
// if ball hits top wall, change direction
  if (y <= 0) {
    speedY *= -1; // speedY = speedY * -1
  }

// move paddle left if left arrow is down
  if (keyIsDown(LEFT_ARROW)) {
    paddleX -= 10;
  }
//  move paddle right if right arrow is down
  if (keyIsDown(RIGHT_ARROW)) {
    paddleX += 10;
  }

// make ball bounce off of paddle, add score every time ball hits paddle
  if ((x >= paddleX-50 && x <= paddleX+50) && (y + 5 >= paddleY && y - 5 <= paddleY)){
    score++;
    speedY *= -1.1;
    speedX *= 1.1;
  }
}

// reset when mouse clicked
function mousePressed() {
    setup();
}
