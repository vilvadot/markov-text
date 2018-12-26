class WeightedList {
  constructor(weightMap = {}) {
    // {value: weight}
    this.setWeights()
    this.count = Object.keys(weightMap).length
  }

  _sumWeights() {
    let weightSum = 0;
    for (let key in this.weightMap) {
      weightSum += this.weightMap[key];
    }
    return weightSum;
  }

  setWeights(weightMap){
    this.weightMap = weightMap;
  }

  clearWeights(){
    this.weightMap = {};
  }
  
  getItem() {
    const max = this._sumWeights()
    let target = Math.random() * max
    for(let key in this.weightMap){
      let weight = this.weightMap[key]
      if(target <= weight){
        return key
      }else{
        target -= weight
      }
    }
  }
}

module.exports = WeightedList