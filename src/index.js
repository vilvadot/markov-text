const fs = require("fs");
const path = require("path");
const NGramGenerator = require("./lib/NGramGenerator");
const Markov = require("./lib/Markov");
const WeightedList = require("./lib/WeightedList");

const trainingPath = "./train/short.txt";

const trainingText = fs.readFileSync(path.resolve(__dirname, trainingPath), "utf-8");


const ngrams = new NGramGenerator(trainingText, 3).getNgrams()

const markov = new Markov(ngrams, 5)
// console.log(markov._getWeightedNgram());
