const chai = require("chai")
const expect = chai.expect
const MarkovChain = require("../../src/lib/MarkovChain")
const NGramGenerator = require("../../src/lib/NGramGenerator")
const {splitIntoWords, removeUnwantedBlocks} = require('../../src/lib/processors/words');

const trainingText = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."

const options = {
  splitFn: splitIntoWords,
  cleanFn: removeUnwantedBlocks,
  order: 3,
}

const ngramWeights = new NGramGenerator(trainingText, options).getNgrams();
const markov = new MarkovChain(ngramWeights)

describe("MarkovChain", () => {

  it("sets a random start of string", () => {
    markov._setFirstFragment()
    const generated = markov.word

    expect(generated).to.not.be.undefined
  })

  it("desired result length can be an integer", () => {
    const five = 5
    markov._setResultLength(five)

    const resultLength = markov.resultLength
    expect(resultLength).to.be.equal(five)
  })

  it("desired result length can be an array", () => {
    const zero = 0
    const five = 5

    markov._setResultLength([zero,five])
    const resultLength = markov.resultLength
    expect(resultLength).to.be.lt(five)
    expect(resultLength).to.be.gte(zero)
  })

})
