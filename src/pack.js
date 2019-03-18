const Card = require('./card');

const { SUIT_MIN, SUIT_MAX, RANK_MIN, RANK_MAX, ALIAS_TO_RANK, RANK_TO_ALIAS } = Card;

const aliases = ALIAS_TO_RANK;
const ranks = RANK_TO_ALIAS;

/**
 * @class Pack
*/
class Pack {
    constructor() {
        this.cards = [];
		this._availableCards = this._availableCardsArray();
    }

	/**
	 * Clear pack
	*/
    destroy() {
		this.cards = [];
		this._availableCards = this._availableCardsArray();
    }

	/**
	 * Count of created cards in pack
	 * @readonly
	 * @type {Number}
	 */
    get count() {
        return this.cards.length;
    }

    /**
     * Create specified number of random cards
     * @param {Number} count
     * @returns {Array}
     */
    createCards(count) {
		const cards = [];
		for(let i = 0; i < count; i++) {
			cards.push(this.createCard());
		}
		
		return cards;
	}

    /**
     * Creates random card
     * @returns {Card}
     *//**
     * Creates card with given suit and rank
     * @param {String} suit
     * @param {String} rank
     * @returns {Card}
     */
    createCard(suit, rank) {
        const cards = this.cards;
			
		if(this.count === 52) {
			return null;
		}

		const suitEmpty = typeof suit === 'undefined';
		const valEmpty = typeof val === 'undefined';
		if(suitEmpty && valEmpty) {
			const randomCard = _generateRandomCard.call(this);
			suit = randomCard.suit;
			rank = randomCard.rank;
		} else {
			suit = _getRankByAlias(suit);
			rank = _getRankByAlias(rank);

			if(suit === null || rank === null) {
				return null;
			}
		}

		return _createNewCard.call(this, suit, rank);
    }

    /**
     * Checks whether card exists in current Pack
     * @param {Card} card
     * @returns {Boolean}
     *//**
     * Checks whether card exists in current Pack
     * @param {Number} suit
     * @param {Number} rank
     * @returns {Boolean}
     */
    has(card/*suit, rank*/) {	
		let s, v;
		if(card instanceof Card) {
			s = card.suit;
			v = card.rank;
		} else if(typeof arguments[0] !== 'undefined' && typeof arguments[1] !== 'undefined') {
			s = _getRankByAlias(arguments[0]);
			v = _getRankByAlias(arguments[1]);

			s === null && (s = arguments[0]);
			v === null && (v = arguments[1]);
		}

		return !!(this.cards[s] && this.cards[s][v]);
	}

	_availableCardsArray() {
		const cards = [];

		for(let s = SUIT_MIN; s <= SUIT_MAX; s++) {
			for(let r = RANK_MIN; r <= RANK_MAX; r++) {
				const card = {
					suit: s,
					rank: r
				};
				cards.push(card);
			}
		}

		return cards;
	}
}

function _getRankByAlias(alias) {
	if(typeof alias === 'undefined') {
		return null;
	}

	alias = alias.toString().toLowerCase();
	return typeof aliases[alias] === 'undefined' ? null : aliases[alias];
}

function _getAliasByValue(val) {
	if(typeof val === 'undefined') {
		return null;
	}

	return typeof ranks[val] === 'undefined' ? null : ranks[val];
}

function _createNewCard(suit, val) {
	if(typeof suit === 'undefined' || typeof val === 'undefined') {
		return null;
	}

	const exists = this.has(_getAliasByValue(suit), _getAliasByValue(val));
	if(exists) {
		return null;
	} else {
		!this.cards[suit] && (this.cards[suit] = []);
		this.cards[suit][val] = true;
	}
	
	return Card.create(suit, val);
}

function _generateRandomCard() {
	const randIndex = Math.floor(Math.random() * this._availableCards.length);
	const card = this._availableCards[randIndex];

	this._availableCards.splice(randIndex, 1);

	return card;
}

module.exports = Pack;