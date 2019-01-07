Markov Text
=========

A simple procedural text generator implementing [Markov chains](http://setosa.io/ev/markov-chains/)

![Markov Chain](https://media.giphy.com/media/gH6I5QWnIZjy0/giphy.gif)

## Installation

    npm install markov-text


## Usage
```js
    var Markov = require('markov-text');

    const trainingText = 'Lorem ipsum dolor sit ammet'

    options = {...}
    
    const loremGenerator = new Markov(options) // Setup generator
    
    loremGenerator.seed(trainingText) // Seed chain with "training" text

    const generatedText = loremGenerator.generate(5) // Set length of the generated output.
```

| Method    | Arguments             | Returns        | Description                                                                                                                                                                   |
|-----------|-----------------------|----------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|  seed     | trainingText<String>  |        -       |  Seeds the generator with the training text. The generator splits the text into nGrams (pieces of n-characters or n-words length, depending on the mode)analog to chainlinks. |
|  generate | outputLength<Integer> | output<String> | Returns the generated text of the specified length. (Length is in ngrams not in charcters/words)                                                                              |

## Options

You can pass in an options object when instancing the generator that accepts the following options:

| Property |   Type  |         Options        | Default    | Description                                                                                                                                                                      |
|:--------:|:-------:|:----------------------:|------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|   order  | integer |           1-n          |     no     | Specifies the length of the ngrams (chainlinks). Longer chainlinks will produce more coherent text but less 'creativity'                                                         |
|   mode   |  string | 'single' | 'multiple'  | 'multiple' |  Single mode will generate single words and will use training text as single independent words. Multiple mode will generate sentences and will use training text as word blocks. |

## Debuggin

You can view the chain building step by setting up the enviroment variable DEBUG_CHAIN to true

    DEBUG_CHAIN=true node myTextGenerator

## Examples

Provided are two examples you can run using:

#### Metamorphosis

  Uses a excerpt of [Franz Kafka's Metamorphosis](http://www.gutenberg.org/ebooks/5200)  to generate sentences of the desired length.

    npm run example:metamorphosis


---

#### Lotr

  Uses all the names from [characters of LOTR](https://en.wikipedia.org/wiki/List_of_Middle-earth_characters) to generate a new one

    npm run example:lotr


  _Copyright for training texts is owned by their respetive authors and is not protected by the license of this library_

## Tests

    npm test
