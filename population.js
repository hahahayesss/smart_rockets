class Population {

  constructor(target, size, lifeSpan) {
    this.target = target;
    this.size = size;
    this.lifeSpan = lifeSpan;
    this.rockets = [];
    for (var x = 0; x < size; x++) {
      this.rockets[x] = new Rocket(lifeSpan);
    }
  }

  nextStep(count) {
    for (var x = 0; x < this.rockets.length; x++) {
      this.rockets[x].update(count, this.target);
      this.rockets[x].show();
    }
  };

  evalution() {
    var fitness = [];
    var fitnessSum = 0;
    for (var x = 0; x < this.rockets.length; x++) {
      fitness[x] = this.rockets[x].calculateFitness();
      fitnessSum += fitness[x];
    }

    for (var x = 0; x < this.rockets.length; x++) {
      this.rockets[x].probability = fitness[x] / fitnessSum;
    }

    this.createNewPopulation();

    var liveRockets = [];
    for(var x = 0; x < this.size; x++) {
      var index = this.pickOne(this.rockets);
      liveRockets.push(this.rockets[index]);
    }
    this.rockets = liveRockets;

    for(var x = 0; x < this.rockets.length; x++) {
      //console.log(this.rockets[x].genes[0]);
    }
  };

  createNewPopulation() {
    var count = 0;
    var newRockets = [];
    while (this.rockets.length > 1) {
      var firstIndex = this.pickOne(this.rockets);
      var firstRocket = this.rockets[firstIndex];
      newRockets[count] = firstRocket;
      this.rockets.splice(firstIndex, 1);

      count++;

      var secondIndex = this.pickOne(this.rockets);
      var secondRocket = this.rockets[secondIndex];
      newRockets[count] = secondRocket;
      this.rockets.splice(secondIndex, 1);

      count++;
      //newRockets.push(this.breed(firstRocket.genes, secondRocket.genes));
    }

    for(var x = 0; x < newRockets.length; x++) {
      newRockets[x].startPoint();
    }
    this.rockets = newRockets;
  };

  breed(first, second) {
    var child = [];
    for(var x = 0; x < first.length; x++) {
      if(Math.random < 0.5) {
        child[x] = first[x];
      } else{
        child[x] = second[x];
      }
      console.log(child[x]);
    }
    //child = this.mutate(child);

    var childRocket = new Rocket();
    childRocket.genes = child;
    return childRocket;
  };

  mutate(genes) {
    for(var x = 0; x< genes.length; x++) {
      if(Math.random < 0.001) {
        genes[x] = createVector();
        genes[x].setMag(0.5);
      }
    }
    return genes;
  };

  pickOne(rockets) {
    var index = 0;
    var randomNumber = Math.random();
    while (randomNumber > 0 && index < rockets.length) {
      randomNumber = randomNumber - rockets[index].probability;
      index++;
    }
    return --index;
  };
}