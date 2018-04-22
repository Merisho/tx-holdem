const Hand = require('../hand');
const Utils = require('./utils');

const HAND_SIZE = Hand.MAX_HAND_SIZE;

class HandsCollection {
    constructor(hands) {
        this.hands = hands.sort((h1, h2) => h1.compare(h2));
    }

    get highestHand() {
        return this.hands[this.hands.length - 1];
	}
	
	get highestCombination() {
		return this.highestHand.combination;
	}

	get bestDraw() {
		return this.hands.reduce((h1, h2) => {
			return h1.drawCombination.outs > h2.drawCombination.outs ? h1 : h2;
		}).drawCombination;
	}

	get count() {
		return this.hands.length;
	}
	
	/**
	 * Returns all possible card combinations from given hands
	 * @param {Hand} hand1 - First hand
	 * @param {Hand} hand2 - Second hand
	 * @returns {HandsCollection}
	 */
	static createCombinations(hand1, hand2) {
		const allCards = hand1.cards.concat(hand2.cards);
		return new HandsCollection(Utils.getAllCombinationsOfHands(allCards));
	}
}

module.exports = HandsCollection;