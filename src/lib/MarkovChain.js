const { random, pick } = require("lodash");
const {red} = require("chalk");
const WeightedList = require("./WeightedList");
const log = require("./logger");

class MarkovChain {
  constructor(ngramWeights) {
    this.ngrams = ngramWeights;
    this.list = new WeightedList(ngramWeights)
    this.result = [];
    this.outputLength = 0;
  }

  generateSentence(desiredLength = 15) {
    this._setOutputLength(desiredLength);
    this._addFragments()
    return this._joinResult();
  }

  _addFragments(){
    this._addFirstFragment();

    for (let i = this.result.length; i < this.outputLength; i++) {
      const nextFragment = this._getNextFragment();
      if (!nextFragment) break;
      this.result.push(nextFragment)
      this._resetList()
    }
  }

  _joinResult(){
    const result = this.result.map(ngram => ngram.getMergeString()).join(' ')
    return result
  }

  _resetList(){
    //TODO:FIXME: Tiene pinta de ser terriblemente ineficiente (aunque permite utilizar todo tipo de entidades como ngrama)
    const tail = this.result.slice(-1)[0].getTail()
    const allNgramsList = new WeightedList(this.ngrams)
    const allNgramKeys = Object.values(allNgramsList.getAllItems())
    const filteredKeys = allNgramKeys.filter((ngram) => {
      return ngram.getHead() === tail
    })

    const matchingNgrams = filteredKeys.map(ngram => ngram.text)
    const mapWithMatchingNgrams = pick(this.ngrams, matchingNgrams);
    this.list.setWeights(mapWithMatchingNgrams)
  }

  _setOutputLength(desiredLength) {
    let length = desiredLength;

    if (Array.isArray(desiredLength)) {
      length = random(desiredLength[0], desiredLength[1]);
    }

    this.outputLength = length;
  }

  _getNextFragment() {
    log(red(`:${this.result.slice(-1)[0].text}:`))
    const nextFragment = this.list.getItem()
    return nextFragment
  }

  _addFirstFragment() {
    const firstNgram = this.list.getRandomItem()
    this.result.push(firstNgram)
    this._resetList()
  }
}

module.exports = MarkovChain;
