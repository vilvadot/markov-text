const chai = require("chai")
const expect = chai.expect
const WeightedList = require("../../src/lib/WeightedList")

describe("WeightedList", () => {

    it("sets weights correctly on init", () => {
      const list = {
        mercury: 1,
        venus: 2
      }

      const weightedList = new WeightedList(list)
      const itemLength = Object.keys(weightedList.weightMap).length

      expect(itemLength).to.equal(2)

    })

    it("can be set after initialization", () => {
      const list = {
        mercury: 1,
        venus: 2
      }

      const weightedList = new WeightedList()
      weightedList.setWeights(list)
      const itemLength = Object.keys(weightedList.weightMap).length

      expect(itemLength).to.equal(2)

    })

    it("can be emptied", () => {
      const list = {
        mercury: 1,
        venus: 2
      }

      const emptyList = {}

      const weightedList = new WeightedList(list)
      weightedList.clearWeights()
      const map = weightedList.weightMap

      expect(map).to.deep.equal(emptyList)

    })

    it("calcs total weight", () => {
      const list = {
        mercury: 1,
        venus: 2
      }

      const weightedList = new WeightedList(list)
      const totalWeight = weightedList._sumWeights()

      expect(totalWeight).to.deep.equal(3)

    })

    it("returns statistically correct items according to weight", () => {
      const list = {
        mercury: 1,
        venus: 0
      }
      const mercury = 'mercury'

      const weightedList = new WeightedList(list)
      const firstItem = weightedList.getItem().text
      const secondItem = weightedList.getItem().text
      const thirdItem = weightedList.getItem().text

      expect(firstItem).to.deep.equal(mercury)
      expect(secondItem).to.deep.equal(mercury)
      expect(thirdItem).to.deep.equal(mercury)

    })

    it("can return a random item", () => {
      const list = {
        mercury: 1,
        mars: 1,
        venus: 0
      }

      const weightedList = new WeightedList(list)
      const randomItem = weightedList.getRandomItem().text
      const itemIsInList = Object.keys(list).includes(randomItem)

      expect(itemIsInList).to.be.true
    })

})
