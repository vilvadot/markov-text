class Ngram {
  constructor(text) {
    this.text = text;
    this.words = text.split(" ");
    this.isMultipleWords = this.words.length > 1;
  }

  getHead(headLength = 3) {
    if (this.isMultipleWords) {
      return this.words.slice(0, headLength).join(' ');
    }
    return this.words[0].slice(0, headLength)
  }

  getTail(tailLength = 3) {
    if (this.isMultipleWords) {
      return this.words.slice(-1)[0];
    }
    return this.words[0].slice(-tailLength);
  }
}

module.exports = Ngram;
