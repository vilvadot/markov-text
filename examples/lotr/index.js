const fs = require("fs")
const path = require("path")
const { bgBlue, black } = require("chalk")
const Markov = require("../../src/lib/Markov")

const trainingFilePath = path.resolve(
  __dirname,
  `./lotr.txt`
)

const trainingText = fs.readFileSync(trainingFilePath, "utf-8")

const options = {
  mode: 'single',
  order: 3
}

const markov = new Markov(options)
markov.seed(trainingText)

const generatedText = markov.generate(5)

console.log(black.bgBlue(generatedText))