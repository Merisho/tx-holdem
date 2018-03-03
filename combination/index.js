const Card = require('../card');
const utils = require('./utils');
const detector = require('./detector');

class Combination {
    constructor(hand) {
        this._hand = hand;
        this._rank = null;
        this._cards = null;
        this._highestCard = null;
    }

    get highestCard() {
        if(!this._highestCard) {
			this._highestCard = this._getHighestCard(this.cards);
		}
		
		return this._highestCard;
    }

    get cards() {
        if(!this._cards) {
			this._cards = this._getCombinationCards(this._hand);
		}
		
		return this._cards;
    }

    get rank() {
        if(!this._rank) {
			this._rank = this._calculateCombination();
		}
		
		return this._rank;
    }

    valueOf() {
        return this.rank;
    }

	/**
	 * Compares two combinations
	 * @param {Combination} combination
	 * @returns {Number}
	 */
    compare(combination) {
		if(this.rank > combination.rank) {
			return 1;
		} else if(this.rank < combination.rank) {
			return -1;
		}

		if(this.rank === Combination.FULL_HOUSE) {
			return this._fullHouseComparison(combination);
		}

		const highestCardComparison = this.highestCard.compare(combination.highestCard);
		if(highestCardComparison !== 0) {
			return highestCardComparison;
		}
		const thisCards = this.cards;
		const combCards = combination.cards;
		for(let i = thisCards.length - 1; i >= 0; i--) {
			const cardComparison = thisCards[i].compare(combCards[i]);
			if(cardComparison !== 0) {
				return cardComparison;
			}
		}
		
		return 0;
	}

	_fullHouseComparison(combination) {
		const highestCombinationCard = utils.getMostValuableFullHouseCardValue(combination.cards);
		const highestThisCard = utils.getMostValuableFullHouseCardValue(this.cards);

		if(highestThisCard > highestCombinationCard) {
			return 1;
		} else if(highestThisCard < highestCombinationCard) {
			return -1;
		}

		return 0;
	}

	/**
	 * Returns combination's value
	 * @param {Hand} hand
	 * @returns {Number}
	 * @private
	 */
	_calculateCombination() {
		const cards = this._hand.cards;
		const isFlush = detector.isFlush(cards);
		const isStraight = detector.isStraight(cards);
		
		if(isFlush && isStraight) {
			return Combination.STRAIGHT_FLUSH;
		} else if(detector.isFourOfAKind(cards)) {
			return Combination.FOUR_OF_A_KIND;
		} else if(detector.isFullHouse(cards)) {
			return Combination.FULL_HOUSE;
		} else if(isFlush) {
			return Combination.FLUSH;
		} else if(isStraight) {
			return Combination.STRAIGHT;
		} else if(detector.isThreeOfAKind(cards)) {
			return Combination.THREE_OF_A_KIND;
		} else if(detector.isTwoPairs(cards)) {
			return Combination.TWO_PAIR;
		} else if(detector.isPair(cards)) {
			return Combination.PAIR;
		}
		
		return Combination.KICKER;
	}

	_getCombinationCards(hand) {
		let cards = [];
		const fiveCardCombinations = [
			Combination.STRAIGHT_FLUSH,
			Combination.FLUSH,
			Combination.STRAIGHT,
			Combination.FULL_HOUSE,
		];
		if(fiveCardCombinations.indexOf(this.rank) > -1) {
			cards = hand.cards;
		} else if(this.rank === Combination.KICKER) {	
			cards = [ hand.cards[4] ];
		} else {	
			cards = utils.combinationCardsByValue(hand);
		}
	
		return cards;
	}

	_getHighestCard(cards) {
		const maxIndex = cards.length - 1;
	
		if(this.rank === Combination.STRAIGHT || this.rank === Combination.STRAIGHT_FLUSH) {
			const last = cards[maxIndex];
			const penult = cards[maxIndex - 1];
			if(penult.value === Card.FIVE && last.value === Card.ACE) {
				return penult;
			}
		}
		
		return cards[maxIndex];
	}

	static get KICKER() { return 0; }
	static get PAIR() { return 1; }
	static get TWO_PAIR() { return 2; }
	static get THREE_OF_A_KIND() { return 3; }
	static get STRAIGHT() { return 4; }
	static get FLUSH() { return 5; }
	static get FULL_HOUSE() { return 6; }
	static get FOUR_OF_A_KIND() { return 7; }
	static get STRAIGHT_FLUSH() { return 8; }
}

module.exports = Combination;