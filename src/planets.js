const fs = require("fs");
const path = require("path");
const NGramGenerator = require("./lib/NGramGenerator");
const MarkovChain = require("./lib/MarkovChain");

const trainingDirectory = "./training/";
const trainingFile = `${trainingDirectory}/planets.txt`;
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

  ngrams = new NGramGenerator(trainingText, 3).getNgrams();
  fs.writeFileSync(ngramsPath, JSON.stringify(ngrams));
}

const generatedText = new MarkovChain(ngrams).generateWord([3, 12]);

console.log(generatedText);
