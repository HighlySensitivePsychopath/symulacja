class GUI {
    constructor(leftMargin, width, height) {
        this.leftMargin = leftMargin;
        this.width = width;
        this.height = height;
        this.intersectionSlider = createSlider(1, 5, 2);
        this.intersectionSlider.position(this.leftMargin + 30, 50);
        this.carCountSlider = createSlider(1, 5, 0, 1);
        this.carCountSlider.position(this.leftMargin +30, 100);
        this.rdColorSlider=createColorPicker(80);
        this.rdColorSlider.position(this.leftMargin +30, 160);
        this.bgColorSlider=createColorPicker(100);
        this.bgColorSlider.position(this.leftMargin +30, 160);
    }

    draw() {
        fill(200, 255, 0);
        noStroke();
        rect(this.leftMargin, 0, this.width, this.height);
        this.drawLabels();
    }

    drawLabels() {
        fill(0);
        textSize(20);
        text("Liczba skrzyżowań", this.leftMargin + 10, 30);
        text("Liczba samochodów", this.leftMargin + 10, 85);
        text("Kolor jezdni", this.leftMargin + 10, 140);
        text("Kolor tła", this.leftMargin + 10, 140+65);
    }
}