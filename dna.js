class DNA {

    constructor(genes) {
        if (genes) this.genes = genes;
        else this.start_random();
    }

    start_random() {
        this.genes = [];
        for (let x = 0; x < lifespan; x++)
            this.genes[x] = this.createGene();
    }

    produce(partner) {
        const newDNA = [];
        for (let x = 0; x < this.genes.length; x++)
            if (Math.random() < 0.5) newDNA[x] = this.genes[x];
            else newDNA[x] = partner[x];
        return new DNA(newDNA);
    }

    mutate() {
        for (let x = 0; x < this.genes.length; x++)
            if (Math.random() < mutationRate)
                this.genes[x] = this.createGene();
    }

    createGene() {
        const vec = p5.Vector.random2D();
        vec.setMag(0.1);
        return vec;
    }
}