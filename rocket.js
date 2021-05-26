class Rocket {

    constructor(dna) {
        this.position = createVector(50, height / 2);
        this.velocity = createVector();
        this.acceleration = createVector();

        this.crashed = false;
        this.completed = false;

        if (dna) this.dna = dna;
        else this.dna = new DNA();
    }

    applyForce(force) {
        this.acceleration.add(force);
    }

    calculateDistance() {
        return dist(
            this.position.x, this.position.y,
            target.x, target.y
        );
    }

    update() {
        if (this.calculateDistance() < 20)
            this.completed = true;

        if (
            this.position.x > barrier.x && this.position.x < barrier.x + 25 &&
            this.position.y > barrier.y && this.position.y < barrier.y + (height / 3)
        )
            this.crashed = true;

        if (
            this.position.x > width || this.position.x < 0 ||
            this.position.y > height || this.position.y < 0
        )
            this.crashed = true;

        if (!this.completed && !this.crashed) {
            this.applyForce(this.dna.genes[step]);
            this.velocity.add(this.acceleration);
            this.position.add(this.velocity);
            this.acceleration.mult(0);
        }
    }

    draw(n) {
        noStroke();
        fill(200, 175);
        rect(0, 0, 4 * n, 4 * n);
        rect(-n, 4 * n, 6 * n, 14 * n);
        rect(-2 * n, 12 * n, 1 * n, 2 * n);
        rect(5 * n, 12 * n, 1 * n, 2 * n);
        rect(-4 * n, 12 * n, 2 * n, 8 * n);
        rect(6 * n, 12 * n, 2 * n, 8 * n);

        fill(51, 175);
        rect(0, 8 * n, 4 * n, 4 * n);

        if (step < lifespan) {
            fill(22, 122, 198, 175);
            rect(0, 8 * n, 4 * n, 4 * n);

            fill(255, 0, 0, 175);
            rect(0, 18 * n, 2 * n, 4 * n);
            rect(2 * n, 18 * n, 2 * n, 6 * n);
        }

        if (this.completed) {
            fill(0, 255, 0, 175);

            rect(0, 0, 4 * n, 4 * n);
            rect(-n, 4 * n, 6 * n, 14 * n);
            rect(-2 * n, 12 * n, 1 * n, 2 * n);
            rect(5 * n, 12 * n, 1 * n, 2 * n);
            rect(-4 * n, 12 * n, 2 * n, 8 * n);
            rect(6 * n, 12 * n, 2 * n, 8 * n);
        }
    }

    show() {
        push();
        translate(this.position.x, this.position.y);
        rotate(this.velocity.heading() + Math.PI / 2);
        this.draw(1);
        pop();
    }
}