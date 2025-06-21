class Intersection {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.lights = {
      north: new TrafficLight(x, y - 25),
      south: new TrafficLight(x, y + 25),
      east: new TrafficLight(x + 25, y),
      west: new TrafficLight(x - 25, y)
    };

    this.toggleInitialLights();
    this.lightsDuration = random(5, 10) * 1000;
    this.lastLightsChange = millis();
  }

  toggleInitialLights() {
    if (random(1, 100) <= 50) {
      this.lights['east'].isRed = false;
      this.lights['west'].isRed = false;
    } else {
      this.lights['south'].isRed = false;
      this.lights['north'].isRed = false;
    }
  }

  draw() {
    Object.values(this.lights).forEach(light => light.draw());
  }

  update() {
    if(millis() - this.lastLightsChange > this.lightsDuration) {
      this.toggleLights();
    }
    Object.values(this.lights).forEach(light => light.update());
  }

  toggleLights() {
    this.lastLightsChange = millis();
    this.lights['east'].toggle();
    this.lights['west'].toggle();
    this.lights['south'].toggle();
    this.lights['north'].toggle();
  }
}