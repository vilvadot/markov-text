const fs = require("fs");
const path = require("path");
const NGramGenerator = require("./lib/NGramGenerator");
const Markov = require("./lib/Markov");
const WeightedList = require("./lib/WeightedList");

const trainingPath = "./train/planets.txt";
const ngramsPath = "./ngrams.json";

const trainingText = fs.readFileSync(path.resolve(__dirname, trainingPath), "utf-8");

let ngrams = []

try{
  const fileContents = fs.readFileSync(path.resolve(__dirname, ngramsPath), "utf-8")
  ngrams = JSON.parse(fileContents)
}catch(err){
  ngrams = new NGramGenerator(trainingText, 3).saveToFile()
}

const markov = new Markov(ngrams)

console.log(markov.generateWord([3, 9]))