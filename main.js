let environment;

function setup() {
  createCanvas(1200, 1000);
  environment = new Environment(width, height);
  environment.start();
}

function draw() {
  environment.update();
  environment.draw();
}

function mousePressed() {
  environment.mousePressed(mouseX, mouseY);
}
