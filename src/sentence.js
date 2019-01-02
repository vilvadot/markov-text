const fs = require("fs");
const path = require("path");
const {splitIntoWords, cleanWords} = require('./lib/processors/words');
const NgramGenerator = require("./lib/NgramGenerator");
const MarkovChain = require("./lib/MarkovChain");

const trainingDirectory = "./training/originals/";
const outputDirectory = "./training/output/";
const trainingFile = `${trainingDirectory}/methamorphosis_short.txt`;
const trainingPath = path.resolve(__dirname, trainingFile)

const fileName = trainingFile
  .split("/")
  .slice(-1)[0]
  .replace(".txt", "");

const ngramsFile = `${outputDirectory}${fileName}_ngrams.json`;
const ngramsPath = path.resolve(__dirname, ngramsFile);

let ngrams = [];

const options = {
  splitFn: splitIntoWords,
  // cleanFn: cleanWords,
  order: 3,
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

const generatedText = new MarkovChain(ngrams).generateSentence(100);

console.log(generatedText)