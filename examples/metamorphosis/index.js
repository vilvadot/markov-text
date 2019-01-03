const fs = require("fs");
const path = require("path");
const { bgBlue, black } = require("chalk");
const {
  splitIntoWords,
  removeUnwantedBlocks
} = require("../../src/lib/processors/words");
const Markov = require("../../src/lib/Markov");

const trainingFilePath = path.resolve(
  __dirname,
  `./methamorphosis.txt`
);

const trainingText = fs.readFileSync(trainingFilePath, "utf-8");

const options = {
  splitFn: splitIntoWords,
  cleanFn: removeUnwantedBlocks,
  order: 3
};

const markov = new Markov(options);
markov.seed(trainingText);

const generatedText = markov.generate(17);

console.log(black.bgBlue(generatedText));