const fs = require("fs");
const path = require("path");

const cyclonePath = "./train/cyclone.txt";
const wordsPath = "./train/words.txt";
const trainingPath = wordsPath;

const trainingText = fs.readFileSync(path.resolve(trainingPath), "utf-8");

class NgramGenerator {
  constructor(corpus) {
    this.corpus = corpus;
    this.words = [];
    this._splitCorpusIntoWords();
    this._normalizeWords();
    console.log(this.words);
  }

  _splitCorpusIntoWords() {
    this.words = this.corpus.split(" ");
  }

  _normalizeWords() {
    this.words = this.words.map(word => word.toLowerCase());
  }

  getNgrams(order) {
    const nGrams = [];
    for (let word of this.words) {
      for (let i = 0; i < word.length; i++) {
        const currentSlice = word.slice(i, i + 3);
        if(currentSlice.length < order) break
        nGrams.push(currentSlice);
      }
    }
    return nGrams;
  }
}

const ngrams = new NgramGenerator(trainingText);

console.log(ngrams.getNgrams(3));
