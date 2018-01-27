const { LINQ } = require('node-linq');
const Card = require('./card');

class Combination {
    constructor(hand) {
        this._hand = hand;
        this._rank = null;
        this._cards = null;
        this._highestCard = null;
    }

    get highestCard() {
        if(!this._highestCard) {
			this._highestCard = _getHighestCard(this.cards, this.rank);
		}
		
		return this._highestCard;
    }

    get cards() {
        if(!this._cards) {
			this._cards = _getCombinationCards(this._hand, this.rank);
		}
		
		return this._cards;
    }

    get rank() {
        if(!this._rank) {
			this._rank = _calculateCombination(this._hand);
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

	// @TODO Refactor this shit
	_fullHouseComparison(combination) {
		const combinationCardsValuesCount = {};
		const thisCardsValuesCount = {};
		const counter = map => card => {
			if(map[card.value]) {
				map[card.value]++;
			} else {
				map[card.value] = 1;
			}
		};
		
		combination.cards.forEach(counter(combinationCardsValuesCount));
		this.cards.forEach(counter(thisCardsValuesCount));

		let highestCombinationValue;
		let highestThisValue;

		for(let cardValue in combinationCardsValuesCount) {
			if(combinationCardsValuesCount[cardValue] === 3) {
				highestCombinationValue = cardValue;
				break;
			}
		}

		for(let cardValue in thisCardsValuesCount) {
			if(thisCardsValuesCount[cardValue] === 3) {
				highestThisValue = cardValue;
				break;
			}
		}

		if(highestThisValue > highestCombinationValue) {
			return 1;
		} else if(highestThisValue < highestCombinationValue) {
			return -1;
		}

		return 0;
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

/**
 * Returns combination's value
 * @param {Hand} hand
 * @returns {Number}
 */
function _calculateCombination(hand) {
	const cards = hand.cards;
	const isFlush = _isFlush(cards);
	const isStraight = _isStraight(cards);
	
	if(isFlush && isStraight) {
		return Combination.STRAIGHT_FLUSH;
	} else if(_isFourOfAKind(cards)) {
		return Combination.FOUR_OF_A_KIND;
	} else if(_isFullHouse(cards)) {
		return Combination.FULL_HOUSE;
	} else if(isFlush) {
		return Combination.FLUSH;
	} else if(isStraight) {
		return Combination.STRAIGHT;
	} else if(_isThreeOfAKind(cards)) {
		return Combination.THREE_OF_A_KIND;
	} else if(_isTwoPair(cards)) {
		return Combination.TWO_PAIR;
	} else if(_isPair(cards)) {
		return Combination.PAIR;
	}
	
	return Combination.KICKER;
}

function _isFlush(cards) {
	if(!cards || cards.length !== 5) {
		return false;
	}

	const suit = cards[0].suit;
	return cards.every(card => card.suit === suit);
}

function _isStraight(cards) {
	if(!cards || cards.length !== 5) {
		return false;
	}

	const maxIndex = cards.length - 1;
	let isStraight = true;
	for(let i = 0; i < maxIndex - 1; i++) {
		if(cards[i + 1] - cards[i] !== 1) {
			isStraight = false;
			break;
		}
	}
	if(isStraight) {
		const last = cards[maxIndex];
		const penult = cards[maxIndex - 1];
		isStraight = (last.value === Card.ACE && penult.value === Card.FIVE) || last - penult === 1;
	}
	
	return isStraight;
}

function _isFourOfAKind(cards) {
	return _getCountsOfSimilar(cards).indexOf(4) >= 0;
}

function _isFullHouse(cards) {
	const similarCount = _getCountsOfSimilar(cards);
	return similarCount.indexOf(2) !== -1 && similarCount.indexOf(3) !== -1;
}

function _isThreeOfAKind(cards) {
	return _getCountsOfSimilar(cards).indexOf(3) >= 0;
}

function _isTwoPair(cards) {
	const similarCount = _getCountsOfSimilar(cards);
	const firstIndex = similarCount.indexOf(2);

	return firstIndex !== similarCount.lastIndexOf(2) && firstIndex !== -1;
}

function _isPair(cards) {
	return _getCountsOfSimilar(cards).indexOf(2) >= 0;
}

function _getCountsOfSimilar(cards) {
	const cardsByVal = new LINQ(cards).GroupBy(card => card.value);
	const similarCount = [];

	cardsByVal.forEach
	
	for(let i in cardsByVal) {
		similarCount.push(cardsByVal[i].length);
	}
	
	return similarCount;
}

function _getCombinationCards(hand, rank) {
	let cards = [];
	const fiveCardCombinations = [
		Combination.STRAIGHT_FLUSH,
		Combination.FLUSH,
		Combination.STRAIGHT,
		Combination.FULL_HOUSE,
	];
	if(fiveCardCombinations.indexOf(rank) > -1) {
		cards = hand.cards;
	} else if(rank === Combination.KICKER) {	
		cards = [ hand.cards[4] ];
	} else {	
		cards = _getCombinationCardsByValue(hand);
	}

	return cards;
}

function _getCombinationCardsByValue(hand) {
	const cards = hand.cards;
	let combinationCards = [];

	const cardsByVal = new LINQ(cards).GroupBy(card => card.value);

	const f = function(val) {
		return cards.filter(function(elem) {
			return elem.value == val;
		});
	};
	for(let i in cardsByVal) {
		const similarValuesCount = cardsByVal[i].length;
		if(similarValuesCount > 1) {
			combinationCards = combinationCards.concat(f(i));
		}
	}

	return combinationCards;
}

function _getHighestCard(cards, rank) {
	const maxIndex = cards.length - 1;

	if(rank === Combination.STRAIGHT || rank === Combination.STRAIGHT_FLUSH) {
		const last = cards[maxIndex];
		const penult = cards[maxIndex - 1];
		if(penult.value === Card.FIVE && last.value === Card.ACE) {
			return penult;
		}
	}
	
	return cards[maxIndex];
}

module.exports = Combination;