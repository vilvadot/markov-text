const { yellow, green, red, black, bgYellow } = require("chalk");

const defaultCleaningFn = (ngrams) => ngrams

class NgramGenerator {
  constructor(corpus, options) {
    this.corpus = corpus;
    this.order = options.order || 3;
    this.weightedNgrams = {};
    this.splitFn = options.splitFn;
    this.cleanFn = options.cleanFn || defaultCleaningFn;
    // TODO: Error handling en el constructor?
    try {
      this._validateConfig(options);
    } catch (error) {
      return console.error(red(error));
    }
    // TODO: Chain methods in constructor vs calling single method aggregating all of them?
    this._generateWeightedNgrams();
  }

  getNgrams() {
    return this.weightedNgrams;
  }

  _validateConfig(options) {
    if (!options) {
      throw new Error("You must provide an options object");
    }
    if (typeof this.corpus !== "string") {
      throw new Error("Training material must be a string");
    }
    if (typeof options.splitFn !== "function") {
      throw new Error("Please provide a valid splitting function");
    }
    if (!options.order) {
      console.log(black.bgYellow('No ngram order found, using 3 as default'))
    }
  }

  _removeUnwantedNgrams(ngrams) {
    return this.cleanFn(ngrams);
  }

  _calcWeights(ngrams) {
    console.log(yellow("Calculating weights, this may take a while..."));
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
    console.log(yellow("Generating nGrams..."));
    console.time("NGrams generated in: ");

    const ngrams = this.splitFn(this.corpus, this.order);

    console.log(green("Ngrams:"), ngrams.length);
    return this._removeUnwantedNgrams(ngrams);
  }

  _generateWeightedNgrams() {
    const ngrams = this._generateNgrams();
    this._calcWeights(ngrams);
  }
}

module.exports = NgramGenerator;
