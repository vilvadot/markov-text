const { random, pick } = require("lodash");
const { red, grey, blue } = require("chalk");
const WeightedList = require("./WeightedList");
const log = require("./logger");

class MarkovChain {
  constructor(ngramWeights) {
    this.ngrams = ngramWeights;
    this.list = new WeightedList(ngramWeights);
    this.result = [];
    this.outputLength = 0;
  }

  generate(desiredLength = 15) {
    this._setOutputLength(desiredLength);
    this._addFragments();
    return this._joinResult();
  }

  _addFragments() {
    this._addFirstFragment();

    for (let i = this.result.length; i < this.outputLength; i++) {
      const nextFragment = this._getNextFragment();
      if (!nextFragment) break;
      this.result.push(nextFragment);
      this._resetList(i);
    }
  }

  _joinResult() {
    const resultLength = this.result.length;
    const firstWord = this.result[0].text;
    if (resultLength > 1) {
      const mergeWords = this.result
        .slice(1, -1)
        .map(ngram => ngram.getMergeString())
        .join("");
      const lastWord = this.result[this.result.length - 1].text;
      return firstWord + mergeWords + lastWord;
    }
    return firstWord;
  }

  _resetList(i = 0) {
    //TODO:FIXME: Tiene pinta de ser terriblemente ineficiente (aunque permite utilizar todo tipo de entidades como ngrama)
    const lastFragment = this.result.slice(-1)[0];
    log(red(`${i} - ${lastFragment.text}`));
    const tail = lastFragment.getTail();
    log(blue(`${tail}:`));
    const allNgramsList = new WeightedList(this.ngrams);
    const allNgramKeys = Object.values(allNgramsList.getAllItems());
    const filteredKeys = allNgramKeys.filter(ngram => {
      return ngram.getHead() === tail;
    });

    const matchingNgrams = filteredKeys.map(ngram => ngram.text);
    const mapWithMatchingNgrams = pick(this.ngrams, matchingNgrams);
    log(grey(JSON.stringify(mapWithMatchingNgrams, 0, 2)));
    this.list.setWeights(mapWithMatchingNgrams);
  }

  _setOutputLength(desiredLength) {
    let length = desiredLength;

    if (Array.isArray(desiredLength)) {
      length = random(desiredLength[0], desiredLength[1]);
    }

    this.outputLength = length;
  }

  _getNextFragment() {
    const nextFragment = this.list.getItem();
    return nextFragment;
  }

  _addFirstFragment() {
    const firstNgram = this.list.getRandomItem();
    this.result.push(firstNgram);
    this._resetList();
  }
}

module.exports = MarkovChain;
