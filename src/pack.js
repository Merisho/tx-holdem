const Card = require('./card');

const { SUIT_MAX, RANK_MAX, ALIAS_TO_RANK } = Card;

const aliases = ALIAS_TO_RANK;

/**
 * @class Pack
*/
class Pack {
    constructor() {
        this.cards = [];
		this._availableCards = [];

		for(let i = 0; i <= SUIT_MAX; i++) {
			this._availableCards[i] = [];
			for(let j = 0; j <= RANK_MAX; j++) {
				this._availableCards[i][j] = true;
			}
		}
    }

	/**
	 * Clear pack
	*/
    destroy() {
        this.cards = [];
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
}

function _getRankByAlias(alias) {
	if(typeof alias === 'undefined') {
		return null;
	}

	alias = alias.toString().toLowerCase();
	return typeof aliases[alias] === 'undefined' ? null : aliases[alias];
}

function _createNewCard(suit, val) {
	if(typeof suit === 'undefined' || typeof val === 'undefined') {
		return null;
	}

	const exists = this.has(suit, val);
	if(exists) {
		return null;
	} else {
		!this.cards[suit] && (this.cards[suit] = []);
		this.cards[suit][val] = true;
	}
	
	return Card.create(suit, val);
}

function _generateRandomCard() {
	let suit = Math.round(Math.random() * (SUIT_MAX)),
		rank = Math.round(Math.random() * (RANK_MAX));

	while(this.has(suit, rank)) {
		suit = Math.round(Math.random() * (SUIT_MAX));
		rank = Math.round(Math.random() * (RANK_MAX));
	}
	
	return { suit, rank };
}

module.exports = Pack;