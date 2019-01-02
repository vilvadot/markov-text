const Ngram = require('./Ngram')
const {random} = require('lodash')

class NgramItem{
  constructor(content, weight){
    this.content = new Ngram(content).text
    this.weight = weight
  }
}

class WeightedNgramList {
  // weightMap[{value: weight}]
  constructor(weightMap = {}) {
    this.setWeights(weightMap);
    this.count = Object.keys(weightMap).length;
  }

  setWeights(blueprint) {
    let weights = {}
    Object.keys(blueprint).forEach(key =>{
      weights[key] = new NgramItem(key, blueprint[key])
    })
    this.weightMap = weights
  }

  clearWeights() {
    this.weightMap = {};
  }

  getRandomItem(){
    const items = Object.keys(this.weightMap)
    const randomId = random(items.length - 1)
    const randomItem = items[randomId]

    // FIXME: Return fullobject
    return this.weightMap[randomItem].content
  }

  getItem() {
    const max = this._sumWeights();
    let target = Math.random() * max;

    for (let item in this.weightMap) {
      let weight = this.weightMap[item].weight;
      if (target <= weight) {
        // FIXME: Return fullobject
        return this.weightMap[item].content;
      } else {
        target -= weight;
      }
    }
  }

  _sumWeights() {
    let weightSum = 0;
    for (let item in this.weightMap) {
      weightSum += this.weightMap[item].weight;
    }
    return weightSum;
  }
}

module.exports = WeightedNgramList;
