const { random, pick } = require("lodash");
const chalk = require("chalk");
const WeightedList = require('./WeightedList');

class Markov {
  constructor(ngrams) {
    this.ngrams = ngrams;
    this.order = Object.keys(this.ngrams)[0].length
    this.word = "";
    this.debugging = false;
  }

  setDebugging(mode = true){
    this.debugging = mode
  }

  generateWord(desiredLength = 5) {
    let wordLength = desiredLength
    if(Array.isArray(desiredLength)){
      wordLength = random(desiredLength[0], desiredLength[1])
    }
    this._setFirstFragment();
    for (let i = this.word.length; i < wordLength; i++) {
      this._addNext();
      this._debug(chalk.grey(`${i}_______________`));
    }
    return this.word;
  }


  _getNextFragment(startLetters) {
    this._debug({startLetters})
    const matchingNgrams = 
    Object.keys(this.ngrams)
    .filter((ngram) => ngram.startsWith(startLetters))

    const nGramMap = pick(this.ngrams, matchingNgrams)
    this._debug(nGramMap)
    const list = new WeightedList(nGramMap)
    const ngram = list.getItem()
    this._debug({ngram})
    return ngram;
  }

  _debug(contents){
    if(this.debugging){
      console.log(contents)
    }
  }

  _addNext() {
    this._debug(chalk.red(this.word));

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
