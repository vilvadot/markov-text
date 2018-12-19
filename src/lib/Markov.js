class Markov{
  constructor(ngrams){
    this.ngrams = ngrams
    this.activeNgram = ''
    this.word = ''
    this._setRandomFirst()
    this._buildWord()
  }

  _setRandomFirst(){
    const randomId = Math.floor(Math.random()*this.ngrams.length)
    this.activeNgram = this.ngrams[randomId]
  }

  _buildWord(){
    const endOfNgram = this.activeNgram.slice(1)
    console.log({endOfNgram})
    const matchingRegex = new RegExp(`^${endOfNgram}`)
    const matchingNgrams = this.ngrams.filter(ngram => matchingRegex.test(ngram))
    console.log(matchingNgrams)
    this.word = this.activeNgram
  }

  getWord(){
    return this.word
  } 
}

module.exports = Markov