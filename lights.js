// lights.js
class TrafficLight {
  constructor(x, y) { // Usunięto direction - nie był używany
    this.x = x;
    this.y = y;
    this.isRed = true;
    this.size = 20;
    this.isChanging = false;
    this.changingStartTime = null;
    this.changingDuration = 1500;
  }

  toggle() {
    if(this.isChanging) {
      return;
    }

    this.isChanging = true;
    this.changingStartTime = millis();
    // this.isRed = !this.isRed;
  }

  update() {
    if(this.isChanging && millis() - this.changingStartTime > (this.isRed + 1) * this.changingDuration) {
      this.isRed = !this.isRed;
      this.isChanging = false;
    }
  }

  draw() {
    fill(this.isRed ? '#ff0000' : '#00ff00');
    if(this.isChanging && !this.isRed) {
      fill('orange');
    }
    if(this.isChanging && this.isRed && millis() - this.changingStartTime > this.changingDuration) {
      fill('orange');
    }
    noStroke();
    ellipse(this.x, this.y, this.size, this.size);
    
    // Dodaj białą obwódkę dla lepszej widoczności

    stroke(255);

    strokeWeight(1);
    noFill();
    ellipse(this.x, this.y, this.size + 2, this.size + 2);
  }
}