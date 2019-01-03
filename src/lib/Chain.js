const { random, pick } = require("lodash");
const { red, grey, blue } = require("chalk");
const WeightedList = require("./WeightedList");
const log = require("./logger");

class Chain {
  constructor(ngramWeights) {
    this.ngrams = ngramWeights;
    this.list = new WeightedList(ngramWeights);
    this.result = [];
    this.outputLength = 0;
  }

  generate(desiredLength = 3) {
    this._reset()
    this._setOutputLength(this.outputLength || desiredLength);
    this._addFragments();
    return this._joinResult();
  }

  _addFragments() {
    this._addFirstFragment();

    for (let i = this.result.length; i < this.outputLength; i++) {
      const nextFragment = this._getNextFragment();
      if (!nextFragment) break;
      this.result.push(nextFragment);
      this._recalcList(i);
    }

    if(this.result.length < this.outputLength/2){
      this._reset()
      this._addFragments()
    }
  }

  _joinResult() {
    const resultLength = this.result.length;
    const firstWord = this.result[0].text;
    if (resultLength > 1) {
      const mergeWords = this.result
        .slice(1)
        .map(ngram => ngram.getMergeString())
        .join("");
      return firstWord + mergeWords;
    }
    return firstWord;
  }

  _reset(){
    this.result = []
    this.list = new WeightedList(this.ngrams);
  }

  _recalcList(i = 0) {
    //TODO:FIXME: Tiene pinta de ser terriblemente ineficiente (aunque permite utilizar todo tipo de entidades como ngrama)
    const lastFragment = this.result.slice(-1)[0];
    const tail = lastFragment.getTail();
    const allNgramsList = new WeightedList(this.ngrams);
    const allNgramKeys = Object.values(allNgramsList.getAllItems());
    const filteredKeys = allNgramKeys.filter(ngram => {
      return ngram.getHead() === tail;
    });

    const matchingNgrams = filteredKeys.map(ngram => ngram.text);
    const mapWithMatchingNgrams = pick(this.ngrams, matchingNgrams);
    this.list.setWeights(mapWithMatchingNgrams);

    log(red(`${i} - ${lastFragment.text}`));
    log(blue(`${tail}:`));
    log(grey(JSON.stringify(mapWithMatchingNgrams, 0, 2)));
  }

  _setOutputLength(desiredLength) {
    let length = desiredLength;

    if (Array.isArray(desiredLength)) {
      length = random(desiredLength[0], desiredLength[1]);
    }
    log(`Output length:${length}`)
    this.outputLength = length;
  }

  _getNextFragment() {
    const nextFragment = this.list.getItem();
    return nextFragment;
  }

  _addFirstFragment() {
    const firstNgram = this.list.getRandomItem();
    this.result.push(firstNgram);
    this._recalcList();
  }
}

module.exports = Chain;
