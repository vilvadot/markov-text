const {yellow, green} = require("chalk");

class NGramGenerator {
  constructor(corpus, order = 3) {
    this.corpus = corpus;
    this.order = order;
    this.weightedNgrams = {}
    // TODO: Chain methods in constructor vs calling single method aggregating all of them?
    this._generateWeightedNgrams();
  }

  getNgrams(){
    return this.weightedNgrams
  }

  _splitCorpusIntoWords() {
    const words = this.corpus.split(" ")
    return words.map(word => word.toLowerCase());
  }

  _cleanNGrams(nGrams) {
    const nGramsWithOnlyLetters = nGrams.filter(nGram => {
      const regExpOnlyLetters = /^[a-zA-Z]+$/g;
      return regExpOnlyLetters.test(nGram);
    });
    return nGramsWithOnlyLetters
  }

  _calcWeights(ngrams) {
    console.log(yellow('Calculating weights, this may take a while...'))
    for (let ngram of ngrams) {
      if (Object.keys(this.weightedNgrams).includes(ngram)) {
        this.weightedNgrams[ngram]++;
      } else {
        this.weightedNgrams[ngram] = 1;
      }
    }
  }

  _generateNgrams(words){
    console.log(yellow('Generating nGrams...'))
    console.time('NGrams generated in: ')
    const nGrams = [];
    for (let word of words) {
      for (let i = 0; i < word.length; i++) {
        const currentSlice = word.slice(i, i + this.order);
        if (currentSlice.length < this.order) break;
        nGrams.push(currentSlice);
      }
    }
    const cleanNgrams = this._cleanNGrams(nGrams)
    console.log(green('Raw ngrams:'), nGrams.length)
    console.log(green('Clean ngrams:'), cleanNgrams.length)
    return cleanNgrams;
  }

  _generateWeightedNgrams() {
    const words = this._splitCorpusIntoWords();
    const ngrams = this._generateNgrams(words);
    this._calcWeights(ngrams);
  }
}

module.exports = NGramGenerator