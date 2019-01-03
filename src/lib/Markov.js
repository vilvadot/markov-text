const NgramGenerator = require("./NgramGenerator");
const Chain = require("./Chain");
const { words, syllabes } = require("./processors");

const SINGLE_MODE = "single";
const MULTIPLE_MODE = "multiple";

defaultOptions = {
  order: 3,
  mode: MULTIPLE_MODE
}

class Markov {
  constructor(options = defaultOptions) {
    this.ngrams = [];
    this.chain = {};
    this.mode = options.mode
    this.order = options.order
    this.options = this._setupOptions();
  }

  _setupOptions() {
    let processingFunctions = {
      splitFn: words.split,
      cleanFn: words.clean
    };
    
    if (this.mode === SINGLE_MODE) {
      processingFunctions = {
        splitFn: syllabes.split,
        cleanFn: syllabes.clean
      };
    }

    return {
      ...processingFunctions,
      order: this.order
    };
  }

  seed(trainingText) {
    const generator = new NgramGenerator(trainingText, this.options);
    this.ngrams = generator.getNgrams();
    this.chain = new Chain(this.ngrams);
  }

  generate(desiredLength) {
    return this.chain.generate(desiredLength);
  }
}

module.exports = Markov;
