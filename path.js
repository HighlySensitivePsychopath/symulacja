class Path {
  constructor() {
    this.points = [];
  }

  addPoint(x, y) {
    this.points.push(createVector(x, y));
  }

  draw() {
    stroke(0);
    strokeWeight(2);
    noFill();
    beginShape();
    for (let point of this.points) {
      vertex(point.x, point.y);
    }
    endShape();
  }
}
