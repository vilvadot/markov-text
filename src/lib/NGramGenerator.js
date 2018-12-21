const {uniq} = require("lodash");
const fs = require("fs");
const path = require("path");

const outputFile = "../ngrams.json"

class NGramGenerator {
  constructor(corpus) {
    this.corpus = corpus;
    this.words = [];
    this._splitCorpusIntoWords();
    this._normalizeWords();
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
    return uniq(nGramsWithOnlyLetters);
  }

  generateFile(order) {
    const nGrams = this.getNgrams(order)
    console.time("generate nGrams");
    fs.writeFileSync(
      path.resolve(__dirname, outputFile),
      JSON.stringify(nGrams)
    );
    console.timeEnd("generate nGrams");
    console.log(`NGrams = ${nGrams.length}`)
  }

  getNgrams(order = 3) {
    const nGrams = [];
    for (let word of this.words) {
      for (let i = 0; i < word.length; i++) {
        const currentSlice = word.slice(i, i + order);
        if (currentSlice.length < order) break;
        nGrams.push(currentSlice);
      }
    }
    return this._cleanNGrams(nGrams);
  }
}

module.exports = NGramGenerator