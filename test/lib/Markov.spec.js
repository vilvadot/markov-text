const chai = require("chai");
const expect = chai.expect;
const Markov = require("../../src/lib/Markov");

const trainingText =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

describe("Markov", () => {
  it("sets mode to multiple words if no mode provided", () => {
    
    const markov = new Markov();
    const mode = markov.mode
    const multipleMode = 'multiple'

    expect(mode).to.equal(multipleMode)
  });

  it("sets mode correctly", () => {
    
    const markov = new Markov({ mode: 'single' });
    const mode = markov.mode
    const singleMode = 'single'

    expect(mode).to.equal(singleMode)
  });

  it("generates text", () => {
    
    const markov = new Markov({ mode: 'single' });
    markov.seed(trainingText)
    const result = markov.generate(5)

    expect(result.length).to.be.gte(5)
  });

  it("sets provided order", () => {});
});
