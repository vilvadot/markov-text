const chai = require("chai");
const expect = chai.expect;
const {
  splitIntoSyllabes,
  removeUnwantedSyllabes
} = require("../../../src/lib/processors/syllabes");

const sampleText = "Lorem";

describe("Processor: Syllabes", () => {

  it("splits text into two letter blocks if no number specified", () => {
    const syllabes = splitIntoSyllabes(sampleText);
    const expectSyllabes = ["Lo", "or", "re", "em"];

    expect(syllabes).to.deep.equal(expectSyllabes);
  });

  it("splits text into number of specified syllabes blocks", () => {
    const syllabes = splitIntoSyllabes(sampleText, 3);
    const expectSyllabes = [ 'Lor', 'ore', 'rem' ];
    expect(syllabes).to.deep.equal(expectSyllabes);
  });

  it("discards blocks with invalid characters", () => {
    const text = 'Lore43m ipsum dolor -'

    const syllabes = splitIntoSyllabes(text, 3);
    const cleanSyllabes = removeUnwantedSyllabes(syllabes)
    
    const expectedSyllabes = [ 'Lor', 'ore', 'ips', 'psu', 'sum', 'dol', 'olo', 'lor' ]

    expect(cleanSyllabes).to.deep.equal(expectedSyllabes);
  });

});
