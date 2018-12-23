const fs = require("fs");
const path = require("path");
const NGramGenerator = require("./lib/NGramGenerator");
const Markov = require("./lib/Markov");
const WeightedList = require("./lib/WeightedList");

const trainingPath = "./train/training.txt";

const trainingText = fs.readFileSync(path.resolve(__dirname, trainingPath), "utf-8");


const generator = new NGramGenerator(trainingText, 4);
const ngrams = generator.getNgrams(3)
const weights = new WeightedList({
  cat: 1,
  dog: 1,
  parrot: 1,
})

console.log(weights.count)

const markov = new Markov(ngrams, 5)

// console.log(markov.getWord());
