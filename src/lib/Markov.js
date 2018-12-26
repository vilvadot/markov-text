const { random } = require("lodash");
const chalk = require("chalk");
const WeightedList = require('./WeightedList');

class Markov {
  constructor(ngrams) {
    this.ngrams = ngrams;
    this.order = Object.keys(this.ngrams)[0].length
    this.word = "";
    this._setFirstFragment();
  }

  generateWord(desiredLength = 5) {
    for (let i = 0; i <= desiredLength; i++) {
      this._addNext();
      console.log(chalk.grey(`${i}_______________`));
    }
    return this.word;
  }


  _getNextFragment(startLetters) {
    console.log({startLetters})
    const matchingNgrams = 
    Object.keys(this.ngrams)
    .filter((ngram) => ngram.startsWith(startLetters))

    console.log(matchingNgrams)
    // const ngramsList = new WeightedList()
    return '';
  }

  _addNext() {
    console.log(chalk.red(this.word));

    // Gets last letters of word
    const currentSyllabe = this.word.slice(
      this.word.length - this.order + 1,
      this.word.length
    );
    // Chooses ngram matching that start 
    const ngram = this._getNextFragment(currentSyllabe)

    // If no matching ngram next piece is blank
    const nextPiece = ngram ? ngram.slice(2) : "";
    
    // Merges pieces together
    this.word = this.word + nextPiece;
  }

  _setFirstFragment() {
    const ngrams = Object.keys(this.ngrams)
    const randomId = random(ngrams.length - 1);
    this.word = ngrams[randomId];
  }
}

module.exports = Markov;
