const { yellow, green, red, black, bgYellow } = require("chalk");
const log = require('./logger')

const defaultCleaningFn = ngrams => ngrams

class NgramGenerator {
  constructor(text, options) {
    this.text = text;
    this._validateConfig(options);
    // TODO: Error handling en el constructor?
    this.order = options.order || 3;
    this.weightedNgrams = {};
    this.splitFn = options.splitFn;
    this.cleanFn = options.cleanFn || defaultCleaningFn;
    // TODO: Chain methods in constructor vs calling single method aggregating all of them?
  }

  getNgrams() {
    // Better to do this in the constructor??
    const ngramsLength = Object.keys(this.weightedNgrams).length
    if(!ngramsLength){
      this._generateWeightedNgrams();
    }
    return this.weightedNgrams;
  }

  _validateConfig(options) {
    if (!this.text) {
      throw new Error("You must provide a text");
    }
    if (!options) {
      throw new Error("You must provide an options object");
    }
    if (typeof this.text !== "string") {
      throw new Error("Training material must be a string");
    }
    if (typeof options.splitFn !== "function") {
      throw new Error("Please provide a valid splitting function");
    }
    if (!options.order) {
      log(black.bgYellow('No ngram order found, using 3 as default'))
    }
  }

  _removeUnwantedNgrams(ngrams) {
    return this.cleanFn(ngrams);
  }

  _calcWeights(ngrams) {
    log(yellow("Calculating weights, this may take a while..."));
    for (let ngram of ngrams) {
      if (Object.keys(this.weightedNgrams).includes(ngram)) {
        this.weightedNgrams[ngram]++;
      } else {
        this.weightedNgrams[ngram] = 1;
      }
    }
  }

  _generateNgrams() {
    // TODO: Where to put logging? in this method or in _generateWeightedNgrams?
    log(yellow("Generating nGrams..."));
    const ngrams = this.splitFn(this.text, this.order);

    log(green("Ngrams:"), ngrams.length);
    return this._removeUnwantedNgrams(ngrams);
  }

  _generateWeightedNgrams() {
    const ngrams = this._generateNgrams();
    this._calcWeights(ngrams);
  }
}

module.exports = NgramGenerator;