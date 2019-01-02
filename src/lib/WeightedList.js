class WeightedList {
  // weightMap[{value: weight}]
  constructor(weightMap = {}) {
    this.weightMap = weightMap;
    this.count = Object.keys(weightMap).length;
  }

  setWeights(weightMap) {
    this.weightMap = weightMap;
  }

  clearWeights() {
    this.weightMap = {};
  }

  getItem() {
    const max = this._sumWeights();
    let target = Math.random() * max;
    for (let item in this.weightMap) {
      let weight = this.weightMap[item];
      if (target <= weight) {
        return item;
      } else {
        target -= weight;
      }
    }
  }

  _sumWeights() {
    let weightSum = 0;
    for (let item in this.weightMap) {
      weightSum += this.weightMap[item];
    }
    return weightSum;
  }
}

module.exports = WeightedList;
