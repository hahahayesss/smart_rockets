class Population {

    constructor() {
        this.fitness = [];
        this.rockets = [];

        for (let x = 0; x < populationSize; x++)
            this.rockets[x] = new Rocket();
    }

    run() {
        for (let x = 0; x < populationSize; x++) {
            this.rockets[x].update();
            this.rockets[x].show();
        }
    }

    evaluate() {
        let best = Number.MAX_SAFE_INTEGER;
        for (let x = 0; x < populationSize; x++) {
            this.fitness[x] = this.rockets[x].calculateDistance();
            if (this.fitness[x] == 0)
                this.fitness[x] = 1;
            if (this.fitness[x] < best)
                best = this.fitness[x];
            this.fitness[x] = 1 / this.fitness[x];
        }
        console.log("Epoch: %d, Best: %d", epoch, best);

        let max = Math.max(...this.fitness);
        let min = Math.min(...this.fitness);

        for (let x = 0; x < this.fitness.length; x++)
            this.fitness[x] = (this.fitness[x] - min) / (max - min);
    }

    selection() {
        let newRockets = [];
        for (let x = 0; x < this.fitness.length; x++) {
            let firstIndex = this.pickOne();
            let firstRocket = this.rockets[firstIndex];
            this.rockets.splice(firstIndex, 1);
            this.fitness.splice(firstIndex, 1);

            let secondIndex = this.pickOne();
            let secondRocket = this.rockets[secondIndex];
            this.rockets.splice(secondIndex, 1);
            this.fitness.splice(secondIndex, 1);

            let newDNA = firstRocket.dna.produce(secondRocket.dna);
            newDNA.mutate();
            newRockets.push(new Rocket(newDNA));
            newRockets.push(new Rocket(firstRocket.dna));
            newRockets.push(new Rocket(secondRocket.dna));
        }
        this.rockets = newRockets;

        while (populationSize < this.rockets.length)
            this.rockets.splice(
                Math.floor(
                    Math.random() * (this.rockets.length - 1)), 1);
    }

    pickOne() {
        let index = 0;
        let randomNumber = Math.random();
        while (randomNumber > 0) {
            if (index >= this.fitness.length)
                index = 0;
            randomNumber -= this.fitness[index];
            index++;
        }
        return --index;
    }
}