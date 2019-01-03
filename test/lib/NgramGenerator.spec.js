const chai = require("chai")
const expect = chai.expect
const NgramGenerator = require("../../src/lib/NgramGenerator")
const {splitIntoWords} = require('../../src/lib/processors/words');

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
    it('removes unwanted ngrams with cleaning function', () => {

      const sampleNgrams = ['1','3','a','b']
      const onlyLetters = ['a','b']

      const removeNumbers = input => input.filter((el) => !!!parseInt(el))

      const options = {
        splitFn: input => input,
        cleanFn: removeNumbers,
      }

      const generator = new NgramGenerator(sampleText, options)
      const cleanNgrams = generator._removeUnwantedNgrams(sampleNgrams)
      
      expect(cleanNgrams).to.be.eql(onlyLetters)
    })

    it('splits text into ngrams with splitting function', () => {

      const expectedNgrams = ['Lorem','ipsum','dolor','sit','ammet']
      const options = {
        splitFn: input => input.split(' '),
        cleanFn: input => input,
      }

      const generator = new NgramGenerator(sampleText, options)
      const splitNgrams = generator._generateNgrams()
      
      expect(splitNgrams).to.be.eql(expectedNgrams)
    })

    it('splitting function receives ngram order', () => {

      const expectedNgrams = ['Lorem ipsum dolor sit','ipsum dolor sit ammet']
      const options = {
        splitFn: splitIntoWords,
        cleanFn: input => input,
        order: 4,
      }

      const generator = new NgramGenerator(sampleText, options)
      const splitNgrams = generator._generateNgrams()
      
      expect(splitNgrams).to.be.eql(expectedNgrams)
    })

    it('generates weighted ngram map', () => {

      const expectedNgramMap = { 'Lorem ipsum dolor sit': 1, 'ipsum dolor sit ammet': 1 }
      const options = {
        splitFn: splitIntoWords,
        cleanFn: input => input,
        order: 4,
      }

      const generator = new NgramGenerator(sampleText, options)
      const ngramMap = generator.getNgrams()
      
      expect(ngramMap).to.be.eql(expectedNgramMap)
    })

  })

})
