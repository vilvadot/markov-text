const fs = require("fs");
const path = require("path");
const NGramGenerator = require("./lib/NGramGenerator");
const Markov = require("./lib/Markov");
const WeightedList = require("./lib/WeightedList");

const trainingPath = "./train/training.txt";
const ngramsPath = "./ngrams.json";

const trainingText = fs.readFileSync(path.resolve(__dirname, trainingPath), "utf-8");

// 

try{
  const calculatedNgrams = fs.readFileSync(path.resolve(__dirname, ngramsPath), "utf-8");
}catch(err){
  const ngrams = new NGramGenerator(trainingText, 3).saveToFile()
}
// if(calculatedNgrams){

// }

// const markov = new Markov(ngrams)

// console.log(markov.generateWord())
// // console.log(markov._getWeightedNgram());
