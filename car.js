
class Car {
  constructor(x, y, direction, sMult) {
    this.pos = createVector(x, y);
    this.direction = direction;
    this.speed = random(2,5)*sMult;
    this.vel = p5.Vector.fromAngle(direction).mult(this.speed);
    this.size = 15;
    this.color = color(random(150, 255), random(150, 255), random(150, 255));
    this.braking = false;
    this.stopped = false;
    this.stoppedLight = null
    this.stoppedCar = null;
  }

  update() {
    if (!this.stopped) {
      this.pos.add(this.vel);
    }
  }

  checkLights(intersections) {
    this.braking = false;

    // Sprawdź czy samochód może ruszyć (jeśli jest zatrzymany przed światłem)
    if (this.stopped && this.stoppedLight && !this.stoppedLight.isRed) {
      this.stopped = false;
      this.vel = p5.Vector.fromAngle(this.direction).mult(this.speed);
      this.stoppedLight = null;
    }

    for (const intersection of intersections) {
      const toIntersection = createVector(intersection.x - this.pos.x, intersection.y - this.pos.y);
      const isApproaching = p5.Vector.dot(toIntersection, this.vel) > 0;
      const distance = toIntersection.mag();

      let lightDir = null;
      if (this.direction === 0) lightDir = 'west';
      else if (this.direction === PI) lightDir = 'east';
      else if (this.direction === HALF_PI) lightDir = 'north';
      else if (this.direction === -HALF_PI) lightDir = 'south';

      if (isApproaching && lightDir && distance < 40) {
        let isOnAxis = false;

        if (this.direction === 0 || this.direction === PI) {
          isOnAxis = abs(toIntersection.y) < 20;
        } else {
          isOnAxis = abs(toIntersection.x) < 20;
        }

        if (isOnAxis) {
          const light = intersection.lights[lightDir];

          if (light.isRed) {
            this.braking = true;
            this.vel.mult(0.95);

            if (distance < 100 || this.vel.mag() < 0.5) {
              this.vel.set(0, 0);
              this.stopped = true;
              this.stoppedLight = light; // Zapamiętaj światło
            }
          }
        }
      }
    }
  }

  checkCars(cars) {
    this.braking = false;

    // // Sprawdź czy samochód może ruszyć (jeśli jest zatrzymany przed światłem)
    if (this.stopped && this.stoppedCar && !this.stoppedCar.stopped) {
      this.stopped = false;
      this.vel = p5.Vector.fromAngle(this.direction).mult(this.speed);
      this.stoppedCar = null;
    }

    for (const car of cars) {
      // Sprawdzamy, czy są na tej samej ulicy
      if (this.direction === 0 || this.direction === PI) {
        if (car.pos.y != this.pos.y) {
          // console.log(car.y, this.pos.y);
          continue;
        }
      }

      if (this.direction === HALF_PI || this.direction === -HALF_PI) {
        if (car.pos.x != this.pos.x) {
          continue;
        }
      }

      const toCar = createVector(car.pos.x - this.pos.x, car.pos.y - this.pos.y);
      const isApproaching = p5.Vector.dot(toCar, this.vel) > 0;
      const distance = toCar.mag();

      // console.log(isApproaching);

      if (isApproaching && distance < 30) {
        this.braking = true;
        this.vel.mult(0.95);

        if (distance < 100 || this.vel.mag() < 0.5) {
          this.vel.set(0, 0);
          this.stopped = true;
          this.stoppedCar = car; // Zapamiętaj światło
          break;
        }
      }
    }
  }



  draw() {
    fill(this.color);
    noStroke();
    ellipse(this.pos.x, this.pos.y, this.size);
    this.drawDirection();
  }

  drawDirection() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.direction + PI / 2);
    fill(this.color);
    stroke(0);
    triangle(-this.size / 2, -this.size / 2, this.size / 2, -this.size / 2, 0, -this.size);
    pop();
  }
}