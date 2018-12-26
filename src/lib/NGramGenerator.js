const fs = require("fs");
const path = require("path");
const {yellow, green} = require("chalk");

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
    console.log(yellow('Calculating weights, this may take a while...'))
    for (let ngram of this.nGrams) {
      if (Object.keys(this.weights).includes(ngram)) {
        this.weights[ngram]++;
      } else {
        this.weights[ngram] = 1;
      }
    }
  }

  getNgrams(){
    return this.weights
  }

  saveToFile(filePath = defaultOutput) {
    const outputPath = path.resolve(__dirname, filePath)
    fs.writeFileSync(
      outputPath,
      JSON.stringify(this.weights)
      );
    console.timeEnd('NGrams generated in: ')
    console.log(green(`ngrams saved to: ${outputPath} 👍🏻`))
    return this.weights
  }

  _generateNgrams() {
    console.log(yellow('Generating nGrams...'))
    console.time('NGrams generated in: ')
    const nGrams = [];
    for (let word of this.words) {
      for (let i = 0; i < word.length; i++) {
        const currentSlice = word.slice(i, i + this.order);
        if (currentSlice.length < this.order) break;
        nGrams.push(currentSlice);
      }
    }
    console.log(green('Raw ngrams:'), nGrams.length)
    this.nGrams = this._cleanNGrams(nGrams);
    console.log(green('Clean ngrams:'), this.nGrams.length)
  }
}

module.exports = NGramGenerator