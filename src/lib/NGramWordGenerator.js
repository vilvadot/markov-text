const {yellow, green} = require("chalk");

class NgramGenerator {
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

  // hello world how are you
  // hello world
  // world how
  // how are
  // are you

  _removeUnwantedPairs(ngrams) {
    const wordPairs = ngrams.filter(ngram => {
      const isEndLinePair = ngram.indexOf('\n') == ngram.length - 1
      return !ngram.includes('\n') || isEndLinePair
    });

    const cleanPairs = wordPairs.map(pair => pair.toLowerCase().replace('\n', ''))

    return cleanPairs
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

  _generateNgrams(){
    // TODO: Where to put logging? in this method or in _generateWeightedNgrams?
    console.log(yellow('Generating nGrams...'))
    console.time('NGrams generated in: ')
    const words = this.corpus.split(' ')
    const wordPairs = []
    for(let i = 0; i < words.length; i++){
      wordPairs[i] = `${words[i]} ${words[i + 1]}`   
    }
    console.log(green('Raw ngrams:'), wordPairs.length)
    console.log(green('Clean ngrams:'), wordPairs.length)
    return this._removeUnwantedPairs(wordPairs)
  }

  _generateWeightedNgrams() {
    const chunks = this._generateNgrams();
    this._calcWeights(chunks);
  }
}

module.exports = NgramGenerator