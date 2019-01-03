const fs = require("fs");
const path = require("path");
const {splitIntoSyllabes, removeUnwantedBlocks} = require('./lib/processors/syllabes');
const NgramGenerator = require("./lib/NgramGenerator");
const MarkovChain = require("./lib/MarkovChain");

const trainingDirectory = "./training/input/";
const outputDirectory = "./training/output/";
const trainingFile = `${trainingDirectory}/planets.txt`;
const trainingPath = path.resolve(__dirname, trainingFile)

const fileName = trainingFile
  .split("/")
  .slice(-1)[0]
  .replace(".txt", "");

const ngramsFile = `${outputDirectory}${fileName}_ngrams.json`;
const ngramsPath = path.resolve(__dirname, ngramsFile);

let ngrams = [];

const options = {
  splitFn: splitIntoSyllabes,
  cleanFn: removeUnwantedBlocks,
  order: 5,
}


try {
  const fileContents = fs.readFileSync(ngramsPath, "utf-8");
  ngrams = JSON.parse(fileContents);

} catch (err) {

  const trainingText = fs.readFileSync(
    trainingPath,
    "utf-8"
  );
  ngrams = new NgramGenerator(trainingText, options).getNgrams();
  // fs.writeFileSync(ngramsPath, JSON.stringify(ngrams));
}

const generatedText = new MarkovChain(ngrams).generate(5);

console.log(generatedText)
