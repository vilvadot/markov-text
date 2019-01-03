class MultipleWordNgram {
  constructor(text) {
    this.words = text.split(' ')
  }

  getMergeString(){
    return ' ' + this.words.slice(1).join(' ')
  }

  getHead(headLength = 1) {
    return this.words.slice(0, headLength).join(' ')
  }

  getTail(tailLength = 1) {
    return this.words.slice(-tailLength).join(' ')
  }
}

class SingleWordNgram {
  constructor(word) {
    this.word = word.toLowerCase()
    this.overlap = parseInt(word.length/2) + 1
  }

  getMergeString(){
    return this.word.slice(this.overlap)
  }

  getHead(headLength) {
    return this.word.slice(0, headLength || this.overlap)
  }

  getTail(tailLength) {
    return this.word.slice(-(tailLength||this.overlap))
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

  getHead(headLength) {
    return this.ngram.getHead(headLength)
  }

  getTail(tailLength) {
    return this.ngram.getTail(tailLength)
  }

  getMergeString(){
    return this.ngram.getMergeString()
  }

  _setNgramKind() {
    if (this.isMultipleWords) {
      return (this.ngram = new MultipleWordNgram(this.text))
    }
    this.ngram = new SingleWordNgram(this.text)
  }
}

module.exports = Ngram
