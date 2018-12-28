const { random, pick } = require("lodash");
const chalk = require("chalk");
const WeightedList = require("./WeightedList");

class Markov {
  constructor(ngrams) {
    this.ngrams = ngrams;
    this.order = Object.keys(this.ngrams)[0].length;
    this.word = "";
    this.wordLength = 0;
    this.isDebugMode = false;
  }

  setDebugging(mode = true) {
    this.isDebugMode = mode;
  }

  generateWord(desiredLength = 5) {
    this._setWordLength(desiredLength);
    this._setFirstFragment();
    for (let i = this.word.length; i < this.wordLength; i++) {
      this._addNextFragment();
      this._debug(chalk.grey(`${i}_______________`));
    }
    return this.word;
  }

  _setWordLength(desiredLength) {
    // desiredLength can be aa single Integer or Array[minlen, maxlen]
    let wordLength = desiredLength;
    const lengthIsAnArray = Array.isArray(desiredLength);
    if (lengthIsAnArray) {
      wordLength = random(desiredLength[0], desiredLength[1]);
    }
    this.wordLength = wordLength;
  }

  _getNextFragmentFromCurrent(startLetters) {
    this._debug({ startLetters });

    const matchingNgrams = Object.keys(this.ngrams).filter(ngram =>
      ngram.startsWith(startLetters)
    );

    const mapWithMatchingNgrams = pick(this.ngrams, matchingNgrams);

    this._debug(mapWithMatchingNgrams);

    const ngramList = new WeightedList(mapWithMatchingNgrams);
    const nextFragment = ngramList.getItem();

    this._debug({ nextFragment });
    
    return nextFragment;
  }

  _debug(contents) {
    if (this.isDebugMode) {
      console.log(contents);
    }
  }

  _addNextFragment() {
    this._debug(chalk.red(this.word));

    // Gets last letters of word
    const currentSyllabe = this.word.slice(
      this.word.length - this.order + 1,
      this.word.length
    );
    // Chooses ngram matching that start
    const next = this._getNextFragmentFromCurrent(currentSyllabe);

    // If no matching ngram next piece is blank
    const nextFragment = next ? next.slice(2) : "";

    // Merges pieces together
    this.word = this.word + nextFragment;
  }

  _setFirstFragment() {
    const ngrams = Object.keys(this.ngrams);
    const randomId = random(ngrams.length - 1);
    this.word = ngrams[randomId];
  }
}

module.exports = Markov;
