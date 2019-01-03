exports.splitIntoSyllabes = (text, numSyllabes = 2) => {
  const words = text.split(/\s/);

  const syllabes = [];
  for (word of words) {
    for (let i = 0; i < word.length; i++) {
      const currentSlice = word.slice(i, i + numSyllabes);
      if (currentSlice.length < numSyllabes) break;
      syllabes.push(currentSlice);
    }
  }

  return syllabes;
};

exports.removeUnwantedSyllabes = syllabes => {
  const onlyLetters = syllabes.filter(syllabe => {
    const regExpOnlyLetters = /^[a-zA-Z]+$/g;
    return regExpOnlyLetters.test(syllabe);
  });
  
  return onlyLetters
};
