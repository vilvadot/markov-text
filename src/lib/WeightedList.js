class MapItem{
  constructor(content, weight){
    this.content = content
    this.weight = weight
  }
}

class WeightedList {
  // weightMap[{value: weight}]
  constructor(weightMap = {}) {
    this.setWeights(weightMap);
    this.count = Object.keys(weightMap).length;
  }

  setWeights(blueprint) {
    let weights = {}
    Object.keys(blueprint).forEach(key =>{
      weights[key] = new MapItem(key, blueprint[key])
    })
    this.weightMap = weights
  }

  clearWeights() {
    this.weightMap = {};
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

module.exports = WeightedList;
