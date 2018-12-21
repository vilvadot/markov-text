const { random } = require("lodash");
const chalk = require("chalk");

const overlap = 2;

class Markov {
  constructor(ngrams) {
    this.ngrams = ngrams;
    this.word = "";
    this._setRandomFirst();
  }

  _setRandomFirst() {
    const randomId = random(this.ngrams.length - 1);
    this.word = this.ngrams[randomId];
  }

  _getCurrentSyllabe() {
    const currentSyllabe = this.word.slice(
      this.word.length - overlap,
      this.word.length
    );

    return currentSyllabe;
  }

  _getMatchingNgram(startLetters) {
    const matchingNgrams = this.ngrams.filter(ngram =>
      ngram.startsWith(startLetters)
    );
    const randomId = random(matchingNgrams.length - 1);
    const randomNgram = matchingNgrams[randomId];

    console.log(`${chalk.green(matchingNgrams)}  ➠  ${chalk.bgWhite.black(randomNgram)}`);

    return randomNgram
  }

  _getNextSyllabe() {
    console.log(chalk.red(this.word))
    const currentSyllabe = this._getCurrentSyllabe()
    const ngram = this._getMatchingNgram(currentSyllabe)
    const pieceToMerge = ngram.slice(2)

    return ngram ? pieceToMerge : ''
  }

  _addNextSyllabe() {
    this.word = this.word + this._getNextSyllabe();
  }

  getWord(desiredLength = 5) {
    for (let i = 0; i <= desiredLength; i++) {
      this._addNextSyllabe();
      console.log(`${i}_______________`)
    }
    return this.word;
  }
}

module.exports = Markov;
