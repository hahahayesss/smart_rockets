const populationSize = 300;
const lifespan = 500;
const mutationRate = 0.01;

let target;
let barrier;

let step = 0;
let epoch = 0;

let population;

function setup() {
    createCanvas(1680, 800);
    target = createVector(width - 50, height / 2);
    barrier = createVector(width / 2, height / 2);
    this.population = new Population();
}

function draw() {
    background(0);
    drawTarget(2);
    drawObstacle(25, height / 3);

    this.population.run();
    step++;

    if (step > lifespan) {
        this.population.evaluate();
        this.population.selection();
        step = 0;
        epoch++;
    }
}

function drawTarget(n) {
    noStroke();
    fill(255);
    ellipse(target.x, target.y, 20 * n, 20 * n);
    fill(255, 0, 0);
    ellipse(target.x, target.y, 16 * n, 16 * n);
    fill(255);
    ellipse(target.x, target.y, 12 * n, 12 * n);
    fill(255, 0, 0);
    ellipse(target.x, target.y, 8 * n, 8 * n);
    fill(255);
    ellipse(target.x, target.y, 4 * n, 4 * n);
}

function drawObstacle(w, h) {
    noStroke();
    fill(255);
    rect(barrier.x, barrier.y, w, h);
}