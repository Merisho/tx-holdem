const Hand = require('../hand');

const HAND_SIZE = Hand.MAX_HAND_SIZE;

class Utils {
    /**
	 * Creates all possible hands for card combinations from given array of cards
	 * 
	 * @param {Array} cards - Array of cards
	 * @returns {Array}
	 */
	static getAllCombinationsOfHands(cards) {
        return Utils._combineCardsRecursively(cards);
    }
    
    static _combineCardsRecursively(cards, start = 0, index = 0, handCards = [], combinations = []) {
        if(handCards.length === HAND_SIZE || (cards.length < HAND_SIZE && handCards.length === cards.length)) {
            const h = new Hand();
            h.addCards(handCards);
            combinations.push(h);
            return;
        }
        
        for(let i = start; i < cards.length; i++) {
            handCards[index] = cards[i];
            Utils._combineCardsRecursively(cards, i + 1, index + 1, handCards.slice(0), combinations);
        }

        return combinations;
    }
}

module.exports = Utils;