const { random } = require("lodash");
const chalk = require("chalk");

const overlap = 2;

class Markov {
  constructor(ngrams, desiredLength = 10) {
    this.ngrams = ngrams;
    this.word = "";
    this.desiredLength = desiredLength;
    this._setRandomFirst();
  }

  _setRandomFirst() {
    const randomId = Math.floor(Math.random() * this.ngrams.length);
    this.word = this.ngrams[randomId];
  }

  _getCurrentSyllabe() {
    const currentSyllabe = this.word.slice(
      this.word.length - overlap,
      this.word.length
    );

    console.log(chalk.blue(`..${currentSyllabe}-`));
    return currentSyllabe;
  }

  _getMatchingNgram(startLetters) {
    const startOfWordRegexp = new RegExp(`^${startLetters}`);

    const matchingNgrams = this.ngrams.filter(ngram =>
      startOfWordRegexp.test(ngram)
    );
    const randomId = random(matchingNgrams.length - 1);
    const randomNgram = matchingNgrams[randomId];

    // console.log(chalk.green(matchingNgrams));
    console.log(`${chalk.green(matchingNgrams)}  ➠  ${chalk.bgWhite.black(randomNgram)}`);
    return randomNgram
  }

  _getNextSyllabe() {
    console.log(chalk.red(this.word));
    const currentSyllabe = this._getCurrentSyllabe();
    const Ngram = this._getMatchingNgram(currentSyllabe);

    const lastLettersFromNGram = Ngram ? Ngram.slice(2) : "";

    return lastLettersFromNGram;
  }

  _mergeNGram(nextSyllabe) {
    this.word = this.word + nextSyllabe;
  }

  _addPiece(pieceNumber) {
    console.log(`______________________________${pieceNumber}______________________________`);
    const selectedMatcher = this._getNextSyllabe();
    this._mergeNGram(selectedMatcher);
    console.log("\n");
  }

  getWord() {
    for (let i = 0; i <= this.desiredLength; i++) {
      this._addPiece(i);
    }
    return this.word;
  }
}

module.exports = Markov;
