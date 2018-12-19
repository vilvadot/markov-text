const fs = require("fs");
const path = require("path");
const NGramGenerator = require("./lib/NGramGenerator");
const Markov = require("./lib/Markov");

const trainingPath = "./train/cyclone.txt";
const nGramsCache = "./ngrams.json";

const trainingText = fs.readFileSync(path.resolve(__dirname, trainingPath), "utf-8");

const cachedNGrams = JSON.parse(fs.readFileSync(path.resolve(__dirname, nGramsCache), "utf-8"));


const generator = new NGramGenerator(trainingText);
const ngrams = cachedNGrams ||generator.getNgrams()
const markov = new Markov(ngrams)

console.log(markov.getWord());
