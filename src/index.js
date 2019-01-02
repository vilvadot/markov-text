const fs = require("fs");
const path = require("path");
const {random} = require("lodash");
const NgramWordGenerator = require("./lib/NgramWordGenerator");
const MarkovChain = require("./lib/MarkovChain");

const trainingDirectory = "./training/";
const trainingFile = `${trainingDirectory}/tormes.txt`;
const trainingPath = path.resolve(__dirname, trainingFile)

const fileName = trainingFile
  .split("/")
  .slice(-1)[0]
  .replace(".txt", "");

const ngramsFile = `${trainingDirectory}/${fileName}_ngrams.json`;
const ngramsPath = path.resolve(__dirname, ngramsFile);

let ngrams = [];

try {
  const fileContents = fs.readFileSync(ngramsPath, "utf-8");
  ngrams = JSON.parse(fileContents);

} catch (err) {

  const trainingText = fs.readFileSync(
    trainingPath,
    "utf-8"
  );
  ngrams = new NgramWordGenerator(trainingText, 3).getNgrams();
  fs.writeFileSync(ngramsPath, JSON.stringify(ngrams));
}

for(let i of Array(10)){
  const generatedText = new MarkovChain(ngrams).generateSentence(100);
  console.log(generatedText)
  console.log('-----------');
}
