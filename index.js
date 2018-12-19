const fs = require("fs");
const path = require("path");
const {uniq} = require("lodash");

const cyclonePath = "./train/cyclone.txt";
const wordsPath = "./train/words.txt";
const trainingPath = cyclonePath;

const trainingText = fs.readFileSync(path.resolve(trainingPath), "utf-8");

class NgramGenerator {
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
      path.resolve("./ngrams.json"),
      JSON.stringify(nGrams)
    );
    console.timeEnd("generate nGrams");
    console.log(`NGrams = ${nGrams.length}`)
  }

  getNgrams(order = 3) {
    const nGrams = [];
    for (let word of this.words) {
      for (let i = 0; i < word.length; i++) {
        const currentSlice = word.slice(i, i + 3);
        if (currentSlice.length < order) break;
        nGrams.push(currentSlice);
      }
    }
    return this._cleanNGrams(nGrams);
  }
}

const ngrams = new NgramGenerator(trainingText);
ngrams.generateFile();
// console.log(ngrams.getNgrams(3));
