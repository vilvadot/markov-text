const {uniq} = require("lodash");
const fs = require("fs");
const path = require("path");

const defaultOutput = "../ngrams.json"

class NGramGenerator {
  constructor(corpus, order = 3) {
    this.corpus = corpus;
    this.order = order;
    this.words = [];
    this.nGrams = [];
    this.weights = {}
    this._splitCorpusIntoWords();
    this._normalizeWords();
    this._generateNgrams();
    this._calcWeights();
  }

  _splitCorpusIntoWords() {
    this.words = this.corpus.split(" ");
  }

  _normalizeWords() {
    this.words = this.words.map(word => word.toLowerCase());
  }

  _cleanNGrams(nGrams) {
    const nGramsWithOnlyLetters = nGrams.filter(nGram => {
      const regExpOnlyLetters = /^[a-zA-Z]+$/g;
      return regExpOnlyLetters.test(nGram);
    });
    return nGramsWithOnlyLetters
  }

  _calcWeights() {
    for (let ngram of this.nGrams) {
      if (Object.keys(this.weights).includes(ngram)) {
        this.weights[ngram]++;
      } else {
        this.weights[ngram] = 1;
      }
    }
    console.log(this.weights)
  }

  getNgrams(){
    return this.weights
  }

  saveToFile(filePath = defaultOutput) {
    fs.writeFileSync(
      path.resolve(__dirname, filePath),
      JSON.stringify(this.weights)
    );
  }

  _generateNgrams() {
    const nGrams = [];
    for (let word of this.words) {
      for (let i = 0; i < word.length; i++) {
        const currentSlice = word.slice(i, i + this.order);
        if (currentSlice.length < this.order) break;
        nGrams.push(currentSlice);
      }
    }
    this.nGrams = this._cleanNGrams(nGrams);
  }
  
}

module.exports = NGramGenerator