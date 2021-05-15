class Rocket {

  constructor(lifeSpan) {
    this.gravity = createVector(0, 0.098);

    this.genes = [];
    if(lifeSpan) {
      for (var x = 0; x < lifeSpan; x++) {
        this.genes[x] = p5.Vector.random2D();
        this.genes[x].setMag(0.5);
      }
    }

    this.startPoint();
  }

  startPoint() {
    this.position = createVector(50, height / 2);
    this.velocity = createVector();
    this.acceleration = createVector();
    this.reached = false;
    this.fitness = [];
    this.probability = 0;
  };

  // -------------------------------------------

  show() {
    push();
    noStroke();
    translate(this.position.x, this.position.y);
    rotate(this.velocity.heading());
    triangle(0, 0, 15, 5, 0, 10);
    pop();
  };

  // -------------------------------------------

  applyForce(force) {
    this.acceleration.add(force);
  };

  update(count, target) {
    var distance = dist(
      this.position.x, this.position.y,
      target.x, target.y
    );

    if (distance < 20) {
      this.reached = true;
      this.fitness[count] = 1;
      this.position = target.copy();
    }

    if (!this.reached) {
      //this.applyForce(this.gravity);
      this.applyForce(this.genes[count]);

      this.velocity.add(this.acceleration);
      this.position.add(this.velocity);
      this.acceleration.mult(0);

      this.fitness[count] = 1 / distance;
    }

    console.log(this.reached);
  };

  calculateFitness() {
    var sum = 0;
    for (var x = 0; x < this.fitness.length; x++) {
      sum += this.fitness[x];
    }
    return sum / this.fitness.length;
  }
}