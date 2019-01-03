const { splitIntoSyllabes, removeUnwantedSyllabes } = require("./syllabes");

const { splitIntoWords, removeUnwantedWords } = require("./words");

module.exports = {
  words: {
    split: splitIntoWords,
    clean: removeUnwantedWords
  },
  syllabes: {
    split: splitIntoSyllabes,
    clean: removeUnwantedSyllabes
  }
};
