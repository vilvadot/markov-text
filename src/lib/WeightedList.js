const Ngram = require('./Ngram')
const {random} = require('lodash')

class NgramItem extends Ngram{
  constructor(content, weight){
    super(content)
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

    return this.weightMap[randomItem]
  }

  getItem() {
    const max = this._sumWeights();
    let target = Math.random() * max;

    for (let item in this.weightMap) {
      let weight = this.weightMap[item].weight;
      if (target <= weight) {
        return this.weightMap[item];
      } else {
        target -= weight;
      }
    }
  }

  getAllItems(){
    // return Object.values(this.weightMap)
    return this.weightMap
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
