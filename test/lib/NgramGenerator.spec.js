const chai = require("chai")
const expect = chai.expect
const NgramGenerator = require("../../src/lib/NgramGenerator")
const {splitIntoWords, cleanWords} = require('../../src/lib/processors/words');

const sampleText = "Lorem ipsum dolor sit ammet"

describe("NgramGenerator", () => {

  describe("initialization", () => {
    it("throws error if no text provided", () => {
      const textError = "You must provide a text"

      expect(() => {
        new NgramGenerator()
      }).to.throw(textError)

    })

    it("throws error if text provided but no options", () => {
      const optionsError = 'You must provide an options object'

      expect(() => {
        new NgramGenerator(sampleText)
      }).to.throw(optionsError)
    })

    it("throws error if splitting function is missing", () => {
      const splitError = 'Please provide a valid splitting function'
      const options = {
      }

      expect(() => {
        new NgramGenerator(sampleText, options)
      }).to.throw(splitError)
    })

    it("if no order provided, defaults to a number", () => {
      const options = {
        splitFn: input => input
      }
      const generator = new NgramGenerator(sampleText, options)
      
      const order = generator.order

      expect(order).to.be.gt(0)
    })

    it("if no clean function provided uses default", () => {
      const options = {
        splitFn: input => input
      }
      const generator = new NgramGenerator(sampleText, options)
      const sampleInput = ['one', 'two']

      const output = generator.cleanFn(sampleInput)

      expect(output).to.be.eql(sampleInput)
    })

  })

  describe("ngram generation", () => {
    it('applies cleaning function correctly', () => {

      const sampleNgrams = ['1','3','a','b']
      const onlyLetters = ['a','b']

      const removeNumbers = input => input.filter((el) => !!!parseInt(el))

      const options = {
        splitFn: input => input,
        cleanFn: removeNumbers,
      }

      const generator = new NgramGenerator(sampleText, options)
      cleanNgrams = generator._removeUnwantedNgrams(sampleNgrams)
      
      expect(cleanNgrams).to.be.eql(onlyLetters)
    })

  })

})
