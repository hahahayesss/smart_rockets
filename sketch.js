var count = 0;
var population;

function setup() {
  createCanvas(1680, 800);

  this.target = createVector(width - 50, height / 2);
  
  population = new Population(this.target, 10, 100);
}

function draw() {
  background(0);
  circle(this.target.x, this.target.y, 20);

  if (count < 100) {
    population.nextStep(count);
    count++;
  } else {
    population.evalution();
    count = 0;
  }
}