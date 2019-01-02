const chai = require("chai");
const expect = chai.expect;
const {
  splitIntoSyllabes,
  cleanSyllabes
} = require("../../../src/lib/processors/syllabes");

const sampleText = "Lorem";

describe("Processor: Syllabes", () => {
    it("splits text into two letter blocks if no number specified", () => {

      const syllabes = splitIntoSyllabes(sampleText)
      const expectSyllabes = ['Lo', 'or', 're', 'em']

      expect(syllabes).to.deep.equal(expectSyllabes);
  });
});
