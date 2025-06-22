class Environment {
    constructor(width, height) {
        let guiWidth = 200;
        this.width = width - guiWidth;
        this.height = height;
        this.intersections = [];
        this.cars = [];
        this.roadOffset = 15;
        this.lastSpawnTime = 0;
        this.spawnInterval = 500;
        this.gui = new GUI(this.width, guiWidth, this.height);
    }

    start() {
        this.generateRoads();
        this.spawnInitialCars();
    }

    generateRoads() {
        this.intersections = [];
        const n = this.gui.intersectionSlider.value();
        const spacingX = this.width / (2 * n + 1);
        const spacingY = this.height / (2 * n + 1);

        for (let i = 1; i <= 2 * n; i++) {
            for (let j = 1; j <= 2 * n; j++) {
                this.intersections.push(new Intersection(i * spacingX, j * spacingY));
            }
        }
    }

    spawnInitialCars() {
        this.cars = [];
        const initialCarCount = 10;

        for (let i = 0; i < initialCarCount; i++) {
            this.spawnCar();
        }
    }

    update() {
        this.updateIntersections();
        this.updateCars();
        this.updateSpawn();
    }

    updateIntersections() {
        const n = this.gui.intersectionSlider.value();
        const targetCount = (2 * n) * (2 * n);
        if (this.intersections.length !== targetCount) {
            this.generateRoads();
            this.spawnInitialCars();
        }

        this.intersections.forEach(intersection => {
            intersection.update();
        });
    }

    updateCars() {
        this.cars = this.cars.filter(car => {
            return car.pos.x > -50 &&
                car.pos.x < this.width + 50 &&
                car.pos.y > -50 &&
                car.pos.y < this.height + 50;
        });
        const spdMult = this.gui.carSpeedSlider.value();
        this.cars.forEach(car => {
            car.update(spdMult);
            car.checkLights(this.intersections);
            car.checkCars(this.cars);
        });
    }

    updateSpawn() {
        const carCount = this.gui.carCountSlider.value();
        if (millis() - this.lastSpawnTime > this.spawnInterval) {
            for(let i =0; i<carCount; i++){
                this.spawnCar();
            }
            this.lastSpawnTime = millis();
        }
    }

    spawnCar() {
        const n = this.gui.intersectionSlider.value();
        const spacingX = this.width / (2 * n + 1);
        const spacingY = this.height / (2 * n + 1);

        const isHorizontal = random() > 0.5;
        let x, y, direction;

        if (isHorizontal) {
            const rowIndex = floor(random(0, 2 * n));
            const roadY = (rowIndex + 1) * spacingY;
            const laneOffset = random() > 0.5 ? - this.roadOffset / 2 : this.roadOffset / 2;
            direction = laneOffset < 0 ? PI : 0;
            y = roadY + laneOffset;
            x = direction === 0 ? -20 : this.width + 20;
        } else {
            const colIndex = floor(random(0, 2 * n));  // Poprawione: colIndex zamiast rowIndex
            const roadX = (colIndex + 1) * spacingX;  // Poprawione: roadX zamiast roadY
            const laneOffset = random() > 0.5 ? - this.roadOffset / 2 : this.roadOffset / 2;
            direction = laneOffset < 0 ? HALF_PI : -HALF_PI;
            x = roadX + laneOffset;
            y = direction === HALF_PI ? -20 : height + 20;
        }
        const speedMult = this.gui.carSpeedSlider.value();
        // console.log(`Spawning car at (${x}, ${y}) direction: ${direction}`);
        this.cars.push(new Car(x, y, direction, speedMult));
    }

    draw() {
        const bgColor=this.gui.bgColorSlider.value();
        background(bgColor);
        this.drawRoads();
        this.drawIntersections();
        this.drawCars();
        this.gui.draw();
    }

    drawRoads() {
        const n = this.gui.intersectionSlider.value();
        const spacingX = this.width / (2 * n + 1);
        const spacingY = this.height / (2 * n + 1);

        // Kolor jezdni
        const rdColo=this.gui.rdColorSlider.value();
        fill(rdColo);
        noStroke();

        // Poziome jezdnie
        for (let j = 1; j <= 2 * n; j++) {
            const y = j * spacingY;
            rect(0, y - this.roadOffset, this.width, 2 * this.roadOffset);
        }

        // Pionowe jezdnie
        for (let i = 1; i <= 2 * n; i++) {
            const x = i * spacingX;
            rect(x - this.roadOffset, 0, 2 * this.roadOffset, this.height);
        }

        // Linie rozdzielające
        stroke(255, 255, 0);
        strokeWeight(2);
        drawingContext.setLineDash([10, 15]);

        for (let j = 1; j <= 2 * n; j++) {
            const y = j * spacingY;
            line(0, y, this.width, y);
        }

        for (let i = 1; i <= 2 * n; i++) {
            const x = i * spacingX;
            line(x, 0, x, height);
        }

        drawingContext.setLineDash([]);
    }

    drawIntersections() {
        this.intersections.forEach(intersection => intersection.draw());
    }

    drawCars() {
        this.cars.forEach(car => {
            car.draw();
        });
    }
    
    mousePressed(mouseX, mouseY) {
        for (const intersection of this.intersections) {
            for (const light of Object.values(intersection.lights)) {
                const d = dist(mouseX, mouseY, light.x, light.y);
                if (d < light.size * 1.5) {
                    intersection.toggleLights();
                    return;
                }
            }
        }
    }
}