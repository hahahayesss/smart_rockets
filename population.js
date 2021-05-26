class Population {

    constructor() {
        this.distances = [];
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
            this.distances[x] = this.calculateDistance(this.rockets[x].distance)
            if (this.distances[x] < best)
                best = this.distances[x];

            if (this.rockets[x].completed)
                this.distances[x] *= 0.7;
            if (this.rockets[x].crashed)
                this.distances[x] *= 2;
            //this.distances[x] = 1 / this.distances[x];
        }

        let max = Math.max(...this.distances);
        let min = Math.min(...this.distances);

        console.log("Epoch: %d, Best: %d", epoch, best);

        for (let x = 0; x < this.distances.length; x++)
            this.distances[x] = (this.distances[x] - min) / (max - min);
    }

    selection() {
        let newRockets = [];
        for (let x = 0; x < this.distances.length; x++) {
            let firstIndex = this.pickOne();
            let firstRocket = this.rockets[firstIndex];
            this.rockets.splice(firstIndex, 1);
            this.distances.splice(firstIndex, 1);

            let secondIndex = this.pickOne();
            let secondRocket = this.rockets[secondIndex];
            this.rockets.splice(secondIndex, 1);
            this.distances.splice(secondIndex, 1);

            let newDNA = firstRocket.dna.produce(secondRocket.dna);
            newDNA.mutate();
            newRockets.push(new Rocket(newDNA));
            newRockets.push(new Rocket(firstRocket.dna));
            newRockets.push(new Rocket(secondRocket.dna));
        }
        this.rockets = newRockets;

        while (populationSize < this.rockets.length)
            this.rockets.splice(this.pickOne(), 1);
    }

    calculateDistance(arr) {
        let total = 0;
        for (let x = 0; x < arr.length; x++)
            total += arr[x];
        return total / arr.length;
    }

    pickOne() {
        let index = 0;
        let randomNumber = Math.random();
        while (randomNumber > 0 && index < this.distances.length) {
            randomNumber = randomNumber - this.distances[index];
            index++;
        }
        return --index;
    }
}