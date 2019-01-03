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

describe("MarkovChain", () => {

  it("desired output length can be an integer", () => {
    const markov = new MarkovChain(ngramWeights)

    const five = 5
    markov._setOutputLength(five)

    const resultLength = markov.outputLength
    expect(resultLength).to.be.equal(five)
  })

  it("desired output length can be an array", () => {
    const markov = new MarkovChain(ngramWeights)
    
    const zero = 0
    const five = 5

    markov._setOutputLength([zero,five])
    const resultLength = markov.outputLength
    expect(resultLength).to.be.lte(five)
    expect(resultLength).to.be.gte(zero)
  })

  it("sets a random start of string", () => {
    const markov = new MarkovChain(ngramWeights)
    
    markov._addFirstFragment()
    const result = markov.result

    expect(result.length).to.be.equal(1)
  })

  it("can be reset", () => {
    const markov = new MarkovChain(ngramWeights)
    
    markov._addFirstFragment()

    expect(markov.result.length).to.be.equal(1)

    markov._reset()

    expect(markov.result.length).to.be.equal(0)
  })

  it("adds another fragment", () => {
    const markov = new MarkovChain(ngramWeights)
    
    markov._addFirstFragment()

    const fragment = markov.result[0]
    const secondFragment = markov._getNextFragment()

    expect(secondFragment).to.not.be.undefined
    expect(fragment).to.not.deep.equal(secondFragment)
  })

  it("returns result as a string", () => {
    const markov = new MarkovChain(ngramWeights)
    
    markov._addFirstFragment()

    const result = markov._joinResult()

    expect(typeof(result)).to.equal('string')
  })

  it("generates a string with the desired length", () => {
    const markov = new MarkovChain(ngramWeights)
    const desiredLength = 3

    const result = markov.generate(desiredLength)
    const resultLength = result.split(' ').length

    expect(resultLength).to.be.gte(desiredLength)
  })

})
