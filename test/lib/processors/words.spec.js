const chai = require("chai");
const expect = chai.expect;
const {
  splitIntoWords,
  cleanWords
} = require("../../../src/lib/processors/words");

const sampleText = "Lorem ipsum dolor sit ammet ";

describe("Processor: Words", () => {
    it("splits text into single word blocks if no word number specified", () => {
      const expectedWords = ["Lorem", "ipsum", "dolor", "sit", "ammet"];
      const words = splitIntoWords(sampleText);

      expect(words).to.deep.equal(expectedWords);
    });

    it("splits text into number of specified words blocks", () => {
      const expectedWords = [
        "Lorem ipsum dolor",
        "ipsum dolor sit",
        "dolor sit ammet"
      ];
      const words = splitIntoWords(sampleText, 3);

      expect(words).to.deep.equal(expectedWords);
    });

    it("removes blocks with invalid characters", () => {
      const sampleText = "Lorem][]:2 ,ipsum\n dolor sit ammet ";

      const expectedWords = [
        "dolor sit ammet"
      ];

      const words = splitIntoWords(sampleText, 3);
      const clean = cleanWords(words);

      expect(clean).to.deep.equal(expectedWords);
  });
});
