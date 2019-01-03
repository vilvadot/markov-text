const chai = require("chai");
const expect = chai.expect;
const Ngram = require("../../src/lib/Ngram");

describe("Ngram", () => {
  describe("Single word", () => {
    it("returns default tail of half the length of the word", () => {
      const text = "apollo";
      const expectedTail = "ollo";

      const ngram = new Ngram(text);
      const tail = ngram.getTail();

      expect(tail).equal(expectedTail);
    });

    it("returns tail of desired length", () => {
      const text = "apollo";
      const expectedTail = "lo";

      const ngram = new Ngram(text);
      const tail = ngram.getTail(2);

      expect(tail).equal(expectedTail);
    });

    it("returns head of desired length", () => {
      const text = "apollo";
      const expectedHead = "apo";

      const ngram = new Ngram(text);
      const tail = ngram.getHead(3);

      expect(tail).equal(expectedHead);
    });

    it("returns string to merge removing head", () => {
      const text = "apollo";
      const expectedMergeString = "lo";

      const ngram = new Ngram(text);
      const mergeString = ngram.getMergeString();

      expect(mergeString).equal(expectedMergeString);
    });
  });

  describe("Multiple words", () => {
    it("returns head of multiple words", () => {
      const text = "apollo the dog";
      const expectedHead = "apollo the";

      const ngram = new Ngram(text);
      const tail = ngram.getHead(2);

      expect(tail).equal(expectedHead);
    });

    it("returns tail of multiple words", () => {
      const text = "apollo the dog";
      const expectedTail = "the dog";

      const ngram = new Ngram(text);
      const tail = ngram.getTail(2);

      expect(tail).equal(expectedTail);
    });

    it("returns string to merge removing head", () => {
      const text = "apollo the dog";
      const expectedMergeString = " the dog";

      const ngram = new Ngram(text);
      const mergeString = ngram.getMergeString();

      expect(mergeString).equal(expectedMergeString);
    });
  });
});
