exports.splitIntoWords = (text, length) => {
  const words = text.split(" ");
  const wordPairs = [];

  for (let i = 0; i < words.length; i++) {
    const currentWordCombination = []
    for (let j = 0; j < length; j++){
      currentWordCombination.push(words[i + j])
    }
    wordPairs[i] = currentWordCombination.join(' ');
  }

  return wordPairs;
};

exports.cleanWords = words => {
  const wordPairs = words.filter(word => {
    const isEndLinePair = word.indexOf("\n") == word.length - 1;
    return !word.includes("\n") || isEndLinePair;
  });

  const cleanPairs = wordPairs.map(pair =>
    pair.toLowerCase().replace("\n", "")
  );

  return cleanPairs;
};
