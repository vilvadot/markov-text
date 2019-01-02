const { random, pick } = require("lodash");
const chalk = require("chalk");
const WeightedList = require("./WeightedList");
const log = require("./logger");

class MarkovChain {
  constructor(ngramWeights) {
    this.ngrams = ngramWeights;
    this.list = new WeightedList(ngramWeights)
    this.order = Object.keys(this.ngrams)[0].length;
    this.word = "";
    this.resultLength = 0;
  }

  generateSentence(desiredLength = 15) {
    this._setResultLength(desiredLength);
    this._setFirstFragment();
    let numWords = this.word.split(' ').length

    for (let i = numWords; i < desiredLength; i++) {
      const nextFragment = this._getNextFragment();
      if (!nextFragment) break;
      this.word = this.word + ' ' + nextFragment;
      log(chalk.grey(`${i}_______________`));
    }
    return this.word;
  }

  _setResultLength(desiredLength) {
    // TODO: Tiene sentido hacerlo así?
    // desiredLength can be aa single Integer or Array[minlen, maxlen]
    let resultLength = desiredLength;
    const lengthIsAnArray = Array.isArray(desiredLength);
    if (lengthIsAnArray) {
      resultLength = random(desiredLength[0], desiredLength[1]);
    }
    this.resultLength = resultLength;
  }

  _getNextFragmentFromCurrent(startWord) {
    log({ startWord });
    const matchingNgrams = Object.keys(this.ngrams).filter(ngram => {
      return ngram.split(' ')[0] == startWord
    }
    );
    const mapWithMatchingNgrams = pick(this.ngrams, matchingNgrams);
    log({mapWithMatchingNgrams});

    const ngramList = new WeightedList(mapWithMatchingNgrams);
    const nextFragment = ngramList.getItem();

    log({ nextFragment });
    return nextFragment;
  }

  _getNextFragment() {
    log(chalk.red(this.word));
    // Gets last letters of word
    const currentWord = this.word.split(' ').slice(-1)[0]
    // Chooses ngram matching that start
    const next = this._getNextFragmentFromCurrent(currentWord);

    // If no matching ngram next piece is blank
    const nextFragment = next && next.split(' ')[1]
    // Merges pieces together
    return nextFragment;
  }

  _setFirstFragment() {
    this.word = this.list.getRandomItem()
  }
}

module.exports = MarkovChain;
