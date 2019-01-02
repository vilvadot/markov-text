exports.splitIntoWords = (text, numWords = 1) => {
  const words = text.split(" ");
  const wordPairs = [];

  for (let i = 0; i < words.length; i++) {
    const currentWordCombination = []
    for (let j = 0; j < numWords; j++){
      if (!words[i + j]) break
      currentWordCombination.push(words[i + j])
    }
    const isCombinationLongEnough = currentWordCombination.length === numWords

    if(isCombinationLongEnough){
      wordPairs[i] = currentWordCombination.join(' ');
    }
  }

  return wordPairs;
};

exports.removeUnwantedBlocks = words => {
  const wordPairs = words.filter(word => {
    const isEndLinePair = word.indexOf("\n") == word.length - 1;
    return !word.includes("\n") || isEndLinePair;
  });

  const cleanPairs = wordPairs.map(pair =>
    pair.toLowerCase().replace("\n", "")
  );

  return cleanPairs;
};
