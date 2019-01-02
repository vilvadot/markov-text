class MultipleWordNgram {
  constructor(text) {
    this.words = text.split(" ")
  }

  getHead(headLength = 1) {
    return this.words.slice(0, headLength).join(" ")
  }

  getTail(tailLength = 1) {
    return this.words.slice(-tailLength).join(' ')
  }
}

class SingleWordNgram {
  constructor(word) {
    this.word = word
  }

  getHead(headLength = 3) {
    return this.word.slice(0, headLength)
  }

  getTail(tailLength = 3) {
    return this.word.slice(-tailLength)
  }
}

class Ngram {
  constructor(text) {
    this.text = text
    this.words = text.split(" ")
    this.isMultipleWords = this.words.length > 1
    // TODO: Siempre todas las props inicializadas en el constructor
    // this.ngram = ??
    this._setNgramKind()
  }

  _setNgramKind() {
    if (this.isMultipleWords) {
      return (this.ngram = new MultipleWordNgram(this.text))
    }
    this.ngram = new SingleWordNgram(this.text)
  }

  getHead(headLength) {
    return this.ngram.getHead(headLength)
  }

  getTail(tailLength) {
    return this.ngram.getTail(tailLength)
  }
}

module.exports = Ngram
