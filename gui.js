class GUI {
    constructor(leftMargin, width, height) {
        this.leftMargin = leftMargin;
        this.width = width;
        this.height = height;
        this.intersectionSlider = createSlider(1, 5, 2);
        this.intersectionSlider.position(this.leftMargin + 30, 50);
        this.carCountSlider = createSlider(1, 5, 0, 1);
        this.carCountSlider.position(this.leftMargin +30, 100);
    }

    draw() {
        fill(255, 0, 0);
        noStroke();
        rect(this.leftMargin, 0, this.width, this.height);
        this.drawLabels();
    }

    drawLabels() {
        fill(0);
        textSize(20);
        text("Liczba skrzyżowań", this.leftMargin + 10, 30);
        text("Liczba respionych samochodów", this.leftMargin + 10, 85);
    }
}