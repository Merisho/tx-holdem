const Hand = require('./hand');

const HAND_SIZE = Hand.MAX_HAND_SIZE;

class HandsCollection {
    constructor(hands) {
        this.hands = hands.sort((h1, h2) => h1.compare(h2));
    }

    get highestHand() {
        return this.hands[this.hands.length - 1];
	}
	
	get highestCombinationRank() {
		return this.highestHand.combination.rank;
	}

    get lowestHand() {
        return this.hands[0];
	}

	get lowestCombinationRank() {
		return this.lowestHand.combination.rank;
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
		return new this(getAllCombinationsOfHands(allCards));
	}
}

/**
 * Creates all possible card combinations from given hands
 * 
 * @param {Array} arr - Array of cards
 * @returns {Array}
 */
function getAllCombinationsOfHands(arr) {
	const combs = [];

	(function f(arr, start, index, handCards) {
		if(handCards.length === HAND_SIZE) {
			const h = new Hand();
			h.addCards(handCards);
			combs.push(h);
			return;
		}
		
		for(let i = start; i < arr.length; i++) {
			handCards[index] = arr[i];
			f(arr, i + 1, index + 1, handCards.slice(0));
		}
	})(arr, 0, 0, []);
	
	return combs;
}

module.exports = HandsCollection;