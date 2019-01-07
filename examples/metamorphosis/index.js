const fs = require("fs");
const path = require("path");
const { bgBlue, black } = require("chalk");
const Markov = require("../../src/lib/Markov");

const trainingFilePath = path.resolve(
  __dirname,
  `./metamorphosis.txt`
);

const trainingText = fs.readFileSync(trainingFilePath, "utf-8");

const options = {
  mode: 'multiple',
  order: 5
};

const markov = new Markov(options);
markov.seed(trainingText);

setInterval(() => {
  const generatedText = markov.generate(20);
  
  console.log(black.bgBlue(generatedText));
  console.log('----------')
}, 300)